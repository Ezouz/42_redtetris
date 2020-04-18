import React from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux'

import { StyledHeaderWrapper, StyledHeader, StyledHeaderButton } from './styles/StyledHeader';
import "./styles/Style.css";
import StartButton from './StartButton';

const Header = (props) => {
	const isRunning = useSelector(state => state.sock.isRunning);
	const store = useStore();
	const dispatch = useDispatch();

	let isRestart = store.getState().sock.winner !== undefined;

	const clickStart = () => {
		if (isRestart) {
			dispatch({ type: 'RESET', room: props.room, socket: props.socket });
		}
		else {
			dispatch({ type: 'START', room: props.room, socket: props.socket });
			dispatch({ type: "TOGGLE_RUNNING", isRunning: true });
		}
	}

	let button = "";
	if (props.isLeader === true && isRunning !== true) {
		button = <StartButton callback={clickStart} />
	}

	return (
		<StyledHeaderWrapper>
			<StyledHeader>
				{props.commands}
			</StyledHeader>
			<StyledHeaderButton>
				{button}
			</StyledHeaderButton>
		</StyledHeaderWrapper>
	);
};

export default Header;
