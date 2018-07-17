import {network} from '../config'

const LOAD_NETWORK = 'LOAD_NETWORK'
const LOAD_NETWORK_SUCCESS = 'LOAD_NETWORK_SUCCESS'
const LOAD_NETWORK_ERROR = 'LOAD_NETWORK_ERROR'
const CHECK_BALANCES = 'CHECK_BALANCES'
const CHECK_BALANCES_SUCCESS = 'CHECK_BALANCES_SUCCESS'
const CHECK_BALANCES_ERROR = 'CHECK_BALANCES_ERROR'

const initialState = {
    availableNetworks: Object.keys(network),
    networkName: 'Offline',
    networkReady: false,
    blockNumber: 0,
    loading: false,
    error: false,
    checkingBalanceDoneTime: false, // should update after every succesfull balance check
    checkingBalances: false, // Loading
    checkingBalancesError: false,
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
      case CHECK_BALANCES:
          return {
              ...state,
              checkingBalances: true,
              checkingBalancesError: false,
              checkingBalanceDoneTime: false
          }
      case CHECK_BALANCES_SUCCESS:
          return {
              ...state,
              checkingBalances: false,
              checkingBalancesError: false,
              checkingBalanceDoneTime: action.timeString
          }
      case CHECK_BALANCES_ERROR:
          return {
              ...state,
              checkingBalances: false,
              checkingBalancesError: action.error,
              checkingBalanceDoneTime: false
          }

      default:
          return state;
  }
}
