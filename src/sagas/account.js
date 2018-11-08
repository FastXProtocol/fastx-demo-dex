import { put, takeLatest, take} from 'redux-saga/effects';
import { delay, channel} from 'redux-saga';
import { chainOptions, retry, chainCategory} from '../config';
import moment from 'moment';
import axios from 'axios';

import {
  setFastx
} from '../actions/app'

let store, fastx;

async function getFastx() {
    while(!fastx) {
        fastx = store.getState().app.fastx;
        await delay(200);
    }

    return true;
}

async function waitNetworkReady() {
    let isReady = store.getState().network.networkReady;
    while(!isReady && typeof window.Web3 === 'undefined') {
        await delay(500);
        isReady = store.getState().network.networkReady;
    }

    return true;
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
            kitty.category = value[0];
            assets.push(kitty);
        }
    } catch(err) {
        console.log("get assent info err:",err)
    }

    return assets;
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
    let nft_contract = fastx.getErc721TokenInterface(asset_contract);

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
	const nft_ad = await depositNFT(data.params.category, data.params.sellId);
	await logBalance();
	const end = moment(data.params.end).add(1, 'days').unix();
	const price = parseFloat(await fastx.web3.utils.toWei((data.params.sellPrice+''), 'ether'));
	let transaction = await postNftAd(nft_ad.category, nft_ad.tokenId, end, price);
    return transaction;
}

const getFastxBalance = async() => {
    let balanceFT = [],balanceRes;
    try {
        balanceRes = await fastx.getBalance(fastx.defaultAccount);
        console.log('balanceRes:',balanceRes);
        balanceFT = balanceRes.FT;
    }catch(err){
        console.log("getBalanceErr:",err)
    }

    let balance = {},ethBalance = 0,fastxBalance = 0;
    const eth = '0'.repeat(40);
    const fastxToken = chainOptions.erc20ContractAddress.replace('0x','').toLocaleLowerCase();
    for(let value of balanceFT){
        const [_currency, _amount] = value;
        if(_currency == eth){
            ethBalance = _amount;
        }else if(_currency == fastxToken){
            fastxBalance = _amount;
        }
    }
    
    ethBalance = await fastx.web3.utils.fromWei((ethBalance+''), 'ether')
    fastxBalance = await fastx.web3.utils.fromWei((fastxBalance+''), 'ether')
    balance['eth'] = ethBalance
    balance['fastx'] = fastxBalance
    return balance
}

const getFastxAssets = async() => {
    let balanceNFT = [],balanceRes;
    try {
        balanceRes = await fastx.getBalance(fastx.defaultAccount);
        balanceNFT = balanceRes.NFT
    }catch(err){
        console.log("getBalanceErr:",err)
    }

    let assets = await getAssent(balanceNFT);

    return assets
}

const getETHBalance = async() => {
    let balance = {}, ethBalance = 0, fastxBalance = 0;

    try{
        let wei = await fastx.web3.eth.getBalance(fastx.defaultAccount)
        ethBalance = await fastx.web3.utils.fromWei(wei, 'ether')
        ethBalance = parseFloat(parseFloat(ethBalance).toFixed(4))
        balance['eth'] = ethBalance

        let erc20Contract = fastx.getErc20Interface(chainOptions.erc20ContractAddress)
        fastxBalance = await erc20Contract.methods.balanceOf(fastx.defaultAccount).call();
        fastxBalance = await fastx.web3.utils.fromWei(wei, 'ether')
        fastxBalance = parseFloat(parseFloat(fastxBalance).toFixed(4))
        balance['fastx'] = fastxBalance
    }catch(err){
        console.log(err);
    }

    return balance
}

const getETHAssets = async() => {
    let assets = [];

    try{
        const contract = fastx.getErc721TokenInterface(chainCategory);
        let tokenIndex = await contract.methods.balanceOf(fastx.defaultAccount).call();
        tokenIndex = parseInt(tokenIndex, 10);
        while(tokenIndex > 0){
            tokenIndex--;
            let token = await contract.methods.tokenOfOwnerByIndex(fastx.defaultAccount, tokenIndex).call();
            let kittyRes = await axios({
                method: 'get',
                url: 'https://api.cryptokitties.co/kitties/'+token
            })
            let kitty = kittyRes.data;
            if(!kitty.auction)kitty.auction = {};
            kitty.category = chainCategory;
            assets.push(kitty);
        }
    }catch(err){
        console.log(err);
    }

    return assets
}

const getUTXOs = async (address) => {
    return (await fastx.getAllUTXO(address)).data.result;
};

function* getBalanceAsync() {
    yield getFastx()
    yield waitNetworkReady()
    let currency = store.getState().account.currency;
    let balance;
    yield getAccountAsync();

    switch(currency){
        case 'Ethereum':
            balance = yield getETHBalance();
            break;
        case 'FastX':
        default:
            balance = yield getFastxBalance();
    }

    yield put({
      type: 'BALANCE_RECEIVED',
      balance: balance
    })
}

function* getAssetsAsync() {
    yield getFastx()
    yield waitNetworkReady()
    let currency = store.getState().account.currency;
    let assets;
    yield put({
      type: 'SET_ASSETS_LOADING',
      isLoading: true
    })

    yield getAccountAsync();

    switch(currency){
        case 'Ethereum':
            assets = yield getETHAssets();
            break;
        case 'FastX':
        default:
            assets = yield getFastxAssets();
    }

    yield put({
      type: 'USER_ITEMS_RECEIVED',
      items: assets
    })

    yield put({
      type: 'SET_ASSETS_LOADING',
      isLoading: false
    })
}

export function* getAccountAsync() {
    yield getFastx();
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

    //使用本地钱包时不在getAccountAsync内更新defaultAccount
    if(!fastx.defaultAccount && typeof window.Web3 !== 'undefined')
        fastx.defaultAccount = accounts[0];
    console.log('getAccountAddress:',fastx.defaultAccount);
    yield put({
      type: 'ACCOUNT_RECEIVED',
      ownerAddress: fastx.defaultAccount
    })
    yield put(setFastx(fastx));
}

function* watchSellAssetAsync(data) {
    yield getFastx();
    yield put({
      type: 'ASSETS_STATUS',
      status: 'waiting'
    })
    if(data.params.locationParams){
        yield postAd(data);
        yield put({
          type: 'ASSETS_STATUS',
          status: 'sent'
        })
    }else{
        const end = moment(data.params.end).add(1, 'days').unix();
        const price = parseFloat(yield fastx.web3.utils.toWei((data.params.sellPrice+''), 'ether'));
        console.log("sellContractAssetParams",data.params)
        try{
            let result = yield postNftAd(data.params.category, data.params.sellId, end, price);
            console.log("postNftAdResult:",result);
        }catch(err){
            console.log(err);
        }
        yield put({
          type: 'ASSETS_STATUS',
          status: 'sent'
        })
    }
}

const depositChannel = channel();

function* watchDepositAsync(action) {
    yield getFastx();
    const unit = store.getState().account.depositUnit;
    yield put({
      type: 'SET_STEPS',
      steps: [{'title':'Confirm','desc':'deposit the contract to access your asset'}]
    })
    yield put({
        type: 'SET_CUR_STEP',
        curStep: 1
    })

    let price = yield fastx.web3.utils.toWei((action.depositPrice+''), 'ether');
    let accounts = yield fastx.web3.eth.getAccounts()
    console.log(accounts)
    try{
        if(unit == 'ETH'){
            fastx.deposit("0x0", price, 0, { from: fastx.defaultAccount}).on('transactionHash', function (hash){
                //在回调中无法直接yield put更新，所以使用channel的方式处理
                depositChannel.put({
                  type: 'SET_CUR_STEP',
                  curStep: 2
                })
            });
        }else if(unit == 'fastx'){
            yield fastx.approve(chainOptions.erc20ContractAddress, price, 0, { from: fastx.defaultAccount});
            fastx.deposit(normalizeAddress(chainOptions.erc20ContractAddress).toString("hex"), price, 0, { from: fastx.defaultAccount}).on('transactionHash', function (hash){
                //在回调中无法直接yield put更新，所以使用channel的方式处理
                depositChannel.put({
                  type: 'SET_CUR_STEP',
                  curStep: 2
                })
            });
        }
    }catch (err){
        console.log("deposit error:",err)
    }
}

function* watchDepositChannel() {
  while (true) {
    const action = yield take(depositChannel)
    yield put(action)
  }
}

function* watchWithdrawalAsync(action) {
    yield getFastx();
    const unit = store.getState().account.withdrawalUnit;
  
    yield put({
      type: 'SET_STEPS',
      steps: [{'title':'Confirm','desc':'Approve the contract to access your asset'}]
    })
    yield put({
        type: 'SET_CUR_STEP',
        curStep: 1
    })
    try {
        let price = yield fastx.web3.utils.toWei((action.withdrawalPrice+''), 'ether');
        let useUtxo
        if(unit == 'ETH'){
            useUtxo = yield fastx.getOrNewEthUtxo(price, {from:fastx.defaultAccount})
        }else if(unit == 'fastx'){
            const utxos = yield getUTXOs();
            for(const utxo of utxos){
                const [blknum, txindex, oindex, contractAddress, amount, tokenid] = utxo;
                if (blknum % 1000 == 0 && normalizeAddress(contractAddress).toString("hex") == normalizeAddress(chainOptions.erc20ContractAddress).toString("hex")) {
                    console.log("UTXO", utxo);
                    useUtxo = utxo;
                }
            }
        }
        const [blknum, txindex, oindex, contractAddress, amount, tokenid] = useUtxo;
        yield fastx.startExit(blknum, txindex, oindex, contractAddress, amount, tokenid, {from:fastx.defaultAccount});
    } catch (e) {
        console.log(e)
        alert(e)
    } finally {
        yield put({
            type: 'SET_CUR_STEP',
            curStep: 2
        })
    }
}

export default function * accountSaga (arg) {
    store = arg;
    yield takeLatest('GET_ACCOUNT', getAccountAsync)
    yield takeLatest('SELL_ASSET',  watchSellAssetAsync)
    yield takeLatest('DEPOSIT', watchDepositAsync)
    yield takeLatest('DEPOSIT', watchDepositChannel)
    yield takeLatest('WITHDRAWAL', watchWithdrawalAsync)
    yield takeLatest('GET_BALANCE', getBalanceAsync)
    yield takeLatest('GET_BALANCE', getAssetsAsync)
    yield takeLatest('web3/CHANGE_ACCOUNT',getBalanceAsync)
    yield takeLatest('web3/CHANGE_ACCOUNT',getAssetsAsync)
}
