import { useState, useEffect } from 'react';
import { Navigate, useOutletContext } from 'react-router-dom';

import { getUITimer, sortScores } from '../../utils';
import styles from './styles.module.css';

interface ScoreContext {
	setIsTimeStopped: React.Dispatch<React.SetStateAction<boolean>>;
	isEnded: boolean;
	scores: Score[];
}

const Scores = () => {
	const [isClose, setIsClose] = useState(false);
	const { setIsTimeStopped, isEnded, scores } = useOutletContext<ScoreContext>();

	useEffect(() => {
		setIsTimeStopped(true);
	},[]);

	const closeHandler = () => {
		setIsTimeStopped(false);
		setIsClose(true);
	}

  return (
		<>
		{
			isClose
				? <Navigate to="/game" />
				: <div id={styles.overlay}>
						<div className={styles.container}>							
							<p>Scores</p>
							<ul className={styles.scores}>
							{
								scores && scores.sort(sortScores).map((score: Score, index) => {
									return (
										<li
											key={index}
										>
											<span>{score.user} </span>
											<span>{getUITimer(score.time)}</span>
										</li>					
									);
								})
							}
							</ul>
							<button type="button" className={styles.button} onClick={closeHandler}>Close</button>
						</div>
					</div>
		}
		</>
		
		
	);
};
export default Scores;
