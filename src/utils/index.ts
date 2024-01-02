export const positionCard = (list: PokemonData[]) => {
	for (let i = list.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[list[i], list[j]] = [list[j], list[i]];
	}
	return list;
};

export const getUITimer = (counter: number) => {		
	let minStr = '';
	const mili = counter / 1000;
	const min = Math.floor(mili / 60);
	const arrTime = `${mili % 60}`.split('.');			
	let secStr = arrTime[0];
	let deciStr = arrTime[1] ? `${arrTime[1]}`.substring(0,2) : '00';

	if(minStr.length < 2){
		minStr = `0${min}`;
	}
	if(secStr.length < 2){
		secStr = `0${secStr}`;
	}
	return `${minStr}:${secStr}:${deciStr}`;
};

export const sortScores = (score0: Score , score1: Score) => {
	if (score0.time < score1.time) {
		return -1;
	}
	if (score0.time > score1.time) {
		return 1;
	}
	return 0;
};
