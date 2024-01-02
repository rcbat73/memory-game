import { useRef, useState } from 'react';

export const useTimer = (fn: (elapsedTime: number) => void) => {
	const animRef = useRef(0);
	const prevTimeRef = useRef<number | undefined>(0);

	const animate = (currTime: number) => {
		animRef.current = requestAnimationFrame(animate);
		if (prevTimeRef.current) {
			const elapsedTime = currTime - prevTimeRef.current;
			fn(elapsedTime);		
		}
		prevTimeRef.current = currTime;
		
	};

	const start = () => {
		cancelAnimationFrame(animRef.current);
		animRef.current = requestAnimationFrame(animate);
	};

	const stop = () => {
		prevTimeRef.current = undefined;
		cancelAnimationFrame(animRef.current);
	};

	return { start, stop };
};
 
export const useLocalStorage = <T>(key: string, defaultValue: T) => {
	const [value, setValue] = useState<T | undefined>(() => {
		try {
				const value = localStorage.getItem(key);
				if (value) {
						return JSON.parse(value);
				} else {
						localStorage.setItem(key, JSON.stringify(defaultValue));
						return defaultValue;
				}
		} catch (error) {
				localStorage.setItem(key, JSON.stringify(defaultValue));
				return defaultValue;
		}
});

const set = (value: T) => {
	try {
		setValue(value);

		if (!value) {
			localStorage.removeItem(key);
		} else {			
			localStorage.setItem(key, JSON.stringify(value));
		}
	} catch (error) {
		console.log(error)
	}
};

const remove = () => {
	try {		
		setValue(undefined);
		localStorage.removeItem(key);
	} catch (error) {
		console.log(error)
	}
};

  return { value, set, remove };
};
