import React from 'react';
import styled from 'styled-components';

const StyledStartButton = styled.button`
  padding: 0.7em 1.4em;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.15em;
  box-sizing:  border-box;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 400;
  color: #FFFFFF;
  background-color: #800080;
  box-shadow: inset 0 -0.6em 0 -0.35em rgba(0,0,0,0.17);
  text-align: center;
  position: relative;
  font-family: 'theboldfont';
  font-size: large;
  margin-left: 10px;
  active {
    top: 0.1em;
  }
`;

const StartButton = ({ callback }) => (
  <StyledStartButton onClick={callback}>Start Game</StyledStartButton>
);

export default StartButton;
