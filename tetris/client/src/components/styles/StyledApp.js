import styled from 'styled-components';

export const StyledNotApp = styled.div`
  padding-top: 2em; 
  z-index: 1; 
  color:red; 
  font-size: 2em;
  width: 60%;
  margin: auto;
`;

export const StyledApp = styled.div`
  background: black;
  font-family: 'theboldfont';
  display: flex;
  flex-direction: column;
  min-height: -webkit-fill-available;
`;

export const StyledTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0vh 5vw 0;
  width: fit-content;
  font-size: 12vh;
  position: absolute;

  @media (max-width: 1025px) {
    z-index: 0;
  }
`;