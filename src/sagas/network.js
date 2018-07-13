import { take, call, put, select, takeLatest, race, fork } from 'redux-saga/effects';
import { delay, channel } from 'redux-saga';
import { SignerProvider } from 'ethjs-provider-signer';

import { network } from '../config';

import { loadNetworkSuccess, loadNetworkError } from '../actions/network';

const offlineModeString = 'Offline';
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
            const provider = new SignerProvider(rpcAddress, {
                signTransaction: keystore.signTransaction.bind(keystore),
                accounts: (cb) => cb(null, keystore.getAddresses()),
            });

            fastx.web3.setProvider(provider);

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
        } else {
            throw new Error('keystore not initiated - Create wallet before connecting');
        }
    } catch (err) {
        const errorString = `loadNetwork error - ${err.message}`;
        yield put(loadNetworkError(err.message));
    }
}

export default function * networkSaga (arg) {
    store = arg;
    yield takeLatest('LOAD_NETWORK', loadNetworkAsync)
}
