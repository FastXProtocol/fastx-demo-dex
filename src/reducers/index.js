import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    router: routerReducer,
    // search: require('./search').default,
    assets: require('./assets').default,
    reviewAssets: require('./reviewAssets').default,
    account: require('./account').default,
    modal: require('./modal').default,
    app: require('./app').default,
    transaction: require('./transaction').default,
    error: require('./error').default,
    network: require('./network').default,
    header: require('./header').default
});
