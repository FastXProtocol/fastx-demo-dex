import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    router: routerReducer,
    // search: require('./search').default,
    assets: require('./assets').default,
    account: require('./account').default
});