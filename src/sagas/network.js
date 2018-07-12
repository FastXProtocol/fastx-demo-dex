import { take, call, put, select, takeLatest, race, fork } from 'redux-saga/effects';
import { Network } from '../config';

const offlineModeString = 'Offline';

function* loadNetworkAsync(action) {

  try {
    const rpcAddress = Network[action.networkName].rpc;
    if (!rpcAddress) {
      throw new Error(`${action.networkName} network not found`);
    }

    if (action.networkName === offlineModeString) {
      web3.setProvider(null);
      yield put(stopPollingBalances());
      yield put(loadNetworkError(offlineModeString));
      return;
    }

    const keystore = yield select(makeSelectKeystore());

    if (keystore) {
      const provider = new SignerProvider(rpcAddress, {
        signTransaction: keystore.signTransaction.bind(keystore),
        accounts: (cb) => cb(null, keystore.getAddresses()),
      });

      web3.setProvider(provider);

      function getBlockNumberPromise() { // eslint-disable-line no-inner-declarations
        return new Promise((resolve, reject) => {
          web3.eth.getBlockNumber((err, data) => {
            if (err !== null) return reject(err);
            return resolve(data);
          });
        });
      }
      const blockNumber = yield call(getBlockNumberPromise);

      yield call(timer, 600);

      yield put(loadNetworkSuccess(blockNumber));

      // actions after succesfull network load :
      yield put(checkBalances());
      yield put(getExchangeRates());

      // clear token list if changed network

      const prevNetwork = yield select(makeSelectPrevNetworkName());
      if (prevNetwork !== action.networkName) {
        yield put(updateTokenInfo(keystore.getAddresses, action.tokenInfo));
      }

      const usedFaucet = yield select(makeSelectUsedFaucet());
      if (action.networkName === 'Ropsten Testnet' && !usedFaucet) {
        yield put(checkFaucet());
      }
    } else {
      throw new Error('keystore not initiated - Create wallet before connecting');
    }
  } catch (err) {
    // const errorString = `loadNetwork error - ${err.message}`;
    yield put(loadNetworkError(err.message));
  }
}

export default function * networkSaga (arg) {
    yield takeEvery('LOAD_NETWORK', loadNetworkAsync)
}
