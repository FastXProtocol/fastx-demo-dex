const GET_ASSETS = 'GET_ASSETS';
const SET_ASSETS_FILTER = 'SET_ASSETS_FILTER';
const ASSETS_RECEIVED = 'ASSETS_RECEIVED';
const ASSETS_SEARCH = 'ASSETS_SEARCH';
const ASSET_DETAIL_RECEIVED = 'ASSET_DETAIL_RECEIVED';
const ALLPS_RECEIVED = 'ALLPS_RECEIVED';
const SET_ASSETS_LOADING = 'SET_ASSETS_LOADING';
const SET_PUBLISH_STATUS = 'SET_PUBLISH_STATUS';
const ASSETS_STATUS = 'ASSETS_STATUS';
const ASSET_CATEGORIES_REQUEST_FAILED = 'ASSET_CATEGORIES_REQUEST_FAILED';
const SET_ASSETS_IS_OWNER = 'SET_ASSETS_IS_OWNER';
const BALNCE_ENOUGH = 'BALNCE_ENOUGH';

const initialState = {
  isLoading: false,
  results: [],
  filter: '',
  search: '',
  asset: {},
  allPs: [],
  amount: 0,
  status: '',
  hasPublished: false,
  isOwner: false,
  blanceEnough: true
};

export default function assets(state = initialState, action = {}) {
  switch (action.type) {
    case GET_ASSETS:
      return {
        ...state
      };
    case SET_ASSETS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case ASSETS_RECEIVED:
      return {
        ...state,
        results: action.results
      };
    case ASSET_DETAIL_RECEIVED:
      return {
        ...state,
        asset: action.asset
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
    case ALLPS_RECEIVED:
      return {
        ...state,
        allPs: action.allPs
      };
    case ASSET_CATEGORIES_REQUEST_FAILED:
        return {
            ...state,
            error: action.error
        };
    case SET_PUBLISH_STATUS:
        return {
            ...state,
            hasPublished: action.hasPublished
        };
    case ASSETS_STATUS:
        return {
            ...state,
            status: action.status
        };
    case SET_ASSETS_IS_OWNER:
        return {
            ...state,
            isOwner: action.isOwner
        };
    case BALNCE_ENOUGH:
        return {
            ...state,
            blanceEnough: action.blanceEnough
        };
    default:
      return state;
  }
}