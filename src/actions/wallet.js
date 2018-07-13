import { flashMsgOpen } from '../actions/modal'
import store from '../index'

const message = (text) => {
    store.dispatch(text);
}

export function onTipMsgCancel() {
  return {
    type: 'TIP_MSG_CANCEL',
  };
}

/* ********************************Generate Wallet ******************************* */

/**
 * Open generate wallet modal and generate new random seed and password
 *
 * @return {object}    An action object with a type of GENERATE_WALLET
 */
export function generateWallet() {
  return {
    type: 'GENERATE_WALLET',
  };
}
/**
 * New Seed and password genetated successfully
 *
 * @param  {string} seed
 * @param  {string} password The current username
 *
 * @return {object}      An action object with a type of GENERATE_WALLET_SUCCESS passing the repos
 */
export function generateWalletSucces(seed, password) {
  return {
    type: 'GENERATE_WALLET_SUCCESS',
    seed,
    password,
  };
}
/**
 * Dispatched when generating the seed / password fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of GENERATE_WALLET_ERROR passing the error
 */
export function generateWalletError(error) {
  message(error);
  return {
    type: 'GENERATE_WALLET_ERROR',
    error,
  };
}
/**
 * Generate wallet is canceled by user
 *
 * @return {object}    An action object with a type of GENERATE_WALLET_CANCEL
 */
export function generateWalletCancel() {
  return {
    type: 'GENERATE_WALLET_CANCEL',
  };
}

/** ****************** Restore wallet *************** */

/**
 * Show the restore wallet component
 *
 * @return {object}    An action object with a type of SHOW_RESTORE_WALLET
 */
export function showRestoreWallet() {
  return {
    type: 'SHOW_RESTORE_WALLET',
  };
}

/**
 * close restore wallet modal
 *
 * @return {object}    An action object with a type of RESTORE_WALLET_CANCEL
 */
export function restoreWalletCancel() {
  return {
    type: 'RESTORE_WALLET_CANCEL',
  };
}

/**
 * Changes the input field for user seed
 *
 * @param  {name} seed The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USER_SEED
 */
export function changeUserSeed(userSeed) {
  return {
    type: 'CHANGE_USER_SEED',
    userSeed,
  };
}

/**
 * Changes the input field for user password
 *
 * @param  {name} seed The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USER_SEED
 */
export function changeUserPassword(userPassword) {
  const password = userPassword;// .replace(/^\s+|\s+$/g, '');
  return {
    type: 'CHANGE_USER_PASSWORD',
    password,
  };
}

/**
 * Try to restore wallet from seed provided by user.
 *
 * @return {object}    An action object with a type of RESTORE_WALLET_FROM_SEED
 *
 */
export function restoreWalletFromSeed() {
  return {
    type: 'RESTORE_WALLET_FROM_SEED',
  };
}

/**
 * Valid seed provided by user
 *
 * @return {object}    An action object with a type of RESTORE_WALLET_FROM_SEED_SUCCESS
 */
export function restoreWalletFromSeedSuccess(userSeed, userPassword) {
  return {
    type: 'RESTORE_WALLET_FROM_SEED_SUCCESS',
    userSeed,
    userPassword,
  };
}

/**
 * Invalid seed provided by user
 *
 * @return {object}    An action object with a type of RESTORE_WALLET_FROM_SEED_ERROR
 */
export function restoreWalletFromSeedError(error) {
  message(error);
  return {
    type: 'RESTORE_WALLET_FROM_SEED_ERROR',
    error,
  };
}

/** ********************** Confirm seed and generate keystore ************ */

/**
 * Confirm seed and create new keystore
 *
 * @return {object}    An action object with a type of GENERATE_KEYSTORE
 */
export function generateKeystore() {
  return {
    type: 'GENERATE_KEYSTORE',
  };
}

/** ********************** Confirm seed and generate keystore ************ */

/**
 * Dispatched when generating the wallet fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of GENERATE_KEYSTORE_ERROR passing the error
 */
export function generateKeystoreError(error) {
  return {
    type: 'GENERATE_KEYSTORE_ERROR',
    error,
  };
}

/**
 * Creates addressMap for given addressList and tokenList
 * Example:
 * (['address1'],['eth','eos','ppt'])=>
 * addressMap: {
  address1: {
      index: 1
      eth: {balance: false},
      eos: {balance: false},
      ppt: {balance: false},
    }
  }
 * @param {string[]} addressesList example: ['0xddd...','0xa465...']
 * @param {string[]} tokenList ['eth','eos','ppt']
 * @return {object}  addressMap
 */
function createAddressMap(addressesList, tokenList) {
  const addressMap = {};
  for (let i = 0; i < addressesList.length; i += 1) {
    addressMap[addressesList[i]] = createTokenMap(tokenList, i + 1);
  }
  return addressMap;
}

/**
 * Transforms tokenList to tokenMap.
 * Example:
 * ['eth','eos','ppt'] ->
 * {
 * eos:{balance: false}
 * eth:{balance: false}
 * ppt:{balance: false}
 * }
 * Addds index prop if specified
 * @param {array} tokenList example: ['eth','eos','ppt']
 * @param {number} [index] address index
 * @return {object}    a tokenMap
 */
function createTokenMap(tokenList, index) {
  const reducer = (acc, token) => ({
    ...acc,
    ...{ [token]: { balance: false } },
  });

  if (index) {
    const tokenMap = tokenList.reduce(reducer, {});
    tokenMap.index = index;
    return tokenMap;
  }
  return tokenList.reduce(reducer, {});
}

/**
 * create addressList object which contains the info for each address: ballance per token and index
 * @param {string[]} tokenList example: ['eth','eos','ppt']
 * @param {keystore} keystore The new keystore
 *
 * @return {object}      An action object with a type of GENERATE_KEYSTORE_SUCCESS passing the repos
 */
export function generateKeystoreSuccess(keystore, tokenList) {
  const addresses = keystore.getAddresses();
  const addressMap = createAddressMap(addresses, tokenList);
  /* output:
  addressMap: {
    address1: {
        index: 1
        eth: {balance: false},
        eos: {balance: false},
        ppt: {balance: false},
      }
  } */
  return {
    type: 'GENERATE_KEYSTORE_SUCCESS',
    keystore,
    addressMap,
  };
}



/**
 * Saves Wallet to local storage
 *
 * @return {object} An action object with a type of SAVE_WALLET
 */
export function saveWallet() {
  return {
    type: 'SAVE_WALLET',
  };
}
