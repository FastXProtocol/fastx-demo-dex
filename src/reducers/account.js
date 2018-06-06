const GET_BALANCE = 'GET_BALANCE';
const BALANCE_RECEIVED = 'BALANCE_RECEIVED';
const GET_COINBASE = 'GET_COINBASE';
const COINBASE_RECEIVED = 'COINBASE_RECEIVED';

const initialState = {
  balance: 0,
  ownerAddress: ''
};

export default function assets(state = initialState, action = {}) {
  switch (action.type) {
    case GET_BALANCE:
      return {
        ...state
      };
    case BALANCE_RECEIVED:
      return {
        ...state,
        balance: action.balance
      };
    case GET_COINBASE:
      return {
        ...state
      };
    case COINBASE_RECEIVED:
      return {
        ...state,
        ownerAddress: action.ownerAddress
      };
    default:
      return state;
  }
}