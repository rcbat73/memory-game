import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from '../../hooks';
import { DEFAULT_DATA } from '../../constants';
import styles from './styles.module.css';

const Login = () => {
	const [user, setUser] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const { value, set } = useLocalStorage<StoredData>('data', DEFAULT_DATA);
	
	useEffect(() => {
		if(value && value.user) {
			navigate('/game');
		}
	}, []);
	

	const validate = () => {
		if(!user.length ) {
			setError('Type a user name.');
			return false;
		}
		if(user.length < 4 || user.length > 10) {
			setError('User name needs from 4 to 10 valid characters.');
			return false;
		}

		const result = user.match(/[A-Za-z0-9_-]/g);
		if(result && result.length < user.length ) {
			setError('Invalid characters are not allow, only "number, letters, _, -"');
			return false;
		}
		if(value) {
			set({ ...value, user, time: 0, scores: value.scores.map(score => ({ ...score })), gameState: [] });
			return true;
		}
		set({ user, time: 0, scores: [], gameState: [] });
		return true;
	};

	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUser(event.target.value.trim());
		setError("");
	};

	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault();
		if(validate()) {						
			navigate('/game');
		}
	};
	
	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={submitHandler}>
				<label className={styles.label} htmlFor="user">user</label>					
				<input
					className={styles.input}
					id="user"
					name="user"
					placeholder="Type a user name"
					value={user}
					onChange={changeHandler}
					autoComplete='off'
				/>
				<button className={styles.button}>Enter</button>
			</form>			
			<p className={styles.error}>{error}</p>
		</div>		
	);
};

export default Login;
