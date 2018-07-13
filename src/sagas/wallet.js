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
} from '../actions/wallet'

import {
  loadNetwork
} from '../actions/network'

const generatedPasswordLength = 12
const hdPathString = `m/44'/60'/0'/0`
const defaultNetwork = 'Ropsten Testnet'
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
    const seedPhrase = store.getState().wallet.seedPhrase;
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

export default function* walletSaga(args) {
    store = args
    yield takeLatest('GENERATE_WALLET', generateWallet)
    yield takeLatest('GENERATE_KEYSTORE', genKeystore)
}
