import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import AppReducers from './app/reducers';
import App from './App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    AppReducers(),
    composeEnhancers(
        applyMiddleware(thunk),
    ),
);

render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root')
);
