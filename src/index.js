import React from 'react';
import { render } from 'react-dom';
import configureStore, { history } from './store/configureStore'
import 'semantic-ui-css/semantic.min.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

const store = configureStore();

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
