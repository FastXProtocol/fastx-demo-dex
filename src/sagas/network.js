import { take, call, put, select, takeLatest, race, fork } from 'redux-saga/effects';
import { delay, channel } from 'redux-saga';
import SignerProvider from 'ethjs-provider-signer';
import BigNumber from 'bignumber.js';

import { network } from '../config';

import {
    loadNetworkSuccess,
    loadNetworkError,
    checkBalances,
    checkBalancesSuccess,
    checkBalancesError
 } from '../actions/network';

 import {
     updateAddress
 } from '../actions/wallet'

 import {
   setFastx
 } from '../actions/app'

 import {
  confirmSendTransactionSuccess,
  confirmSendTransactionError,
  sendTransactionSuccess,
  sendTransactionError,
} from '../actions/sendToken';

const offlineModeString = 'Offline';
// time in ms for check balancess polling
const maxGasForEthSend = 25000;
const timeBetweenCheckbalances = 180 * 1000;
const Ether = (1.0e18).toString();
const Gwei = (1.0e9).toString();
let store,fastx;

async function getFastx(func) {
    while(!fastx) {
        fastx = store.getState().app.fastx;
        await delay(200);
    }

    return true;
}

function* loadNetworkAsync(action) {
    yield getFastx();
    try {
        const rpcAddress = network[action.networkName].rpc;
        if (!rpcAddress) {
          throw new Error(`${action.networkName} network not found`);
        }

        if (action.networkName === offlineModeString) {
          fastx.web3.setProvider(null);
          yield put(loadNetworkError(offlineModeString));
          yield put(setFastx(fastx));
          return;
        }

        const keystore = store.getState().wallet.keystore;

        if (keystore) {
            try{
                const provider = new SignerProvider(rpcAddress, {
                    signTransaction: keystore.signTransaction.bind(keystore),
                    accounts: (cb) => cb(null, keystore.getAddresses()),
                });

                fastx.web3.setProvider(provider);
            }catch(err){
                console.log(err)

            }

            function getBlockNumberPromise() { // eslint-disable-line no-inner-declarations
                return new Promise((resolve, reject) => {
                    fastx.web3.eth.getBlockNumber((err, data) => {
                        if (err !== null) return reject(err);
                        return resolve(data);
                    });
                });
            }
            const blockNumber = yield call(getBlockNumberPromise);

            yield delay(600);
            yield put(loadNetworkSuccess(blockNumber));
            yield put(checkBalances());
            yield put(setFastx(fastx));
        } else {
            throw new Error('keystore not initiated - Create wallet before connecting');
        }
    } catch (err) {
        const errorString = `loadNetwork error - ${err.message}`;
        yield put(loadNetworkError(err.message));
    }
}

export function getEthBalancePromise(address) {
  return new Promise((resolve, reject) => {
    fastx.web3.eth.getBalance(address, (err, data) => {
      if (err !== null) return reject(err);
      return resolve(data);
    });
  });
}

function* pollData() {
  try {
    yield call(delay, timeBetweenCheckbalances);
    yield put(checkBalances());
  } catch (error) {
    console.log(error);
  }
}

function* watchPollData() {
  while (true) { // eslint-disable-line
    yield take(['CHECK_BALANCES_SUCCESS', 'CHECK_BALANCES_ERROR']);
    yield race([ // eslint-disable-line
      call(pollData),
      take('STOP_POLL_BALANCES'),
    ]);
  }
}

function* checkAllBalances() {
  try {
    let j = 0;
    const addressList = store.getState().wallet.addressList;
    for (let address in addressList){
        let balance = yield call(getEthBalancePromise, address);
        balance = yield fastx.web3.utils.fromWei((balance+''), 'ether')
        addressList[address]['eth']['balance'] = balance;
    }
    yield put(updateAddress(addressList))
    yield put(checkBalancesSuccess());
  } catch (err) {
    yield put(checkBalancesError(err.message));
  }
}

export function* confirmSendTransaction() {
    yield getFastx();
    try {
        const fromAddress = store.getState().sendToken.from;
        const amount = store.getState().sendToken.amount;
        const toAddress = store.getState().sendToken.to;
        const gasPrice = store.getState().sendToken.gasPrice;

        if (!fastx.web3.utils.isAddress(fromAddress)) {
            alert('Source address invalid')
            return
        }

        if (amount <= 0) {
            alert('Amount must be possitive')
            return
        }

        if (!fastx.web3.utils.isAddress(toAddress)) {
            alert('Destenation address invalid')
            return
        }

        if (!(gasPrice > 0.1)) {
            alert('Gas price must be at least 0.1 Gwei')
            return
        }

        const msg = `Transaction created successfully.
        Sending ${amount} from ...${fromAddress.slice(-5)} to ...${toAddress.slice(-5)}`;
        yield put(confirmSendTransactionSuccess(msg));
    } catch (err) {
        yield put(confirmSendTransactionError(err.message));
    }
}

export function* SendTransaction() {

    const keystore = store.getState().wallet.keystore;
    const origProvider = keystore.passwordProvider;
    try {
        const fromAddress = store.getState().sendToken.from;
        const amount = store.getState().sendToken.amount;
        const toAddress = store.getState().sendToken.to;
        const gasPrice = new BigNumber(store.getState().sendToken.gasPrice).times(Gwei);
        const password = store.getState().wallet.password;

        const tokenToSend = 'eth';

        if (!password) {
            alert('No password found - please unlock wallet before send')
            return;
        }
        if (!keystore) {
            alert('No keystore found - please create wallet')
            return;
        }
        keystore.passwordProvider = (callback) => {
            const ksPassword = password;
            callback(null, ksPassword);
        };

        let tx;
        const sendAmount = new BigNumber(amount).times(Ether);
        const sendParams = { from: fromAddress, to: toAddress, value: sendAmount, gasPrice, gas: maxGasForEthSend };
        function sendTransactionPromise(params) { // eslint-disable-line no-inner-declarations
          return new Promise((resolve, reject) => {
            fastx.web3.eth.sendTransaction(params, (err, data) => {
              if (err !== null) return reject(err);
              return resolve(data);
            });
          });
        }
        tx = yield call(sendTransactionPromise, sendParams);

        yield put(sendTransactionSuccess(tx));
    } catch (err) {
        console.log(err)
        const loc = err.message.indexOf('at runCall');
        const errMsg = (loc > -1) ? err.message.slice(0, loc) : err.message;
        yield put(sendTransactionError(errMsg));
    } finally {
        keystore.passwordProvider = origProvider;
    }
}

export default function * networkSaga (arg) {
    store = arg;
    yield takeLatest('LOAD_NETWORK', loadNetworkAsync)
    yield takeLatest('COMFIRM_SEND_TRANSACTION', confirmSendTransaction);
    yield takeLatest('SEND_TRANSACTION', SendTransaction);

    /* poll check balances */
    yield [
        fork(watchPollData),
        takeLatest('CHECK_BALANCES', checkAllBalances),
    ];
    /* End of poll check balances */
}
