import React, { useState, useEffect } from "react";

import { createStage, checkCollision } from '../gameHelpers';
import { StyledTetrisWrapper, StyledTetrisAside, StyledTetris, StyledTetrisGameBar, StyledGO } from './styles/StyledTetris';
import { StyledLeaderBoard, StyledLeaderBoardBar, StyledLeaderBoardCross } from './styles/StyledLeaderBoard';
import { useSelector, useDispatch, useStore } from 'react-redux';

// Custom Hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';

// Components
import Stage from './Stage';
import Display from './Display';
import DisplayTetrimino from './DisplayTetrimino';
import Spectrum from './Spectrum';
import LeaderBoard from './LeaderBoard';

import API from '../utils/API';

const Tetris = ({ socket, room, playerCount }) => {
  const [nextTetrimino, setNextTetrimino] = useState([]);
  const [freezing, setFreezing] = useState([false, 0]);
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [Victory, setVictory] = useState(false);
  const [LB, setLB] = useState(false);
  const [spectrum, setSpectrum] = useState("");
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared, spectre, getSpectreHigh, sendSmash, setSendSmash] = useStage(player, resetPlayer, gameOver);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);
  const dispatch = useDispatch();
  const currentPlayer = useSelector(state => state.sock.currentPlayer);
  const store = useStore();
  let players = store.getState().sock.players;
  let tetriminos = store.getState().tetriminos.tetriminos;

  const startGame = (currentPlayer, tetriminos) => {
    // Reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer(currentPlayer, tetriminos);
    setScore(0);
    setLevel(0);
    setRows(0);
    setGameOver(false);
    setVictory(false);
  };

  const postScore = async (player, cp) => {
    if (player.id === cp.id) {
      try {
        const pData = { player: player.name, score: player.score };
        const scored = (await API.post('/new/', pData)).data;
        if (scored) {
          // display leaderboard
          setLB(true);
        }
      } catch (e) {
        console.error("Network error; Could not access database to save your score...");
      }
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      // Activate the interval again when user releases down arrow.
      if (keyCode === 32 || keyCode === 40) {
        setDropTime(1000 / (level + 1));
      }
    }
  };

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const drop = () => {
    getSpectreHigh();
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      // Also increase speed
      setDropTime(1000 / (level + 1) + 200);
    }
    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      if (!(freezing[0] === true)) {
        updatePlayerPos({ x: 0, y: 1, collided: false });
      } else {
        if (player.pos.y - freezing[1] > 0 && checkCollision(player, stage, { x: 0, y: (player.pos.y + freezing[1]) }))
          updatePlayerPos({ x: 0, y: -freezing[1], collided: false });
        const addLine = prev => {
          prev.shift();
          prev.push(new Array(prev[0].length).fill([1, 'frozen']));
          return prev;
        }
        if (currentPlayer.freeze > 0 && !gameOver)
          for (let i = 0; i < freezing[1]; i++) {
            setStage(prev => addLine(prev));
          }
        setFreezing([false, 0]);
        updatePlayerPos({ x: 0, y: 1, collided: false });
      }
    } else {
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
        setStage(createStage());
        dispatch({ type: 'GAME_OVER', player: currentPlayer, room, socket })
        if (store.getState().sock.players.length === 1) {
          dispatch({ type: 'END', socket, room });
          dispatch({ type: "TOGGLE_RUNNING", isRunning: false });
        }
        // post score
        postScore(currentPlayer, currentPlayer);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
      const playerData = { ...currentPlayer, spectre };
      collide(playerData);
    }
  };

  const dropPlayer = () => {
    // We don't need to run the interval when we use the arrow down to
    // move the tetrimino downwards. So deactivate it for now.
    setDropTime(null);
    drop();
  };

  function dropFallPlayer() {
    let i = 0;
    while (!checkCollision(player, stage, { x: 0, y: i })) i++;
    updatePlayerPos({ x: 0, y: i - 1, collided: false });
    setDropTime(100);
  }

  // This one  the game
  // Custom hook by Dan Abramov
  useInterval(() => {
    drop();
  }, dropTime);

  const move = (e) => {
    e.preventDefault();
    if (!gameOver) {
      if (e.keyCode === 37) {
        movePlayer(-1);
      } else if (e.keyCode === 39) {
        movePlayer(1);
      } else if (e.keyCode === 40) {
        dropFallPlayer();
      } else if (e.keyCode === 38) {
        playerRotate(stage, 1);
      } else if (e.keyCode === 32) {
        dropPlayer();
      }
    }
  };

  useEffect(() => {
    if (playerCount > 1 && players) {
      setSpectrum(<Spectrum stage={createStage()} players={players} playerCount={playerCount} />);
    }
    else {
      setSpectrum("");
    }
  }, [players]);

  const collide = (playerData) => {
    const newCurrentPlayer = { ...currentPlayer, round: currentPlayer.round + 1 }
    dispatch({ type: "ADD_ROUND", currentPlayer: newCurrentPlayer });
    dispatch({ type: "COLLISION", player: playerData, room, socket })
    setNextTetrimino(tetriminos[currentPlayer.round + 1]);
  };

  useEffect(() => {
    if (socket !== undefined) {
      const playerData = { ...currentPlayer, score: score, rows: rows, level: level };
      dispatch({ type: 'SET_SCORE', player: playerData, room: room, socket });
      if (sendSmash > 0) {
        getSpectreHigh();
        const playerData = { ...currentPlayer, spectre: spectre, smashed: sendSmash };
        dispatch({ type: 'SMASH', player: playerData, room: room, socket });
        setSendSmash(0);
      }
    }
  }, [score, rows, level, sendSmash]);

  useEffect(() => {
    if (socket !== undefined) {
      socket.on('freeze', function (n) {
        if (n > 1) {
          setFreezing([true, (n - 1)]);
        }
      });
      socket.on('start_game', function () {
        const currentPlayer = store.getState().sock.currentPlayer;
        const tetriminos = store.getState().tetriminos.tetriminos;
        dispatch({ type: 'REFILL', tetriminos });
        if (currentPlayer) {
          startGame(currentPlayer, tetriminos);
          const newCurrentPlayer = { ...currentPlayer, round: currentPlayer.round + 1 };
          dispatch({ type: "ADD_ROUND", currentPlayer: newCurrentPlayer });
          setNextTetrimino(tetriminos[currentPlayer.round + 1]);
        }
      });
      socket.on('restart_game', function (players) {
        dispatch({ type: "UPDATE_PLAYERS", players });
        let currentPlayer = store.getState().sock.currentPlayer;
        let tmp = {};
        if (currentPlayer && currentPlayer.id) {
          tmp = players.filter(e => (e.id === currentPlayer.id ? true : false))[0];
          dispatch({ type: "CURRENT_PLAYER", currentPlayer: tmp });
        }
        dispatch({ type: 'START', room, socket });
        dispatch({ type: "TOGGLE_RUNNING", isRunning: true });
      })
      socket.on('refill', function (tetriminos) {
        dispatch({ type: 'REFILL', tetriminos });
      });
      socket.on("win", function (player) {
        dispatch({ type: 'WINNER', player, socket, room });
        dispatch({ type: "TOGGLE_RUNNING", isRunning: false });
        setVictory(true);
        setDropTime(null);
        setStage(createStage());
        // post score
        let currentPlayer = store.getState().sock.currentPlayer;
        postScore(player, currentPlayer);
      });
    }
  }, [socket]);

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={e => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        < Stage stage={stage} currentPlayer={currentPlayer} />
        {gameOver ? (
          <StyledGO>
            <Display text="Game Over" />
          </StyledGO>
        ) : (Victory ? (
          <StyledGO>
            <Display text="Winner !" />
          </StyledGO>
        ) : (
            <div></div>
          ))}
        <StyledTetrisGameBar>
          <DisplayTetrimino text={`NEXT`} tetro={nextTetrimino} />
          <Display text={`SCORE`} number={score} />
          <Display text={`ROWS`} number={rows} />
          <Display text={`LEVEL`} number={level} />
        </StyledTetrisGameBar>
      </StyledTetris>
      <StyledTetrisAside>
        {spectrum}
      </StyledTetrisAside>
      {LB ? <StyledLeaderBoard><StyledLeaderBoardBar><StyledLeaderBoardCross onClick={() => { setLB(false); }}>-</StyledLeaderBoardCross></StyledLeaderBoardBar><LeaderBoard /></StyledLeaderBoard> : <div></div>}
    </StyledTetrisWrapper>
  );
};


export default Tetris;
