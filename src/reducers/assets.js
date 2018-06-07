const GET_ASSETS = 'GET_ASSETS';
const SET_ASSETS_FILTER = 'SET_ASSETS_FILTER';
const ASSETS_RECEIVED = 'ASSETS_RECEIVED';
const ASSETS_SEARCH = 'ASSETS_SEARCH';

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
    case ASSETS_SEARCH:
      return {
        ...state,
        search: action.search
      };
    default:
      return state;
  }
}