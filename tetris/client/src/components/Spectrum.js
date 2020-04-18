import React, { useState, useEffect } from "react";
import { StyledSpectrum, StyledRow, StyledAdversity, StyledNameColumn, StyledName, StyledNameLabel } from './styles/StyledSpectrum';
import { useSelector } from 'react-redux'

import "./styles/Style.css";
import Cell from './Cell';

const Spectrum = ({ stage, players, playerCount }) => {
	const currentPlayer = useSelector(state => state.sock.currentPlayer);
	const [spectres, setSpectres] = useState(players);

	const getColor = (y, x) => {
		if (spectres && currentPlayer) {
			let color;
			for (let spectre of spectres) {
				if (y >= spectre.spectre[x] && spectre.id !== currentPlayer.id) {
					color = spectre.color;
					if (spectre.spectre[x] === 20 && y === 20) {
						color = '0, 0, 0';
					}
					break;
				}
				color = '0, 0, 0';
			}
			return color;
		}
	};

	const spectreOrder = () => {
		// if not my name
		let tmp = players;
		if (players) {
			for (let i = 0; i < tmp.length; i++) {
				var target = tmp[i];
				for (var j = i - 1; j >= 0 && (tmp[j].score < target.score); j--) {
					tmp[j + 1] = tmp[j];
				}
				tmp[j + 1] = target
			}
		}
		setSpectres(tmp);
	};

	useEffect(() => {
		spectreOrder();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [players]);

	return (
		<StyledAdversity>
			<StyledNameColumn>
				<StyledNameLabel>{playerCount} PLAYERS: </StyledNameLabel>
				<br />
				{spectres.map((player, i) => (
					<StyledName className="playerName" key={i} color={player.color}> {player.name} </StyledName>
				))}
			</StyledNameColumn>

			<StyledSpectrum width={stage[0].length} height={stage.length}>
				{stage.map((row, y) => (
					<StyledRow className="row" key={y}>
						{row.map((cell, x) => <Cell key={x} type={cell[0]} color={getColor(y, x)} size={1} cell={false} />)}
					</StyledRow>
				))}
			</StyledSpectrum>
		</StyledAdversity>
	);
}
export default Spectrum;
