import React from 'react';
import { StyledCell, StyledGhostCell } from './styles/StyledCell';

// React.memo makes sure we only re-render the changed cells
const Cell = ({ type, color, size, cell }) => {
  const theCell = cell ? <StyledCell type={type} color={color} size={size} /> : <StyledGhostCell type={type} color={color} size={size} />;
  return theCell;
}

export default React.memo(Cell);
