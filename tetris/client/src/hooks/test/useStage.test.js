import React from 'react'
import { useStage } from '../useStage'
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

describe('Testing <useStage/> hook', () => {
    const player = {
        collided: false, pos: { x: 2, y: 2 }, tetrimino: [
            [0, "J", 0],
            [0, "J", 0],
            ["J", "J", 0]]
    };
    const { result, waitForNextUpdate } = renderHook(() => useStage(player, null, false), {
        wrapper: ({ children }) => <Provider store={store} >{children}</Provider>
    });

    it('should not error', () => {
        expect(result.current[2]).toStrictEqual(0)
    });

    it('should get spectre high', async () => {
        act(() => {
            result.current[4]()
        })
        await waitForNextUpdate
        expect(result.current[3]).toStrictEqual([20, 20, 4, 2, 20, 20, 20, 20, 20, 20])
    });
});