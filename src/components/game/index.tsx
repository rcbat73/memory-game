import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

import Board from '../board';
import Timer from '../timer';
import Spinner from '../spinner';
import { DEFAULT_DATA } from '../../constants';
import { useLocalStorage } from '../../hooks';
import { useFetchPokemon } from '../../api';
import { positionCard } from '../../utils';
import styles from './styles.module.css';

const Game = () => {
	const [results, setResults] = useState<PokemonData[]>([]);
	const [isTimeStopped, setIsTimeStopped] = useState(false);
	const [isEnded, setIsEnded] = useState(false);
	const [isLogout, setIsLogout] = useState(false);

	const data = useFetchPokemon();
	const navigate = useNavigate();
	const { value, set } = useLocalStorage<StoredData>('data', DEFAULT_DATA);
	const [currentCards, setCurrentCards] = useState<PokemonData[]>(value && value.gameState.length ? value.gameState : []);
	const [currentTime, setCurrentTime] = useState(value && value.time ? value.time : 0);
	const [isStarted, setIsStarted] = useState(value && value.time ? Boolean(value.time) : false);
	
	useEffect(() => {
		if(isTimeStopped && isLogout && value)	{
			set({ ...DEFAULT_DATA, scores: value.scores.map(score => ({ ...score }))});
			navigate("/");
		}
	}, [value, isTimeStopped, isLogout]);

	useEffect(() => {
		if(value && currentTime) {
			set({ ...value, time: currentTime });
		}		
	}, [currentTime]);

	useEffect(() => {		
		if(value) {
			set({ ...value, gameState: [...currentCards] });
		}		
	}, [currentCards]);

	useEffect(() => {
		const results = positionCard(data.results);
		if(value && value.gameState.length) {
			setResults(value.gameState.map(state => ({ ...state })));
		}
		else {
			setResults(results);
		}
		
	}, [data.results.length]);

	useEffect(() => {
		const updateScore = (value: StoredData) => {
			const userScore = value.scores.filter(score => score.user === value.user);
			if(!userScore.length) {
				const scores = [...value.scores, { user: value.user, time: value.time }];				
				set({ ...value, scores });
			}
			else {
				set({
					...value,
					scores: value.scores.map(score => {
						return userScore[0].user === score.user ? { ...score, time: value.time } : { ...score };
					}),
				});
			}
		};
		
		if(value && isEnded) {
			updateScore(value);
			setIsEnded(false);
			setResults(positionCard(currentCards));
			navigate("/game/scores");
		}
	}, [isEnded, value]);

	if(!data.results.length) {
		return (
			<div className={styles.error}>
				<Spinner />
			</div>
		
		)
	}

	const logoutHandler = () => {
		setIsTimeStopped(true);
		setIsLogout(true);
	}
	
	return (
		<main className={styles.container}>
			<nav className={styles.navContainer}>
				<p className={styles.title}>Memory Game</p>
				<p className={styles.user}>{`${value?.user || 'user'} |`}</p>										
				<Link className={styles.scoresLink} to="/game/scores">Scores</Link >
				<button type="button" className={styles.button} onClick={logoutHandler}>Logout</button >
			</nav>
			{
				data.error
				? <div className={styles.error}>
						<p>An error occured while fetching data</p>
					</div>
				:(
					<>
						<Timer theme="light" initialValue={value?.time} isStarted={isStarted} setIsStarted={setIsStarted} isTimeStopped={isTimeStopped} isEnded={isEnded} setCurrentTime={setCurrentTime} />
						<Board data={results} setIsTimeStopped={setIsTimeStopped} isStarted={isStarted} setIsEnded={setIsEnded} setCurrentCards={setCurrentCards} />
						<Outlet context={{ setIsTimeStopped, isEnded, scores: value?.scores || [] }}/>
					</>
				)
			}			
		</main>
	);
};
export default Game;
