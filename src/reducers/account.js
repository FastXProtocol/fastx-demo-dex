import moment from 'moment';

const GET_BALANCE = 'GET_BALANCE';
const BALANCE_RECEIVED = 'BALANCE_RECEIVED';
const GET_ACCOUNT = 'GET_ACCOUNT';
const ACCOUNT_RECEIVED = 'ACCOUNT_RECEIVED';
const SET_SELL_END = 'SET_SELL_END';
const SET_SELL_category = 'SET_SELL_category';
const SET_SELL_ID = 'SET_SELL_ID';
const SET_SELL_PRICE = 'SET_SELL_PRICE';
const SET_DEPOSIT_PRICE = 'SET_DEPOSIT_PRICE';
const SET_DEPOSIT_UNIT = 'SET_DEPOSIT_UNIT';
const SET_WITHDRAWAL_PRICE = 'SET_WITHDRAWAL_PRICE';
const SET_WITHDRAWAL_UNIT = 'SET_WITHDRAWAL_UNIT';
const USER_ITEMS_RECEIVED = 'USER_ITEMS_RECEIVED';
const DEPOSIT_STATUS = 'DEPOSIT_STATUS';
const SWITCH_UNIT = 'SWITCH_UNIT';

const initialState = {
  balance: {
    eth: 0
  },
  fastxBalance: {
    eth: 0
  },
  ethBalance: {
    eth: 0
  },
  ownerAddress: '',
  end: moment().add(1,'days').format("YYYY-MM-DD"),
  category: '',
  sellId: '',
  sellPrice: 0,
  depositPrice: 0,
  depositUnit: 'ETH',
  withdrawalPrice: 0,
  withdrawalUnit: 'ETH',
  items: [],
  waiting: false,
  currency: 'FastX',
};

export default function account(state = initialState, action = {}) {
  switch (action.type) {
    case GET_BALANCE:
      return {
        ...state
      };
    case BALANCE_RECEIVED:
      return {
        ...state,
        balance: action.balance,
        fastxBalance: action.fastxBalance?action.fastxBalance:state.fastxBalance,
        ethBalance: action.ethBalance?action.ethBalance:state.ethBalance
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
    case SET_SELL_category:
      return {
        ...state,
        category: action.category
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
    case SET_DEPOSIT_UNIT:
      return {
        ...state,
        depositUnit: action.depositUnit
      }
      
    case SET_WITHDRAWAL_PRICE:
        return {
          ...state,
          withdrawalPrice: action.withdrawalPrice
        }

    case SET_WITHDRAWAL_UNIT:
        return {
          ...state,
          withdrawalUnit: action.withdrawalUnit
        }
    case USER_ITEMS_RECEIVED:
      return {
        ...state,
        items: action.items
      }
    case DEPOSIT_STATUS:
      return {
        ...state,
        waiting: action.waiting
      }
    case SWITCH_UNIT:
      return {
        ...state,
        currency: action.currency
      }
    default:
      return state;
  }
}
