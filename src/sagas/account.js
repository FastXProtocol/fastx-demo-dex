import { put, takeEvery, all ,take} from 'redux-saga/effects'
// import Client from '../api/plasma_js_client'
import {chainOptions} from '../config'
import getWeb3 from "../utils/getWeb3"
// 
 
// const options = {
//     debug: true,
//     gethRpc: "http://dev2.msan.cn:8545",
//     fastXRpc: "http://dev2.msan.cn:8546/jsonrpc",
//     rootChainAddress: "0xD9FA1cbB70b74f3Ef259CE0eb48029F02eE0FcD1",
// };

// const client = new Client(options);

const ownerAddress = "0x7a0C61EdD8b5c0c5C1437AEb571d7DDbF8022Be4";



const web3 = getWeb3(chainOptions.gethRpc);


function* getBalanceAsync() {
	// let res = yield client.getBalance(ownerAddress).data.result
	// var balance = yield web3.eth.getBalance(ownerAddress);
	
    yield put({
	  type: 'BALANCE_RECEIVED',
	  balance: 100
	})
}

function* getCoinbaseAsync() {
	// let res = yield client.getBalance(ownerAddress).data.result
	// var balance = yield web3.eth.getBalance(ownerAddress);
	let address = yield web3.eth.getCoinbase();
    yield put({
	  type: 'COINBASE_RECEIVED',
	  ownerAddress: address
	})
}

export const watchGetBalanceAsync = function* () {
    yield takeEvery('GET_BALANCE', getBalanceAsync)
}

export const watchGetCoinbase = function* () {
    yield takeEvery('GET_COINBASE', getCoinbaseAsync)
}