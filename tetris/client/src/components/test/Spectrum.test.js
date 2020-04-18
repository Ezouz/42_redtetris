import React from 'react'
import ReactDom from 'react-dom'
import { shallow } from 'enzyme';
import { stage } from './utils/common';

import Spectrum from '../Spectrum';

import toJson from "enzyme-to-json";
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
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

describe('<Spectrum/> Component', () => {
  it('rendering correctly with no shapes', () => {
    const div = document.createElement('div');
    const stg = stage;
    const players = [
      {
        name: 'name',
        id: 42,
        round: 1,
        loser: false,
        color: '220, 220, 220',
        freeze: 0,
        level: 0,
        rows: 0,
        score: 0,
        smashed: 0,
        spectre: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
      }
    ];
    ReactDom.render(
      <Provider store={store}>
        <Spectrum players={players} stage={stg} />
      </Provider>, div)
    ReactDom.unmountComponentAtNode(div)

  });
});
