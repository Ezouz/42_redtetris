import styled from 'styled-components';

export const StyledLeaderBoard = styled.div`
  position: absolute;
  top: 36%; left: 50%;
  transform: translate(-50%, -50%);
  min-width: 300px;
  width: 40%;
`;

export const StyledLeaderBoardBar = styled.div`
  width: 100%;
  font-size: 1em;
  background: black;
  color: yellow;
  display: flex;
  justify-content: right;
`;

export const StyledLeaderBoardPlayers = styled.div`
  padding-top: 1em;
  color: white !important;
`;


export const StyledLeaderBoardTitle = styled.div`
  font-size: 2em;
  background: yellow;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: space-between;
`;

export const StyledLeaderBoardTable = styled.div`
  width: 100%;
  min-height: 300px;
  height: min-content;
  display: flex;
  flex-direction: column;
  justify-content: normal;
  background: black;

  border-bottom: 2px solid yellow;
  border-left: 2px solid yellow;
  border-right: 2px solid yellow;
`;

export const StyledLeaderBoardBoard = styled.ul`
  display: flex;
  flex-direction: colum;
  list-style: none;
  padding-left: 0 !important;
  flex-direction: column;
`;

export const StyledLeaderBoardDetail = styled.span`
  width: 50px;
`;
export const StyledLeaderBoardCross = styled.span`
  cursor: pointer;
`;

export const StyledLeaderBoardRank = styled.li`
  font-size: 1.5em;
  margin: auto;
  background: black;
  color: red;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
`;
