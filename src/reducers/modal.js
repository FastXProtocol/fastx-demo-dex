const OPEN = 'OPEN';
const CLOSE = 'CLOSE';

const initialState = {
  open: false,
  desc: ''
};

export default function assets(state = initialState, action = {}) {
  switch (action.type) {
    case OPEN:
      return {
        ...state,
        open: action.open,
        desc: action.desc
      };
    case CLOSE:
      return {
        ...state,
        open: action.open
      };
    default:
      return state;
  }
}