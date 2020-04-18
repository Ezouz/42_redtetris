import React from 'react';
import ReactDom from 'react-dom';
import { Router } from 'react-router-dom';
import Playground from '../Playground';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { ioSocketMiddleWare } from '../../middleware/ioSocketMiddleWare';

import socketReducer from "../../reducers/socket";
import tetriminosReducer from "../../reducers/tetriminos";

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

describe('<Playground/> Component', () => {
  it('rendering and redirect cause no params', () => {
    const setIsAlert = jest.fn();
    const setIsRunning = jest.fn();
    const setAlertMessage = jest.fn();
    const playground = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/room/#0[op]']}>
          <Playground setIsAlert={setIsAlert} setIsRunning={setIsRunning} setAlertMessage={setAlertMessage} />
        </MemoryRouter>
      </Provider>
    )
    expect(playground.find('Redirect').length).toEqual(1);
  });
  it('rendering with no crash', () => {
    const setIsAlert = jest.fn();
    const setIsRunning = jest.fn();
    const setAlertMessage = jest.fn();
    const playground = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/room/#0[op]']}>
          <Playground setIsAlert={setIsAlert} setIsRunning={setIsRunning} setAlertMessage={setAlertMessage} />
        </MemoryRouter>
      </Provider>
    )
    expect(playground.find('Playground').length).toEqual(1);
  });
})