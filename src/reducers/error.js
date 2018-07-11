const TRANSACTION_ERROR = 'TRANSACTION_ERROR';

const initialState = {
  transactionErr: ''
};

export default function error (state = initialState, action = {}) {
  switch (action.type) {
    case TRANSACTION_ERROR:
      return {
        ...state,
        transactionErr: action.transactionErr
      };
    default:
      return state;
  }
}
