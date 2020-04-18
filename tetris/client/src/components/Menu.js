import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import LeaderBoard from "./LeaderBoard";
import { StyledMenuWrapper, StyledMenu } from "./styles/StyledMenu";
import "./styles/Style.css";

import { regex } from "../utils/regex";

const Menu = ({ leaveRoom }) => {
  const [playerIsValid, setPlayerIsValid] = useState(true);
  const [roomIsValid, setRoomIsValid] = useState(false);
  const [player, setPlayer] = useState("");
  const [roomNb, setRoomNb] = useState("");
  let history = useHistory();

  const checkRoom = value => {
    if (regex.room.exec(value)) {
      setRoomIsValid(true);
    } else {
      setRoomIsValid(false);
    }
    setRoomNb(value);
  };

  const checkPlayer = value => {
    if (regex.username.exec(value)) {
      setPlayerIsValid(true);
    } else {
      setPlayerIsValid(false);
    }
    setPlayer(value);
  };

  const goToRoom = () => {
    if (playerIsValid && roomIsValid) {
      history.push("/tetris/room/#" + roomNb + "[" + player + "]");
      setPlayer("PLAYER");
      setRoomNb("");
      setRoomIsValid(false);
      setPlayerIsValid(false);
      leaveRoom();
    }
  }

  return (
    <StyledMenuWrapper>
      <StyledMenu>
        <span className="menu_label">TAKE A ROOM NUMBER</span>
        <div className="menu_input">
          <input
            maxLength="3"
            value={player}
            type="text"
            placeholder="PLAYER"
            onChange={e => checkPlayer(e.target.value)}
          />
          <span className="error-char-required" test="player">ONLY LETTERS OR NUMBERS</span>
        </div>
        <div className="menu_input">
          <input
            value={roomNb}
            type="text"
            placeholder="ROOM"
            onChange={e => checkRoom(e.target.value)}
          />
          <span className="error-number-required">ONLY NUMBERS</span>
        </div>
        <div className="menu_input">
          <button className="button-to-game" onClick={e => goToRoom(true)} disabled={!roomIsValid || !playerIsValid}>
            PLAY
          </button>
        </div>
      </StyledMenu>
      <div style={{ paddingTop: 2 + 'em' }}>
        <LeaderBoard />
      </div>
    </StyledMenuWrapper>
  );
};

export default Menu;
