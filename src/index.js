import '@babel/polyfill';
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import AppReducers from './app/reducers';
import App from './App';

const store = createStore(
    AppReducers(),
    compose(
        applyMiddleware(thunk),
    ),
);

render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'),
);
