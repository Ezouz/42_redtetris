import React from 'react';
import ReactDom from 'react-dom';
import App from './containers/app';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { ioSocketMiddleWare } from './middleware/ioSocketMiddleWare';

import socketReducer from "./reducers/socket";
import tetriminosReducer from "./reducers/tetriminos";

const initialState = {};
const rootReducer = combineReducers({
    sock: socketReducer,
    tetriminos: tetriminosReducer
});
const middleware = [
    ioSocketMiddleWare,
    thunk,
    createLogger()
];

export const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware))

test('renders learn react link', () => {
    const div = document.createElement('div')
    ReactDom.render(
      <Provider store={store}>
        <App/>
      </Provider>, div)
    ReactDom.unmountComponentAtNode(div)
});
