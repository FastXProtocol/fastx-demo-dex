import { take, call, put, select, takeLatest, race, fork } from 'redux-saga/effects';
import { delay, channel } from 'redux-saga';
import SignerProvider from 'ethjs-provider-signer';

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

const offlineModeString = 'Offline';
// time in ms for check balancess polling
export const timeBetweenCheckbalances = 180 * 1000;
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

export default function * networkSaga (arg) {
    store = arg;
    yield takeLatest('LOAD_NETWORK', loadNetworkAsync)

    /* poll check balances */
    yield [
        fork(watchPollData),
        takeLatest('CHECK_BALANCES', checkAllBalances),
    ];
    /* End of poll check balances */
}
