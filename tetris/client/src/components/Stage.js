import React from 'react';
import { StyledStage, StyledRow } from './styles/StyledStage';
import { useSelector } from 'react-redux'
import { TETRIMINOS } from "../utils/tetriminos-colors.js";

import Cell from './Cell';

const Stage = ({ stage, currentPlayer }) => {
  const winner = useSelector(state => state.sock.winner);

  const color = (cell) => {
    let color;
    if (currentPlayer && currentPlayer.loser) {
      color = '130, 130, 130';
    }
    else if (currentPlayer && winner && currentPlayer.id === winner.id && currentPlayer.winner) {
      color = '255, 255, 0'
    }
    else {
      color = TETRIMINOS[cell[0]].color;
    }
    return color;
  }

  return (
    <StyledStage width={stage[0].length} height={stage.length}>
      {stage.map((row, y) => (
        <StyledRow className="row" key={y}>
          {row.map((cell, x) => <Cell key={x} type={cell[0]} color={color(cell)} size={3} cell={true} />)}
        </StyledRow>
      ))}
    </StyledStage>
  );
}

export default Stage;
