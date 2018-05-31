import {createStore, compose, applyMiddleware} from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

export const history = createHistory();

function configureStoreDev(initialState) {
    const reactRouterMiddleware = routerMiddleware(history);
    const middlewares = [
      // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
    //   reduxImmutableStateInvariant(),
      reactRouterMiddleware
    //   sagaMiddleware,
    ];
  
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
    const store = createStore(rootReducer, initialState, composeEnhancers(
      applyMiddleware(...middlewares)
      )
    );
  
    // let sagaTask = sagaMiddleware.run(saga);
    
    return store;
  }

const configureStore = configureStoreDev;

export default configureStore;