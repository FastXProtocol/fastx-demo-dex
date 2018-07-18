import { flashMsgOpen } from '../actions/modal'
import store from '../index'

// const message = (text) => {
//     store.dispatch(text);
// }

/**
 * Connect to eth network using address from network.js file
 *
 * @return {object}    An action object with a type of LOAD_NETWORK
 */
export function loadNetwork(networkName) {
  return {
    type: "LOAD_NETWORK",
    networkName
  }
}

/**
 * Dispatched when connected to network successfuly by the loadNetwork saga
 *
 * @param  {string} blockNumber The current block number
 *
 * @return {object}      An action object with a type of LOAD_NETWORK_SUCCESS passing the repos
 */
export function loadNetworkSuccess(blockNumber) {
  return {
    type: "LOAD_NETWORK_SUCCESS",
    blockNumber
  }
}

/**
 * Dispatched when network connection fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of LOAD_NETWORK_ERROR passing the error
 */
export function loadNetworkError(error) {
  // if (error !== 'Offline') {
  //   const err = error.indexOf('Invalid JSON RPC response from host provider') >= 0 ?
  //     `${error}, Check Internet connection and connectivity to RPC` : error;
  //   message(err)
  // }
  return {
    type: "LOAD_NETWORK_ERROR",
    error
  }
}

/* *********************************** Check Balances Actions ******************* */
/**
 * Initiate process to check balance of all known addresses
 *
 * @return {object}    An action object with a type of CHECK_BALANCES
 */
export function checkBalances() {
  return {
    type: 'CHECK_BALANCES',
  };
}

/**
 * checkBalances successful
 *
 * @return {object}      An action object with a type of CHECK_BALANCES_SUCCESS
 */
export function checkBalancesSuccess() {
  const timeString = new Date().toLocaleTimeString();
  // message.success('Balances updated succesfully');
  return {
    type: 'CHECK_BALANCES_SUCCESS',
    timeString,
  };
}

/**
 * checkBalances failed
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of CHECK_BALANCES_ERROR passing the error
 */
export function checkBalancesError(error) {
  alert(error)
  return {
    type: 'CHECK_BALANCES_ERROR',
    error,
  };
}
