import { put, takeEvery, all ,take} from 'redux-saga/effects'
import '../api/plasma_js_client_dev'
import { chainOptions } from '../config'

const client = new window.plasmaClient.client(chainOptions);

function* getBalanceAsync() {
	let wei = yield client.web3.eth.getBalance(client.web3.eth.defaultAccount);
	let ether = yield client.web3.utils.fromWei(wei, 'ether');
    yield put({
	  type: 'BALANCE_RECEIVED',
	  balance: parseFloat(parseFloat(ether).toFixed(4))
	})
}

function* getAccountAsync() {
	let address = client.web3.eth.defaultAccount;
    yield put({
	  type: 'ACCOUNT_RECEIVED',
	  ownerAddress: address
	})
}

export const watchGetBalanceAsync = function* () {
    yield takeEvery('GET_BALANCE', getBalanceAsync)
}

export const watchGetAccount = function* () {
    yield takeEvery('GET_ACCOUNT', getAccountAsync)
}