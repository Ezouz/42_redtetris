import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useStore } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { regex } from "../utils/regex";

import { StyledPlayground, StyledStagesWrapper } from "./styles/StyledPlayground";
import "./styles/Style.css";
import Header from "./Header";
import Tetris from "./Tetris";

import io from 'socket.io-client';

let socket;

const Playground = ({ setIsAlert, setAlertMessage, setIsRunning }) => {
  const params = regex.url.exec(window.location.href);
  let room = "";
  let username = "";

  const [playerCount, setPlayerCount] = useState(1);
  const [gameLeader, setGameLeader] = useState({ name: username, id: 0 });
  const dispatch = useDispatch();
  const store = useStore();
  const isRunning = store.getState().sock.isRunning;

  const isLeaderRef = useRef(username === gameLeader.name);

  const commands = () => {
    if (isLeaderRef.current && !isRunning) {
      return <span>You can start the game !</span>;
    } else if (!isRunning) {
      return <span>Wait for {gameLeader.name} to start the game !</span>;
    } else {
      return <span>Game is ON !</span>;
    }
  };

  const scene = () => {
    if (params !== null) {
      room = params[1].substring(1);
      username = params[2].slice(1, -1);
      return (
        <div>
          <Header
            commands={commands()}
            isLeader={isLeaderRef.current}
            room={room}
            socket={socket}
          />
          <StyledStagesWrapper>
            <Tetris socket={socket} room={room} playerCount={playerCount} />
          </StyledStagesWrapper>
        </div>
      );
    } else {
      return (<Redirect to="/" />);
    }
  };

  useEffect(() => {
    // if (process.env.NODE_ENV === "production") {
    // 	socket = io("https://" + process.env.REACT_APP_DOMAIN+ ":" + process.env.REACT_APP_TETRIS_API_PORT);
    // } else {
    socket = io("http://" + process.env.REACT_APP_DOMAIN + ":" + process.env.REACT_APP_TETRIS_API_PORT);
    // }
    return () => {
      socket.close();
    }
  }, []);

  useEffect(() => {
    if (socket !== undefined) {
      socket.emit("room", room, username);
      socket.on("players", function (leader, players) {
        setPlayerCount(players.length);
        setGameLeader(leader);
        const isLeader = (socket.id === leader.id) || leader.id === 0;
        isLeaderRef.current = isLeader;
        dispatch({ type: "UPDATE_PLAYERS", players });
        let currentPlayer = store.getState().sock.currentPlayer;
        let tmp = {};
        if (currentPlayer && currentPlayer.id) {
          tmp = players.filter(e => (e.id === currentPlayer.id ? true : false))[0];
          dispatch({ type: "CURRENT_PLAYER", currentPlayer: tmp });
        }
      });
      socket.on("player", function (player) {
        dispatch({ type: "CURRENT_PLAYER", currentPlayer: player });
      });
      socket.on("message", function (message) {
        setIsAlert(true);
        setAlertMessage(message);
      });
      socket.on("isRunning", function () {
        dispatch({ type: "TOGGLE_RUNNING", isRunning: true });
        setIsRunning(true);
        setIsAlert(true);
        setAlertMessage("A game is currently running in this room. Please chose another number.");
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <StyledPlayground>
      {scene()}
    </StyledPlayground>
  );
}
export default Playground;
