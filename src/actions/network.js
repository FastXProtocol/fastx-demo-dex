/**
 * Connect to eth network using address from network.js file
 *
 * @return {object}    An action object with a type of LOAD_NETWORK
 */
export function loadNetwork(networkName) {
  return {
    type: "LOAD_NETWORK",
    networkName
  };
}

/**
 * Dispatched when connected to network successfuly by the loadNetwork saga
 *
 * @param  {string} blockNumber The current block number
 *
 * @return {object}      An action object with a type of LOAD_NETWORK_SUCCESS passing the repos
 */
export function loadNetworkSuccess(blockNumber) {
  // message.success(`Connected sucessfully, current block: ${blockNumber}`);
  return {
    type: "LOAD_NETWORK_SUCCESS",
    blockNumber,
  };
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
  //   message.error(err, 10);
  // }
  return {
    type: "LOAD_NETWORK_ERROR",
    error,
  };
}
