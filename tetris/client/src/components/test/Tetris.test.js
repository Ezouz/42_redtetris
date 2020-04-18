import React from 'react';
import { shallow, mount } from 'enzyme';
import Tetris from '../Tetris';
import { createLogger } from 'redux-logger';
import sinon from "sinon";
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

describe('<Tetris/> Component', () => {
  const socket = io('http://0.0.0.0:3504');

  it('renders without crashing', () => {
    let wrapper = shallow(
      <Provider store={store}>
        <Tetris socket={socket} room={42} playerCount={0} />
      </Provider>
    )
    expect(wrapper.html()).toMatchSnapshot()
  });

  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation((init) => [init, setState]);
  const onKeyDown = sinon.spy();

  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <Tetris socket={socket} room={42} playerCount={0} onKeyDown={onKeyDown} />
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should have 236 divs', () => {
    const container = mount(
      <Provider store={store}>
        <Tetris socket={socket} room={42} playerCount={2} />
      </Provider>
    );
    expect(container.find('div').length).toEqual(236);
  });

  describe('Keydown', () => {
    it('It should simulate ArrowDown events', () => {
      const input = wrapper.find('Tetris');
      input.simulate('keyDown', {
        keyCode: 40,
        which: 40,
        key: "ArrowDown"
      });
      expect(onKeyDown.called).toBe(true);
    });
    it('It should simulate ArrowLeft events', () => {
      const input = wrapper.find('Tetris');
      input.simulate('keyDown', {
        keyCode: 37,
        which: 37,
        key: "ArrowLeft"
      });
      expect(onKeyDown.called).toBe(true);
    });
    it('It should simulate ArrowRight events', () => {
      const input = wrapper.find('Tetris');
      input.simulate('keyDown', {
        keyCode: 39,
        which: 39,
        key: "ArrowRight"
      });
      expect(onKeyDown.called).toBe(true);
    });
    it('It should simulate ArrowUp events', () => {
      const input = wrapper.find('Tetris');
      input.simulate('keyDown', {
        keyCode: 38,
        which: 38,
        key: "ArrowUp"
      });
      expect(onKeyDown.called).toBe(true);
    });
  });
  describe('Keydown', () => {
    it('It should simulate onKeyUp events', () => {
      const onKeyUp = sinon.spy();
      const wrapper = shallow(
        <Provider store={store}>
          <Tetris socket={socket} room={42} playerCount={1} onKeyUp={onKeyUp} />
        </Provider>
      );
      const input = wrapper.find('Tetris');
      input.simulate('keyUp', {
        keyCode: 38,
        which: 38,
        key: "ArrowUp"
      });
      expect(onKeyUp.called).toBe(true);
    });
  });

})
