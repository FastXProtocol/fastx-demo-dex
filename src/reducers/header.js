const SET_ACTIVE_ITEM = 'SET_ACTIVE_ITEM';

const initialState = {
  activeItem: '',
};

export default function Header (state = initialState, action = {}) {
  switch (action.type) {
    case SET_ACTIVE_ITEM:
        return {
            ...state,
            activeItem: action.activeItem
        }
    default:
      return state;
  }
}
