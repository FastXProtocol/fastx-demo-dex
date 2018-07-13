const OPEN = 'OPEN';
const CLOSE = 'CLOSE';
const FLASH_MSG_OPEN = 'FLASH_MSG_OPEN';
const FLASH_MSG_CLOSE = 'FLASH_MSG_CLOSE';

const initialState = {
  open: false,
  desc: '',
  isOpen: false,
  msgDesc: '',
  msgType: 'warning',
};

export default function modal(state = initialState, action = {}) {
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
    case FLASH_MSG_OPEN:
        return {
          ...state,
          isOpen: action.isOpen,
          msgDesc: action.msgDesc,
        };
    case FLASH_MSG_CLOSE:
        return {
          ...state,
          isOpen: action.isOpen
        };
    default:
      return state;
  }
}
