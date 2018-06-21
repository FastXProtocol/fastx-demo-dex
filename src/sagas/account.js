import { put, takeEvery, all ,take} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { chainOptions, retry} from '../config';
import erc721_abi from "../contract_data/ERC721Token.abi.json";
import moment from 'moment';
import axios from 'axios';

let fastx;
if(window.plasmaClient){
    fastx = new window.plasmaClient.client(chainOptions);
}

const getAssent = async (NFT) => {
    let assets = [];
    try {
        for(let value of NFT){
            let kittyRes = await axios({
                method: 'get',
                url: 'https://api.cryptokitties.co/kitties/'+value[1]
            })
            let kitty = kittyRes.data;
            if(!kitty.auction)kitty.auction = {};
            assets.push(kitty);
        }
    } catch(err) {
        console.log("get assent info err:",err)
    }

    return assets;
}

function* getBalanceAsync() {   
    yield put({
      type: 'SET_ASSETS_LOADING',
      isLoading: true
    })

    yield getAccountAsync();
    
    let balanceFT = [],balanceNFT = [],utxos,balanceRes;
    for (let i = 1; i<=retry.count; i++){
        try {
            // utxos = yield fastx.getAllUTXO(fastx.defaultAccount);
            // console.log('utxos:',utxos.data);
            balanceRes = yield fastx.getBalance(fastx.defaultAccount);
            console.log('balanceRes:',balanceRes);
            balanceFT = balanceRes.FT;
            balanceNFT = balanceRes.NFT
            break; 
        }catch(err){
            if(i <= retry.count) {
                console.log("getBalanceErr:",i,err)
                yield delay(retry.time);
            }else{
                throw new Error('getBalanceErr request failed');
            }
        }
    }

    let balance = 0;
    for(let value of balanceFT){
        if(value[0] == "0000000000000000000000000000000000000000"){
            balance = value[1];
            break;
        }
    }
    console.log('balance:',balance);
    // let wei = yield fastx.web3.eth.getBalance(fastx.defaultAccount);
    // let ether = yield fastx.web3.utils.fromWei(wei, 'ether');

    yield put({
      type: 'BALANCE_RECEIVED',
      balance: parseFloat(balance)
    })

    let assets = yield getAssent(balanceNFT);
    yield put({
      type: 'USER_ITEMS_RECEIVED',
      items: assets
    })

    yield put({
      type: 'SET_ASSETS_LOADING',
      isLoading: false
    }) 
}

function* getAccountAsync() {
    let accounts = [];
    for (let i = 1; i<=retry.count; i++){
        try {
            accounts = yield fastx.web3.eth.getAccounts();
            break; 
        }catch(err){
            if(i <= retry.count) {
                console.log("getAccountErr:",i,err)
                yield delay(retry.time);
            }else{
                throw new Error('getAccount request failed');
            }
        }
    }
	
    fastx.defaultAccount = accounts[0];
    console.log('getAccountAddress:',fastx.defaultAccount);
    yield put({
	  type: 'ACCOUNT_RECEIVED',
	  ownerAddress: accounts[0]
	})
}

const normalizeAddress = (address) => {
	if (!address) {
        throw new Error();
    }
    if ('0x' == address.substr(0,2)) {
        address = address.substr(2);
    }
    if (address == 0) address = '0'.repeat(40);
    return new Buffer(address, 'hex');
}

const depositNFT = async (asset_contract, tokenid) => {
    console.log('asset_contract:',asset_contract)
    const ownerAddress = fastx.defaultAccount;
    let nft_contract = new fastx.web3.eth.Contract( erc721_abi, asset_contract);

    // create a new token for testing
    // const totalSupply = await nft_contract.methods.totalSupply().call();
    // tokenid = parseInt(totalSupply) + 10;
    // console.log('Creating new token: '+tokenid);
    // await nft_contract.methods.mint(ownerAddress, tokenid)
    //     .send({from: ownerAddress, gas: 3873385})
    //     .on('transactionHash', console.log);

    console.log('Approving token # '+tokenid+' to '+chainOptions.rootChainAddress);
    await fastx.approve(asset_contract, 0, tokenid, {from: ownerAddress})
        .on('transactionHash', console.log);
    console.log( 'Approved address: ', await nft_contract.methods.getApproved(tokenid).call() );

    await fastx.deposit(asset_contract, 0, tokenid, {from: ownerAddress});
    return {
        category: asset_contract, 
        tokenId: tokenid
    };
}

const logBalance = async (address) => {
	let res = (await fastx.getBalance(address));
    console.log("\naddress: "+ (address || fastx.defaultAccount) );
    console.log("balance: ", res);
}

const postNftAd = async (contract, tokenid, end, price, options={}) => {
	let from = options.from || fastx.defaultAccount;
    let categoryContract;
    console.log(contract)
    try{
        categoryContract = normalizeAddress(contract).toString('hex');
    }catch (e){
        console.log(e)
    }
    console.log('from: '+from + ', contract: '+categoryContract+', tokenid: '+tokenid);

    let utxo = await fastx.searchUTXO({
        category: categoryContract, 
        tokenId: tokenid,
    }, { from: from });
    console.log('\nUTXO',utxo);
    const [_blknum, _txindex, _oindex, _contract, _balance, _tokenid] = utxo;

    return fastx.sendPsTransaction(
        _blknum, _txindex, _oindex, 
        from, '0'.repeat(40), price, 0, // sell for the price in eth
        _contract, 0, _tokenid, // sell the token
        0, end, null, from
    );
}

const postAd = async (data) => {
	const nft_ad = await depositNFT(data.params.categroy, data.params.sellId);
	await logBalance();
	const end = moment(data.params.end).add(1, 'days').unix();
	const price = parseFloat(data.params.sellPrice);
	await postNftAd(nft_ad.category, nft_ad.tokenId, end, price);
}

function* watchSellAssetAsync(data) {
	// data = {
	// 	params: {
	// 		categroy: "0x952CE607bD9ab82e920510b2375cbaD234d28c8F",
	// 		end: '2018-06-13',
	// 		sellPrice: '1',
	// 		sellId: '283'
	// 	}
	// }
	console.log("sellAssetParams:",data.params)
	postAd(data);
}

function* watchSellContractAssetAsync(data) {
    const end = moment(data.params.end).add(1, 'days').unix();
    const price = parseFloat(data.params.sellPrice);
    console.log("sellContractAssetParams",data.params)
    let result = yield postNftAd(data.params.categroy, data.params.sellId, end, price);
    console.log("postNftAdResult:",result);
}

function* watchDepositAsync(action) {
    try{
        yield fastx.deposit("0x0", action.depositPrice, 0, { from: fastx.defaultAccount});
    }catch (err){
        console.log("deposit error:",err)
    }
}

export const watchGetBalanceAsync = function* () {
    yield takeEvery('GET_BALANCE', getBalanceAsync)
}

export const watchGetAccount = function* () {
    yield takeEvery('GET_ACCOUNT', getAccountAsync)
}

export const watchSellAsset = function* () {
    yield takeEvery('SELL_ASSET', watchSellAssetAsync)
}

export const watchSellContractAsset = function* () {
    yield takeEvery('SELL_CONTRACT_ASSET', watchSellContractAssetAsync)
}

export const watchDeposit = function* () {
    yield takeEvery('DEPOSIT', watchDepositAsync)
}

