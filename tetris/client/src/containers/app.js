import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StyledApp, StyledTitle, StyledNotApp } from '../components/styles/StyledApp';
import { StyledLeaderBoardPadding } from '../components/styles/StyledLeaderBoard';

import '../components/styles/Style.css';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import Playground from '../components/Playground';
import NotFound from '../components/NotFound';
import Menu from '../components/Menu';
import LeaderBoard from "../components/LeaderBoard";
import Alert from '../components/Alert';
import { StyledHomeButton } from '../components/styles/StyledHomeButton';


const App = 
isMobile 
? 
() => {
  return (
    <StyledApp>
      <StyledTitle>
        <span style={{ color: 'red' }}>T</span>
        <span style={{ color: 'orange' }}>E</span>
        <span style={{ color: 'yellow' }}>T</span>
        <span style={{ color: 'limegreen' }}>R</span>
        <span style={{ color: 'blue' }}>I</span>
        <span style={{ color: 'purple' }}>S</span>
      </StyledTitle>
      <StyledNotApp>
          Sorry this app is not available on mobile
      </StyledNotApp>
      <StyledLeaderBoardPadding>
          <LeaderBoard />
      </StyledLeaderBoardPadding>
    </StyledApp>
  )
}
: () => {
  const dispatch = useDispatch();

  const [isAlert, setIsAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isRunning, setIsRunning] = useState("");

  const turnOffAlert = (calling) => {
    setIsAlert(calling);
    setAlertMessage("");
  };

  const leaveRoom = () => {
    turnOffAlert(false);
    setIsRunning(false)
    dispatch({ type: "TOGGLE_RUNNING", isRunning: false });
    return <Redirect to="/tetris" />;
  };

  return (
    <BrowserRouter>
      <StyledApp>
        <StyledTitle>
          <span style={{ color: 'red' }}>T</span>
          <span style={{ color: 'orange' }}>E</span>
          <span style={{ color: 'yellow' }}>T</span>
          <span style={{ color: 'limegreen' }}>R</span>
          <span style={{ color: 'blue' }}>I</span>
          <span style={{ color: 'purple' }}>S</span>
        </StyledTitle>
        <Link to="/tetris">
          <StyledHomeButton onClick={() => { leaveRoom(); }}> T </StyledHomeButton>
        </Link>
        <Route exact path="/">
          <Redirect to="/tetris" />
        </Route>
        {isAlert ? <Alert message={alertMessage} turnOffAlert={turnOffAlert} /> : <div></div>}
        <Switch>
          <Route exact path="/tetris" component={() => <Menu leaveRoom={() => { leaveRoom(); }} />} />
          <Route path="/tetris/room">
            {isRunning ? <Redirect to="/tetris" /> : <Playground setIsAlert={setIsAlert} setAlertMessage={setAlertMessage} setIsRunning={setIsRunning} />}
          </Route>
          <Route component={NotFound} />
        </Switch>
        <div style={{paddingTop: 2 + 'em; z-index: 1' }}>
          <LeaderBoard />
        </div>
      </StyledApp>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}
export default connect(mapStateToProps, null)(App)
