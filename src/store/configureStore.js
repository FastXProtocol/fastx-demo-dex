import {createStore, compose, applyMiddleware} from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import persistState from 'redux-localstorage'
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas';
import * as appActions from '../actions/app';
import { chainOptions } from '../config';

export const history = createHistory();

function configureStoreDev(initialState) {
    const reactRouterMiddleware = routerMiddleware(history);
    const sagaMiddleware = createSagaMiddleware()
    const middlewares = [
      // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
    //   reduxImmutableStateInvariant(),
      reactRouterMiddleware,
      sagaMiddleware
    ];

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

    const store = createStore(rootReducer, initialState, composeEnhancers(
        applyMiddleware(...middlewares),
        persistState(['reviewAssets', 'localStorage'])//将store中reviewAssets的变化同步更新到localstorge
      )
    );

    try{
      store.dispatch(appActions.setFastx(new window.plasmaClient.client(chainOptions)))
    }catch(err){
      console.log("setFastx:",err)
    }

    sagaMiddleware.run(rootSaga, store);

    return store;
  }

const configureStore = configureStoreDev;

export default configureStore;
