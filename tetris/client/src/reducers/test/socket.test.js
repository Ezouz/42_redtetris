import socket from '../socket'

const state = {room: 42}

describe('Socket reducer', () => {
    it('should return the initial state', () => {
      expect(socket(undefined, {})).toEqual({})
    });

    it('should empty winner', () => {
        expect(socket(state, {type: 'END'})).toEqual({
            room: 42,
            winner: {}
        })
    });

    it('should update players', () => {
        expect(socket(state, {type: 'UPDATE_PLAYERS', players: [{name: "Doe"}, {name: "Dae"}]})).toEqual({
            room: 42,
            players: [{name: "Doe"}, {name: "Dae"}]
        })
    });

    it('should update current player', () => {
        expect(socket(state, {type: 'CURRENT_PLAYER', currentPlayer: {name: "Doe"}})).toEqual({
            room: 42,
            currentPlayer: {name: "Doe"}
        })
    });

    it('should set winner', () => {
        expect(socket(state, {type: 'WINNER', player: {name: "Doe"}})).toEqual({
            room: 42,
            winner: {name: "Doe"}
        })
    });

    it('should reset', () => {
        expect(socket(state, {type: 'RESET'})).toEqual({
            room: 42,
            winner: undefined
        })
    });

    it('should add round', () => {
        expect(socket(state, {type: 'ADD_ROUND', currentPlayer: {name: "Doe"}})).toEqual({
            room: 42,
            currentPlayer: {name: "Doe"}
        })
    });

    it('should toggle running', () => {
        expect(socket(state, {type: 'TOGGLE_RUNNING', isRunning: true})).toEqual({
            room: 42,
            isRunning: true
        })
    });
});
