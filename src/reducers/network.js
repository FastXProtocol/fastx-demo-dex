import {network} from '../config';

const LOAD_NETWORK = 'LOAD_NETWORK';
const LOAD_NETWORK_SUCCESS = 'LOAD_NETWORK_SUCCESS';
const LOAD_NETWORK_ERROR = 'LOAD_NETWORK_ERROR';

const initialState = {
  availableNetworks: Object.keys(network),
  networkName: 'Offline',
  networkReady: false,
  blockNumber: 0,
  loading: false,
  error: false
};

export default function Network (state = initialState, action = {}) {
  switch (action.type) {
      case LOAD_NETWORK:
          return {
              ...state,
              networkName: action.networkName,
              loading: true,
              error: false
          }
      case LOAD_NETWORK_SUCCESS:
          return {
              ...state,
              blockNumber: action.blockNumber,
              loading: false,
              error: false,
              networkReady: true
          }
      case LOAD_NETWORK_ERROR:
          return {
              ...state,
              loading: false,
              error: action.error,
              networkReady: false
          }
      default:
          return state;
  }
}
