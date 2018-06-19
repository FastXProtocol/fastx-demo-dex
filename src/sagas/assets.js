import { put, takeEvery, all ,take} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import axios from 'axios';
import { chainOptions } from '../config';
import erc721_abi from "../contract_data/ERC721Token.abi.json";

const fastx = new window.plasmaClient.client(chainOptions);

const allPsTransactions = async () => {
    let allPsRes = await fastx.getAllPsTransactions();
    console.log(allPsRes)
    return allPsRes.data.result;
}

function* getAssetsAsync(params) {
    let categories = {};

    let categoriesUrls = [];
    let assets = [];
    yield put({
      type: 'SET_ASSETS_LOADING',
      isLoading: true
    })

    let allPs = yield allPsTransactions();
    yield put({
      type: 'ALLPS_RECEIVED',
      allPs: allPs
    })

    for(let value of allPs){
        let kittyRes = {};
        try {
            kittyRes = yield axios({
                method: 'get',
                url: 'https://api.cryptokitties.co/kitties/'+value.tokenid2
            })
        } catch (error) {
            return yield put({ type: 'ASSET_CATEGORIES_REQUEST_FAILED', error })
        }
        let kitty = kittyRes.data;
        if(!kitty.auction)kitty.auction = {};
        kitty.auction.discount = 0;
        kitty.auction.ending_at = value.expiretimestamp;
        kitty.auction.current_price = value.amount1.toString();
        kitty.auction.starting_price = '0';
        assets.push(kitty);
    }

    yield put({
	  type: 'ASSETS_RECEIVED',
	  results: assets
	})

    yield put({
      type: 'SET_ASSETS_LOADING',
      isLoading: false
    })
}

function* getAssetsDetailAsync(action) {
    let kittyRes = yield axios({
        method: 'get',
        url: 'https://api.cryptokitties.co/kitties/'+action.id
    })
    let kitty = kittyRes.data;
    if(!kitty.auction)kitty.auction = {};
    kitty.auction.discount = 0;
    kitty.auction.ending_at = 1528905600;
    kitty.auction.current_price = '0';
    kitty.auction.starting_price = '0';

    let allPs = yield allPsTransactions();
    yield put({
      type: 'ALLPS_RECEIVED',
      allPs: allPs
    })

    yield put({
      type: 'ASSET_DETAIL_RECEIVED',
      asset: kitty
    })
}

const bidAd = async (category,tokenId,fillTx) => {
    console.log(fillTx)
    let receiverAddress = fastx.web3.eth.defaultAccount;
    console.log('receiverAddress',receiverAddress);
    console.log('defaultAccount: ', fastx.defaultAccount);

    // await fastx.deposit("0x0", 1, 0, { from: receiverAddress});
    let utxos = await fastx.getAllUTXO(receiverAddress);
    console.log('utxos:',utxos.data)
    let utxo = await fastx.searchUTXO({
            category: fillTx.contractaddress1, 
            tokenId: fillTx.tokenid1, 
            amount: fillTx.amount1
        }, { from: receiverAddress });
    console.log('\nUTXO',utxo);
   if (utxo.length > 0) {
    const [_blknum, _txindex, _oindex, _contract, _balance, _tokenid] = utxo;
    let res = await fastx.sendPsTransactionFill(fillTx, _blknum, _txindex, _oindex, receiverAddress, receiverAddress);
    console.log(res);
   }
}

function* assetBuyAsync(action) {
    console.log(action)
    yield bidAd(action.category, action.id, action.fillTx)
} 

function* publishStatusAsync(action) {
    let allPs = yield allPsTransactions();
    let hasPublished = false;
    for(let value of allPs){
        if(value.contractaddress2 == action.category && value.tokenid2 == action.id)hasPublished = true;
    }
    yield put({
      type: 'SET_PUBLISH_STATUS',
      hasPublished
    })
}

export const watchGetAssetsAsync = function* () {
    yield takeEvery('GET_ASSETS', getAssetsAsync)
}

export const watchGetAssetsDetailAsync = function* () {
    yield takeEvery('GET_ASSET_DETAIL', getAssetsDetailAsync)
}

export const watchSetAssetsFilterAsync = function* () {
    yield takeEvery('SET_ASSETS_FILTER', getAssetsAsync)
}

export const watchSearchAssetsTitleAsync = function* () {
    yield takeEvery('ASSETS_SEARCH', getAssetsAsync)
}

export const watchassetBuyAsync = function* () {
    yield takeEvery('ASSETS_BUY', assetBuyAsync)
}

export const watchPublishStatusAsync = function* () {
    yield takeEvery('GET_PUBLISH_STATUS', publishStatusAsync)
}