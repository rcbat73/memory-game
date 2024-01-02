import { useEffect, useState } from 'react';

import { useTimer } from '../../hooks';
import { getUITimer } from '../../utils';
import styles from './styles.module.css';

interface TimerProps {
	theme: "light" | "dark";
	initialValue: number | undefined;
	isTimeStopped: boolean;
	isEnded: boolean;
	setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
	isStarted: boolean;
	setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const  Timer = ({
	theme,
	initialValue,
	isTimeStopped,
	isEnded,
	setCurrentTime,
	isStarted,
	setIsStarted,
}: TimerProps) => {
	const [counter, setCounter] = useState(initialValue || 0);

	const updateTimer = (elapsedTime: number) => {
		setCounter(prev => prev + elapsedTime);
	};

	const { start, stop } = useTimer(updateTimer);

	const clickHandler = () => {
		if(!isStarted){
			setIsStarted(true);
			start();
		}		
	};

	useEffect(() => {
		if(isTimeStopped) {
			stop();
		}
		else if(isStarted){
			start();
		}
	}, [isTimeStopped, isStarted]);

	useEffect(() => {
		if (counter >= 10000000) {
			stop();
			setCounter(10);
		}		
		setCurrentTime(counter);
	}, [counter]);

	useEffect(() => {
		if(isEnded) {
			setCounter(0);
			stop();
		}		
	}, [isEnded]);

	return (
		<div className={styles.container}>
			<p className={styles[theme]}>{getUITimer(counter)}</p>
			<button className={`${isStarted ? `${styles.button} ${styles.hidden}` : styles.button}`} onClick={clickHandler}>Start</button>
		</div>
	);
};

export default Timer;
