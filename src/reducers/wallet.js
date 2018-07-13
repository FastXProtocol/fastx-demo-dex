const GENERATE_KEYSTORE_SUCCESS = 'GENERATE_KEYSTORE_SUCCESS';

const initialState = {
  keystore: false
};

export default function wallet (state = initialState, action = {}) {
  switch (action.type) {
    case GENERATE_KEYSTORE_SUCCESS:
      return {
        ...state,
        keystore: action.keystore
      };
    default:
      return state;
  }
}
