import { take, call, put, select, takeLatest, race, fork } from 'redux-saga/effects'
import { delay, channel } from 'redux-saga'
import { SignerProvider } from 'ethjs-provider-signer'
import lightwallet from 'eth-lightwallet'

import { network } from '../config'
import generateString from '../utils/crypto'

import {
  generateWalletSucces,
  generateWalletError,
  generateKeystoreError,
  generateKeystoreSuccess,
  saveWallet,
  saveWalletSuccess,
  saveWalletError,
  saveKs,
  loadWalletSuccess,
  loadWalletError
} from '../actions/wallet'

import {
  loadNetwork
} from '../actions/network'

const generatedPasswordLength = 12
const hdPathString = `m/44'/60'/0'/0`
const defaultNetwork = 'Ropsten Testnet'
const localStorageKey = 'ks';
let store

/**
 * Create new seed and password
 */
export function* generateWallet() {
  try {
    const password = generateString(generatedPasswordLength)
    const extraEntropy = generateString(generatedPasswordLength)
    const seed = lightwallet.keystore.generateRandomSeed(extraEntropy)

    yield delay(500);

    yield put(generateWalletSucces(seed, password))
  } catch (err) {
    yield put(generateWalletError(err))
  }
}

/* keyStore.createVault({password: password,
    seedPhrase: '(opt)seed',entropy: '(opt)additional entropy',salt: '(opt)'}, function (err, ks) {}); */
function createVaultPromise(param) {
  return new Promise((resolve, reject) => {
    lightwallet.keystore.createVault(param, (err, data) => {
      if (err !== null) return reject(err);
      return resolve(data);
    });
  });
}

/**
 * Create new keystore and generate some addreses
 */
export function* genKeystore() {
  try {
    const password = store.getState().wallet.password;
    const seedPhrase = store.getState().wallet.seed;
    const opt = {
      password,
      seedPhrase,
      hdPathString,
    };

    yield delay(300);

    const ks = yield call(createVaultPromise, opt);
    function keyFromPasswordPromise(param) { // eslint-disable-line no-inner-declarations
      return new Promise((resolve, reject) => {
        ks.keyFromPassword(param, (err, data) => {
          if (err !== null) return reject(err);
          return resolve(data);
        });
      });
    }

    ks.passwordProvider = (callback) => {
      // const password = yield select(makeSelectPassword());
      const pw = prompt('Please enter keystore password', 'Password'); // eslint-disable-line
      callback(null, pw);
    };

    const pwDerivedKey = yield call(keyFromPasswordPromise, password);
    ks.generateNewAddress(pwDerivedKey, 2);

    const tokenList = ['eth'];

    yield put(generateKeystoreSuccess(ks, tokenList));
    yield put(loadNetwork(defaultNetwork));
    yield put(saveWallet());
  } catch (err) {
    const errorString = `genKeystore error - ${err}`;
    yield put(generateKeystoreError(errorString));
  }
}

/**
 * Save wallet to localStorage
 */
export function* saveWalletS() {
  try {
    const ks = store.getState().wallet.keystore
    if (!ks) {
      throw new Error('No keystore defined');
    }

    const dump = {
      ver: '1',
      saved: new Date().toISOString(),
      ks: ks.serialize(),
    };
    // console.log(`Saving len: ${JSON.stringify(dump).length}`);

    //localStore.set(localStorageKey, dump);
    yield put(saveKs(dump))
    yield put(saveWalletSuccess())
  } catch (err) {
    const errorString = `${err.message}`;
    yield put(saveWalletError(errorString));
  }
}

/**
 * Load wallet from localStorage
 */
export function* loadWalletS() {
  try {
    yield delay(1000);
    const existingKs = store.getState().wallet.keystore;
    if (existingKs) {
      throw new Error('Existing keystore present  - aborting load form localStorage');
    }

    const dump = store.getState().localStorage.ks;
    if (!dump) {
      throw new Error('No keystore found in localStorage');
    }
    // console.log(`Load len: ${JSON.stringify(dump).length}`);

    const ksDump = dump.ks;
    const ks = lightwallet.keystore.deserialize(ksDump);

    const tokenList = ['eth'];
    yield put(generateKeystoreSuccess(ks, tokenList));
    yield put(loadNetwork(defaultNetwork));
    yield put(loadWalletSuccess());
  } catch (err) {
    const errorString = `${err.message}`;
    yield put(loadWalletError(errorString));
  }
}

export default function* walletSaga(args) {
    store = args
    yield takeLatest('GENERATE_WALLET', generateWallet)
    yield takeLatest('GENERATE_KEYSTORE', genKeystore)
    yield takeLatest('SAVE_WALLET', saveWalletS);
    yield takeLatest('LOAD_WALLET', loadWalletS);
}
