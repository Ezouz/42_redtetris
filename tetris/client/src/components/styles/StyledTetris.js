import styled from 'styled-components';

export const StyledTetrisWrapper = styled.div`
  min-width: 300px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding-top: 2vh;
  margin: auto;

  @media (max-width: 1025px) {
    flex-direction: column;
    flex-wrap: wrap;
  }
`;

export const StyledGO = styled.div`
  font-size: 5vw;
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
`;

export const StyledTetrisAside = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 2vw;

  @media (max-width: 1025px) {
    padding-top: 2vh;
    padding-left: 0vw;
    padding-right: 2vw;
    justify-content: space-between;
  }
`;

export const StyledTetris = styled.div`
  display: flex;
  `;
  // width: 100%;

export const StyledTetrisGameBar = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  margin: 0em 0em 0em 1em;
  width: fit-content;

`;
    // @media (min-width: 1025px) {
    //   margin: 15% 0% 15% 3%;
    // }