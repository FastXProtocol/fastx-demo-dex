const GET_BALANCE = 'GET_BALANCE';
const BALANCE_RECEIVED = 'BALANCE_RECEIVED';
const GET_ACCOUNT = 'GET_ACCOUNT';
const ACCOUNT_RECEIVED = 'ACCOUNT_RECEIVED';
const SELL_ASSET = 'SELL_ASSET';
const SET_SELL_END = 'SET_SELL_END';
const SET_SELL_CATEGROY = 'SET_SELL_CATEGROY';
const SET_SELL_ID = 'SET_SELL_ID';
const SET_SELL_PRICE = 'SET_SELL_PRICE';
const SET_DEPOSIT_PRICE = 'SET_DEPOSIT_PRICE';

const initialState = {
  balance: 0,
  ownerAddress: '',
  end: '',
  categroy: '',
  sellId: '',
  sellPrice: 0,
  depositPrice: 0
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
    case GET_ACCOUNT:
      return {
        ...state
      };
    case ACCOUNT_RECEIVED:
      return {
        ...state,
        ownerAddress: action.ownerAddress
      };
    case SET_SELL_END:
      return {
        ...state,
        end: action.end
      };
    case SET_SELL_CATEGROY:
      return {
        ...state,
        categroy: action.categroy
      };
    case SET_SELL_ID:
      return {
        ...state,
        sellId: action.sellId
      };
    case SET_SELL_ID:
      return {
        ...state,
        sellId: action.sellId
      };
    case SET_SELL_PRICE:
      return {
        ...state,
        sellPrice: action.sellPrice
      };
    case SET_DEPOSIT_PRICE:
      return {
        ...state,
        depositPrice: action.depositPrice
      }
    default:
      return state;
  }
}