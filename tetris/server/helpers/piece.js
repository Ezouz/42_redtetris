class Piece {
    constructor() {
        this.TETRIMINOS = {
            0: { shape: [[0]], color: "0, 0, 0" },
            I: {
                shape: [
                    [0, "I", 0, 0],
                    [0, "I", 0, 0],
                    [0, "I", 0, 0],
                    [0, "I", 0, 0]
                ],
                color: "0, 255, 255"
            },
            J: {
                shape: [
                    [0, "J", 0],
                    [0, "J", 0],
                    ["J", "J", 0]
                ],
                color: "225, 0, 0"
            },
            L: {
                shape: [
                    [0, "L", 0],
                    [0, "L", 0],
                    [0, "L", "L"]
                ],
                color: "0, 0, 255"
            },
            O: {
                shape: [
                    ["O", "O"],
                    ["O", "O"]
                ],
                color: "255, 255, 0"
            },
            S: {
                shape: [
                    [0, "S", "S"],
                    ["S", "S", 0],
                    [0, 0, 0]
                ],
                color: "50, 205, 50"
            },
            T: {
                shape: [
                    ["T", "T", "T"],
                    [0, "T", 0],
                    [0, 0, 0],
                ],
                color: "128, 0, 128"
            },
            Z: {
                shape: [
                    ["Z", "Z", 0],
                    [0, "Z", "Z"],
                    [0, 0, 0]
                ],
                color: "255, 165, 0"
            }
        };
    }

    randomTetrimino() {
        const tetriminos = "IJLOSTZ";
        const randTetrimino =
            tetriminos[Math.floor(Math.random() * tetriminos.length)];
        return this.TETRIMINOS[randTetrimino];
    }
}

module.exports = Piece;
