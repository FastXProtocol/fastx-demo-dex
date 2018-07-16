
const SAVE_KS = 'SAVE_KS'

const initialState = {
    ks: false
};

export default function wallet (state = initialState, action = {}) {
  switch (action.type) {
    case SAVE_KS:
        return {
            ...state,
            ks : action.ks
        }
    default:
      return state;
  }
}
