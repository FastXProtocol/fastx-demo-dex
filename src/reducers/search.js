const RESET_SEARCH_OPTION = 'RESET_SEARCH_OPTION';
const SEARCH_START = 'SEARCH_START';
const SEARCH_END = 'SEARCH_END';
const SEARCH_SELECTED = 'SEARCH_SELECTED';

const initialState = {
  isLoading: false,
  results: [],
  value: ''
};

export default function search(state = initialState, action = {}) {
  switch (action.type) {
    case RESET_SEARCH_OPTION:
      return {
        ...state,
        value: action.value,
        isLoading: action.isLoading,
        results: action.results
      };
    case SEARCH_START:
      return {
        ...state,
        value: action.value,
        isLoading: action.isLoading
      };
    case SEARCH_END:
      return {
        ...state,
        results: action.results,
        isLoading: action.isLoading
      };
    case SEARCH_SELECTED:
      return {
        ...state,
        value: action.value
      };
    default:
      return state;
  }
}