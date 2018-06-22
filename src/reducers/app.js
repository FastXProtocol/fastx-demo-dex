const SET_FASTX = 'SET_FASTX';

const initialState = {
  fastx: null
};

export default function assets(state = initialState, action = {}) {
  switch (action.type) {
    case SET_FASTX:
      return {
        ...state,
        fastx: action.fastx
      };
    default:
      return state;
  }
}