import reducer from '../tetriminos'

describe('Tetriminos reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(
          { tetriminos: [{ shape: [[0]], color: "220, 220, 220" }] })
    });

    it('should refill', () => {
        expect(reducer(undefined, {type: "REFILL", tetriminos: [
            ["O", "O"],
            ["O", "O"]
        ]})).toEqual(
            { tetriminos: [ [ 'O', 'O' ], [ 'O', 'O' ] ] })
    });
});