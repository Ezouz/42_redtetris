import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';
import { useSelector } from 'react-redux'

export const useStage = (player, resetPlayer, gameOver) => {
  const [stage, setStage] = useState(createStage());
  const [spectre, setSpectre] = useState(stage);
  const [rowsCleared, setRowsCleared] = useState(0);
  const [sendSmash, setSendSmash] = useState(0);

  const currentPlayer = useSelector(state => state.sock.currentPlayer);
  const tetriminos = useSelector(state => state.tetriminos.tetriminos);

  const getSpectreHigh = () => {
    let tmp = [];
    stage.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell[0] !== 0) {
          if (tmp[x] === undefined) {
            tmp[x] = y;
          }
        }
        if (y === 19) {
          if (cell[0] === 0 && tmp[x] === undefined) {
            tmp[x] = 20;
          }
        }
      })
    })
    setSpectre(tmp);
  };

  useEffect(() => {
    getSpectreHigh();
  }, [stage]);

  useEffect(() => {
    setRowsCleared(0);

    const sweepRows = newStage =>
      newStage.reduce((ack, row) => {
        if (row.findIndex(cell => cell[0] === 0) === -1 && row.findIndex(cell => cell[0] === 1) === -1) {
          if (!gameOver) {
            setRowsCleared(prev => prev + 1);
            ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
            setSendSmash(prev => prev += 1);
          }
          return ack;
        }
        ack.push(row);
        return ack;
      }, []);

    const updateStage = prevStage => {
      // First flush the stage
      const newStage = prevStage.map(row =>
        row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
      );

      // Then draw the tetrimino
      player.tetrimino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? 'merged' : 'clear'}`,
            ];
          }
        });
      });

      // Then check if we got some score if collided
      if (player.collided) {
        resetPlayer(currentPlayer, tetriminos);
        return sweepRows(newStage);
      }
      return newStage;
    };

    // Here are the updates
    if (!gameOver) {
      setStage(prev => updateStage(prev));
    }

  }, [
    player.collided,
    player.pos.x,
    player.pos.y,
    player.tetrimino,
    resetPlayer,
  ]);

  return [stage, setStage, rowsCleared, spectre, getSpectreHigh, sendSmash, setSendSmash];
};
