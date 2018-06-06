const GET_ASSETS = 'GET_ASSETS';
const SET_ASSETS_FILTER = 'SET_ASSETS_FILTER';
const SEARCH_ASSETS_TITLE = 'SEARCH_ASSETS_TITLE';
const ASSETS_RECEIVED = 'ASSETS_RECEIVED';

const initialState = {
  isLoading: false,
  results: [],
  filter: '',
  search: ''
};

export default function assets(state = initialState, action = {}) {
  switch (action.type) {
    case GET_ASSETS:
      return {
        ...state
      };
    case ASSETS_RECEIVED:
      return {
        ...state,
        results: action.results
      };
    case SET_ASSETS_FILTER:
      return {
        ...state,
        filter: action.filter
      };
    case SEARCH_ASSETS_TITLE:
      return {
        ...state,
        search: action.search
      };
    default:
      return state;
  }
}