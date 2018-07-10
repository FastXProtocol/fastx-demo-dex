import { put, takeEvery, take} from 'redux-saga/effects';
import { delay, channel} from 'redux-saga';
import { chainOptions, retry, chainCategory} from '../config';
import moment from 'moment';
import axios from 'axios';

let store, fastx;

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
	const price = parseFloat(data.params.sellPrice);
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

    let balance = 0;
    const eth = '0'.repeat(40);
    for(let value of balanceFT){
        const [_currency, _amount] = value;
        if(_currency == eth){
            balance = _amount;
            break;
        }
    }

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
    let balance = 0;

    try{
        let wei = await fastx.web3.eth.getBalance(fastx.defaultAccount);
        balance = await fastx.web3.utils.fromWei(wei, 'ether');
        balance = parseFloat(parseFloat(balance).toFixed(4))
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

function* getBalanceAsync() {
    yield getFastx();
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
      balance: parseFloat(balance)
    })
}

function* getAssetsAsync() {
    yield getFastx();
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

function* getAccountAsync() {
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

    fastx.defaultAccount = accounts[0];
    console.log('getAccountAddress:',fastx.defaultAccount);
    yield put({
      type: 'ACCOUNT_RECEIVED',
      ownerAddress: accounts[0]
    })
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
        const price = parseFloat(data.params.sellPrice);
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

    yield put({
      type: 'DEPOSIT_STATUS',
      waiting: false
    })

    try{
        fastx.deposit("0x0", action.depositPrice, 0, { from: fastx.defaultAccount}).on('transactionHash', function (hash){
            //在回调中无法直接yield put更新，所以使用channel的方式处理
            depositChannel.put({
              type: 'DEPOSIT_STATUS',
              waiting: true
            })
        });
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

async function getFastx(func) {
    while(!fastx) {
        fastx = store.getState().app.fastx;
        await delay(200);
    }

    return true;
}

export default function * accountSaga (arg) {
    store = arg;
    yield takeEvery('GET_ACCOUNT', getAccountAsync)
    yield takeEvery('SELL_ASSET',  watchSellAssetAsync)
    yield takeEvery('DEPOSIT', watchDepositAsync)
    yield takeEvery('DEPOSIT', watchDepositChannel)
    yield takeEvery('GET_BALANCE', getBalanceAsync)
    yield takeEvery('GET_BALANCE', getAssetsAsync)
    yield takeEvery('web3/CHANGE_ACCOUNT',getBalanceAsync)
    yield takeEvery('web3/CHANGE_ACCOUNT',getAssetsAsync)
}
