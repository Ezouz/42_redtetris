import React from 'react';

import { StyledDisplay, StyledDisplayCase } from './styles/StyledDisplay';
import { StyledTetrimino, StyledRow } from './styles/StyledTetrimino';
import Cell from './Cell';

import { TETRIMINOS } from "../utils/tetriminos-colors.js";

const color = (cell) => {
  return TETRIMINOS[cell].color;
}

const Display = ({ text, tetro }) => (
  <StyledDisplay>
    <StyledDisplayCase>
      <p>{text}</p>
      {tetro && tetro.shape ?
        <StyledTetrimino width={tetro.shape[0].length} height={tetro.shape.length}>
          {tetro.shape.map((row, y) => (
            <StyledRow className="row" key={y}>
              {row.map((cell, x) => <Cell key={x} type={cell[0]} color={color(cell)} size={1.5} cell={true} />)}
            </StyledRow>
          ))}
        </StyledTetrimino> :
        <div></div>
      }

    </StyledDisplayCase>
  </StyledDisplay >
);

export default Display;
