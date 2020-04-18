import React from 'react';
import { StyledDisplay, StyledDisplayCase } from './styles/StyledDisplay';

const Display = ({ text, number }) => (
  <StyledDisplay>
    <StyledDisplayCase>
      <p>{text}</p>
      <p>{number}</p>
    </StyledDisplayCase>
  </StyledDisplay >
);

export default Display;
