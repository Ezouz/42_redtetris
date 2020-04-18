import React from 'react';
import ReactDom from 'react-dom';

import Header from '../Header';

import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { ioSocketMiddleWare } from '../../middleware/ioSocketMiddleWare';

import socketReducer from "../../reducers/socket";
import tetriminosReducer from "../../reducers/tetriminos";

import io from 'socket.io-client';

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


describe('<Header/> Component', () => {
  it('rendering correctly with no shapes', () => {
    const div = document.createElement('div')
    ReactDom.render(
      <Provider store={store}>
        <Header
          commands={""}
          isLeader={true}
          room={42}
          socket={io('http://0.0.0.0:3504')} />
      </Provider>, div)
    ReactDom.unmountComponentAtNode(div)
  });
});