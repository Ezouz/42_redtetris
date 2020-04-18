import { ioSocketMiddleWare } from '../ioSocketMiddleWare'

describe('Testing ioSocketMiddleware', () => {
    const next = jest.fn();
    const store = jest.fn();
    store.dispatch = jest.fn();
    const emit = jest.fn();

    afterEach(() => {    
        jest.clearAllMocks();
      });

    it('should START', () => {
        const emit = jest.fn()
        const action = { type: 'START', room: '42', socket: {
            emit: emit } }
        ioSocketMiddleWare(store)(next)(action);
        expect(emit.mock.calls).toEqual([["start", "42"]]);
    });

    it('should END', () => {
        const action = { type: 'END', room: '42', socket: {
            emit: emit } }
        ioSocketMiddleWare(store)(next)(action);
        expect(emit.mock.calls).toEqual([["end", "42"]]);
    });

    it('should COLLISION', () => {
        const action = { type: 'COLLISION', room: '42', socket: {
            emit: emit }, player: {name: "Doe"} }
        ioSocketMiddleWare(store)(next)(action);
        expect(emit.mock.calls).toEqual([["collision", {name: "Doe"}, "42"]]);
    });

    it('should GAME_OVER', () => {
        const action = { type: 'GAME_OVER', room: '42', socket: {
            emit: emit }, player: {name: "Doe"} }
        ioSocketMiddleWare(store)(next)(action);
        expect(emit.mock.calls).toEqual([["game_over", {name: "Doe"}, "42"]]);
    });

    it('should SMASH', () => {
        const action = { type: 'SMASH', room: '42', socket: {
            emit: emit }, player: {name: "Doe"} }
        ioSocketMiddleWare(store)(next)(action);
        expect(emit.mock.calls).toEqual([["smash", {name: "Doe"}, "42"]]);
    });

    it('should WINNER', () => {
        const action = { type: 'WINNER', room: '42', socket: {
            emit: emit }}
        ioSocketMiddleWare(store)(next)(action);
        expect(emit.mock.calls).toEqual([["end", "42"]]);
    });

    it('should RESET', () => {
        const action = { type: 'RESET', room: '42', socket: {
            emit: emit }}
        ioSocketMiddleWare(store)(next)(action);
        expect(emit.mock.calls).toEqual([["reset", "42"]]);
    });

    it('should SET_SCORE', () => {
        const action = { type: 'SET_SCORE', room: '42', socket: {
            emit: emit }, player: {name: "Doe"} }
        ioSocketMiddleWare(store)(next)(action);
        expect(emit.mock.calls).toEqual([["set_score", {name: "Doe"}, "42"]]);
    });

    it('should UPDATE_PLAYERS', () => {
        const action = { type: 'UPDATE_PLAYERS'}
        ioSocketMiddleWare(store)(next)(action);
    });

    it('should REFILL', () => {
        const action = { type: 'REFILL'}
        ioSocketMiddleWare(store)(next)(action);
    });

    it('should CURRENT_PLAYER', () => {
        const action = { type: 'CURRENT_PLAYER'}
        ioSocketMiddleWare(store)(next)(action);
    });

    it('should ADD_ROUND', () => {
        const action = { type: 'ADD_ROUND'}
        ioSocketMiddleWare(store)(next)(action);
    });

    it('should TOGGLE_RUNNING', () => {
        const action = { type: 'TOGGLE_RUNNING'}
        ioSocketMiddleWare(store)(next)(action);
    });

    it('should return', () => {
        const action = { type: 'BLA'}
        ioSocketMiddleWare(store)(next)(action);
    });
});