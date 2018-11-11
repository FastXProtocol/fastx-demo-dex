const PICKTOKEN= 'PICKTOKEN'
const CLOSE_TOKEN_SELECTOR = 'CLOSE_TOKEN_SELECTOR'
const SET_SELECTED_SIDE = 'SET_SELECTED_SIDE'
const SWAP_TOKENS = 'SWAP_TOKENS'
const SET_BUY_AMOUNT = "SET_BUY_AMOUNT"
const SET_PAY_AMOUNT = "SET_PAY_AMOUNT"
const NEXT_STEP = "NEXT_STEP"
const RESET = "RESET"
const EXCHANGE_RATE_RECEIVED = "EXCHANGE_RATE_RECEIVED"
const TRANSACTION_RECEIVED = "TRANSACTION_RECEIVED"
const TRANSACTION_STATUS_CHANGE = "TRANSACTION_STATUS_CHANGE"

const initialState = {
    from: 'eth',
    to: 'fastx',
    amountPay: 0,
    amountBuyInput: 0,
    amountPayInput: 0,
    selectedSide: null,
    shouldDisplayTokenSelector: false,
    trade: {
        price: 0,
        priceUnit: 'eth'
    },
    step: 1,
    rate: null,
    transaction: [],
    isTrading: false
};

export default function exchange(state = initialState, action = {}) {
  switch (action.type) {
    case PICKTOKEN:
      return {
        ...state,
        shouldDisplayTokenSelector: true, 
        selectedSide: action.tokenType
      };
    case CLOSE_TOKEN_SELECTOR:
      return {
        ...state,
        shouldDisplayTokenSelector: false
      }
    case SET_SELECTED_SIDE:
      return {
        ...state,
        [action.side]: action.token,
        amountBuyInput: 0,
        amountPayInput: 0,
      }
    case SWAP_TOKENS:
      return {
          ...state,
          from: state.to, 
          to: state.from,
          amountBuyInput: 0,
          amountPayInput: 0,
      }
    case SET_BUY_AMOUNT:
       return {
           ...state,
           amountBuyInput: action.amount
       }
    case SET_PAY_AMOUNT:
       return {
           ...state,
           amountPayInput: action.amount
       }
    case NEXT_STEP:
       return {
          ...state,
          step: state.step+1
       }
    case RESET:
       return {
         ...initialState
       }
    case EXCHANGE_RATE_RECEIVED: 
       return{
        ...state,
        rate: action.rate
       }
    case TRANSACTION_RECEIVED: 
       return {
        ...state,
        transaction: action.transaction.slice(0)
       }
    case TRANSACTION_STATUS_CHANGE:
       return {
         ...state,
         isTrading: action.status
       }
    default:
      return state;
  }
}
