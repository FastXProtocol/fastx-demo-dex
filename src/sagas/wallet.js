import { take, call, put, select, takeLatest, race, fork } from 'redux-saga/effects'
import { delay, channel } from 'redux-saga'
import SignerProvider from 'ethjs-provider-signer';
import lightwallet from 'eth-lightwallet'

import { network } from '../config'
import generateString from '../utils/crypto'
import pwdPrompt from '../utils/pwdPrompt'

import {
  generateWalletSucces,
  generateWalletError,
  generateKeystore,
  generateKeystoreError,
  generateKeystoreSuccess,
  generateAddressSuccess,
  generateAddressError,
  saveWallet,
  saveWalletSuccess,
  saveWalletError,
  saveKs,
  loadWalletSuccess,
  loadWalletError,
  changeUserSeed,
  restoreWalletFromSeedError,
  restoreWalletFromSeedSuccess,
  unlockWalletSuccess,
  unlockWalletError
} from '../actions/wallet'

import { getAccountAsync } from './account'

import {
  loadNetwork
} from '../actions/network'

import {
  setFastx
} from '../actions/app'

import {
  changeFrom
} from '../actions/sendToken'

import { getEthBalancePromise, setProvider } from './network';

const generatedPasswordLength = 12
const hdPathString = `m/44'/60'/0'/0`
const defaultNetwork = 'Local RPC'
const localStorageKey = 'ks';
const offlineModeString = 'Offline';
let fastx,store

async function getFastx(func) {
    while(!fastx) {
        fastx = store.getState().app.fastx;
        await delay(200);
    }

    return true;
}

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
      // const pw = prompt('Please enter keystore password', ''); // eslint-disable-line
      // callback(null, pw);
      window.ksPasswordCallback = callback
      pwdPrompt()
    };

    const pwDerivedKey = yield call(keyFromPasswordPromise, password);
    ks.generateNewAddress(pwDerivedKey, 2);

    const tokenList = ['eth'];

    yield put(generateKeystoreSuccess(ks, tokenList));
    yield put(loadNetwork(defaultNetwork));
    yield put(saveWallet());
    yield changeCurAccount({address:('0x'+ks.addresses[0])})
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
    yield changeCurAccount({address:('0x'+ks.addresses[0])})
    const tokenList = ['eth'];
    yield put(generateKeystoreSuccess(ks, tokenList));
    yield put(loadNetwork(defaultNetwork));
    yield put(loadWalletSuccess());
  } catch (err) {
    const errorString = `${err.message}`;
    yield put(loadWalletError(errorString));
  }
}

/**
 * check seed given by user
 */
export function* restoreFromSeed() {
  try {
    const userPassword = store.getState().wallet.userPassword;
    let userSeed = store.getState().wallet.userSeed;

    // remove trailing spaces if needed
    yield put(changeUserSeed(userSeed.replace(/^\s+|\s+$/g, '')));
    userSeed = store.getState().wallet.userSeed;

    if (!lightwallet.keystore.isSeedValid(userSeed)) {
      yield put(restoreWalletFromSeedError('Invalid seed'));
      return;
    }

    if (userPassword.length < 8) {
      yield put(restoreWalletFromSeedError('Password length must be 8 characters at least'));
      return;
    }

    yield put(restoreWalletFromSeedSuccess(userSeed, userPassword));
    yield put(generateKeystore());
  } catch (err) {
    yield put(restoreWalletFromSeedError(err));
  }
}

/**
 * Disconnect from network during closeWallet
 */
function* closeWallet() {
  yield put(saveKs(null))
  yield put(loadNetwork(offlineModeString));
  yield changeCurAccount({address:''})
}

function* generateAddress() {
  yield getFastx();
  try {
    const ks = store.getState().wallet.keystore;
    if (!ks) {
      throw new Error('No keystore found');
    }

    const password = store.getState().wallet.password;
    if (!password) {
      // TODO: Handle password
      throw new Error('Wallet Locked');
    }

    function keyFromPasswordPromise(param) { // eslint-disable-line no-inner-declarations
      return new Promise((resolve, reject) => {
        ks.keyFromPassword(param, (err, data) => {
          if (err !== null) return reject(err);
          return resolve(data);
        });
      });
    }

    const pwDerivedKey = yield call(keyFromPasswordPromise, password);
    ks.generateNewAddress(pwDerivedKey, 1);
    let addressList = store.getState().wallet.addressList;
    const newAddress = ks.getAddresses().slice(-1)[0];
    const index = ks.getAddresses().length;
    let balance = yield call(getEthBalancePromise, newAddress);
    balance = yield fastx.web3.utils.fromWei((balance+''), 'ether')
    addressList[newAddress] = {
        'eth': {'balance': balance},
        'index': index
    }
    yield put(generateAddressSuccess(addressList));
    yield put(saveWallet());
  } catch (err) {
    yield call(delay, 1000);
    yield put(generateAddressError(err.message));
  }
}

function* lockWallet() {
    const ks = store.getState().wallet.keystore;
    ks.passwordProvider = (callback) => {
      // const pw = prompt('Please enter keystore password', ''); // eslint-disable-line
      // callback(null, pw);
      window.ksPasswordCallback = callback
      pwdPrompt()
    };
    const rpcAddress = network[store.getState().network.networkName].rpc;
    setProvider(ks, rpcAddress)
}



function* unlockWallet() {
  try {
    const currentPassword = store.getState().wallet.password;
    if (currentPassword) {
      throw Error('Wallet Already unlocked');
    }

    const ks = store.getState().wallet.keystore;
    if (!ks) {
      throw new Error('No keystore to unlock');
    }
    
    ks.passwordProvider = (callback) => {
      let ksPassword = store.getState().wallet.password;
      if(!ksPassword){
          //ksPassword = prompt('Please enter keystore password', '');
          window.ksPasswordCallback = callback
          pwdPrompt()
      }else{
          callback(null, ksPassword);
      }
    };
    const passwordProvider = ks.passwordProvider;

    function passwordProviderPromise() { // eslint-disable-line no-inner-declarations
      return new Promise((resolve, reject) => {
        passwordProvider((err, data) => {
          if (err !== null) return reject(err);
          return resolve(data);
        });
      });
    }

    function keyFromPasswordPromise(param) { // eslint-disable-line no-inner-declarations
      return new Promise((resolve, reject) => {
        ks.keyFromPassword(param, (err, data) => {
          if (err !== null) return reject(err);
          return resolve(data);
        });
      });
    }

    const userPassword = yield call(passwordProviderPromise);

    if (!userPassword) {
      throw Error('No password entered');
    }

    const pwDerivedKey = yield call(keyFromPasswordPromise, userPassword);
    // TODO: Move into password provider?
    const isPasswordCorrect = ks.isDerivedKeyCorrect(pwDerivedKey);

    if (!isPasswordCorrect) {
      throw Error('Invalid Password');
    }

    yield put(unlockWalletSuccess(userPassword));

    const rpcAddress = network[store.getState().network.networkName].rpc;
    setProvider(ks, rpcAddress)
  } catch (err) {
    console.log(err)
    const errorString = `Unlock wallet error - ${err.message}`;
    yield put(unlockWalletError(errorString));
  }
}

export function* changeSourceAddress(action) {
  // wait for container to load and then change from address
  if (action.address) {
    yield put(changeFrom(action.address, action.sendTokenSymbol));
  }
}

export function* changeCurAccount(action) {
    yield getFastx()
    fastx.defaultAccount = action.address;
    yield put({
      type: 'ACCOUNT_RECEIVED',
      ownerAddress: fastx.defaultAccount
    })
    yield put(setFastx(fastx));
}

export default function* walletSaga(args) {
    store = args
    yield takeLatest('GENERATE_WALLET', generateWallet)
    yield takeLatest('GENERATE_KEYSTORE', genKeystore)
    yield takeLatest('GENERATE_ADDRESS', generateAddress);
    yield takeLatest('LOCK_WALLET', lockWallet);
    yield takeLatest('UNLOCK_WALLET', unlockWallet);
    yield takeLatest('SAVE_WALLET', saveWalletS);
    yield takeLatest('LOAD_WALLET', loadWalletS);
    yield takeLatest('RESTORE_WALLET_FROM_SEED', restoreFromSeed);
    yield takeLatest('CLOSE_WALLET', closeWallet);
    yield takeLatest('SHOW_SEND_TOKEN', changeSourceAddress);
    yield takeLatest('CHANGE_CUR_ACCOUNT', changeCurAccount);
}
