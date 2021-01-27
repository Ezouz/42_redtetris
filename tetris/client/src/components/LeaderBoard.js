import React, { useState, useEffect, useRef } from "react";
import { StyledLeaderBoardBoard, StyledLeaderBoardTitle, StyledLeaderBoardRank, StyledLeaderBoardTable, StyledLeaderBoardPlayers, StyledLeaderBoardDetail } from './styles/StyledLeaderBoard';
import API from '../utils/API';

const LeaderBoard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const isMounted = useRef(null);

  const getLeaderBoard = async () => {
    try {
      const tmp = (await API.get('/leaderboard/')).data;
      if (isMounted.current) {
        setLeaderboard(tmp);
      }
    } catch (e) {
	console.error("Network Error; Could not access the database to publish the leaderboard...");
    }
  }

  useEffect(() => {
    isMounted.current = true;
    getLeaderBoard();
    return () => {
      isMounted.current = false;
    }
  }, []);

  return (
    <StyledLeaderBoardTable>
      <StyledLeaderBoardTitle>
        LEADERBOARD
      </StyledLeaderBoardTitle>
      <StyledLeaderBoardBoard>
        <StyledLeaderBoardRank>
          <StyledLeaderBoardDetail>rank</StyledLeaderBoardDetail>
          <StyledLeaderBoardDetail>player</StyledLeaderBoardDetail>
          <StyledLeaderBoardDetail>score</StyledLeaderBoardDetail>
        </StyledLeaderBoardRank>
        <StyledLeaderBoardPlayers>
          {leaderboard.map((e, i) => (
            <StyledLeaderBoardRank key={i}>
              <StyledLeaderBoardDetail>{i + 1}</StyledLeaderBoardDetail>
              <StyledLeaderBoardDetail>{e.player_name}</StyledLeaderBoardDetail>
              <StyledLeaderBoardDetail>{e.score}</StyledLeaderBoardDetail>
            </StyledLeaderBoardRank>
          ))}
        </StyledLeaderBoardPlayers>
      </StyledLeaderBoardBoard>
    </StyledLeaderBoardTable>
  )
};

export default LeaderBoard;
