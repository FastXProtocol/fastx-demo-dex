const BID_AD_ERROR = 'BID_AD_ERROR';

const initialState = {
  error: ''
};

export default function error (state = initialState, action = {}) {
  switch (action.type) {
    case BID_AD_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}