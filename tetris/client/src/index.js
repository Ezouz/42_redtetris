import React from 'react';
import ReactDOM from 'react-dom';
// import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { ioSocketMiddleWare } from './middleware/ioSocketMiddleWare';

import socketReducer from "./reducers/socket";
import tetriminosReducer from "./reducers/tetriminos";

import App from './containers/app';

const initialState = {};
const rootReducer = combineReducers({
    sock: socketReducer,
    tetriminos: tetriminosReducer
});
const middleware = [
    ioSocketMiddleWare,
    thunk,
    // createLogger()
];

export const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware))

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('root'))
