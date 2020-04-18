import React from 'react'
import { usePlayer } from '../usePlayer'
import { renderHook, act } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

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

describe('Testing <usePlayer/> hook', () => {
    const { result, waitForNextUpdate } = renderHook(() => usePlayer(), {
        wrapper: ({ children }) => <Provider store={store} >{children}</Provider>
    });

    it('should not error', () => {
        expect(result.current[0]).toStrictEqual({ "collided": false, "pos": { "x": 0, "y": 0 }, "tetrimino": [[0]] })
    });

    it('new position player', async () => {
        act(() => {
            result.current[1]({ x: 1, y: 1, collided: true })
        })
        await waitForNextUpdate
        expect(result.current[0]).toStrictEqual({ "collided": true, "pos": { "x": 1, "y": 1 }, "tetrimino": [[0]] })
    });

    it('new reset player', async () => {
        act(() => {
            result.current[2]({ round: 0 }, [{ shape: [0] }])
        })
        await waitForNextUpdate
        expect(result.current[0]).toStrictEqual({ "collided": false, "pos": { "x": 3, "y": 0 }, "tetrimino": [0] })
    })

    it('new player rotate', async () => {
        act(() => {
            result.current[3]([0])
        })
        await waitForNextUpdate
        expect(result.current[0]).toStrictEqual({ "collided": false, "pos": { "x": 3, "y": 0 }, "tetrimino": [0] })
    })
});