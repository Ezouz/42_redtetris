import React from 'react';
import styled from 'styled-components';

const StyledAlert = styled.div`
  width: 360px;
  height: 190px;
  color: #ffff00;
  background: blue;
  position: absolute;
  top: 27%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 10;
  min-width: 200px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  @media (min-width: 1025px) {

  }
`;

const StyledMessage = styled.div`
  text-align: center;
  display: flex;
  margin: auto;
`;

const StyledButton = styled.button`
  padding: -0.3em 1.4em;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.15em;
  box-sizing:  border-box;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 400;
  color: blue;
  background-color: #32cd32;
  box-shadow: inset 0 -0.6em 0 -0.35em rgba(0,0,0,0.17);
  text-align: center;
  position: relative;
  font-family: 'theboldfont';
  font-size: large;
  margin: auto;
  margin-right: 10px;
  margin-top: 10px;

  active {
    top: 0.1em;
  }
`;


const Alert = ({ message, turnOffAlert }) => {


  return (
    <StyledAlert>
      <StyledButton onClick={() => { turnOffAlert(false); }}> - </StyledButton>
      <StyledMessage>
        <span>{message}</span>
      </StyledMessage>
    </StyledAlert>
  );
};

export default Alert;
