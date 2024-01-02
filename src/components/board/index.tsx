import { useState, useEffect, useCallback } from 'react';

import Card from "../card";
import styles from './styles.module.css';

interface BoardProps {
	data: PokemonData[];
	setIsTimeStopped: React.Dispatch<React.SetStateAction<boolean>>;
	setIsEnded: React.Dispatch<React.SetStateAction<boolean>>;
	setCurrentCards: React.Dispatch<React.SetStateAction<PokemonData[]>>;
	isStarted: boolean;
}

const Board = ({
	data,
	setIsTimeStopped,
	setIsEnded,
	setCurrentCards,
	isStarted,
}: BoardProps) => {
	const [cards, setCards] = useState<PokemonData[]>(data || [])

	useEffect(() => {
		const hiddenCards = cards.filter(card => card.isHidden);
		if(cards.length && hiddenCards.length === cards.length) {
			setIsTimeStopped(true);
			setIsEnded(true);
			setCards(prev => prev.map(card => ({ ...card, isHidden: false })));
		}
		
		setCurrentCards(cards);
	}, [cards]);

	useEffect(() => {
		setCards(data);
	}, [data]);

	const cardSelectedHandler = useCallback((id: string) => {
		if(isStarted) {
			setCards((prev) => {
				return prev.map((card) => {
					return card.id === id ? { ...card, isSelected: true } : { ...card };
				});
			});	
		}			
	}, [isStarted]);

	const checkIfMatch = useCallback(() => {
		const selectedCards = cards.filter(card => card.isSelected);
		if(selectedCards.length === 2) {
			setCards((prev) => {
				return prev.map((card) => {
					if(selectedCards[0].name === selectedCards[1].name && card.name === selectedCards[0].name ) {
						return { ...card, isSelected: false, isHidden: true };
					}
					return { ...card, isSelected: false };
				});
			});
		}		
	}, [cards]);
	
	return (
		<ul className={styles.board}>
		{
			cards && cards.map((card: PokemonData) => {
				return (
					<Card
						key={card.id}
						id={card.id}
						name={card.name}
						src={card.src}
						isSelected={card.isSelected}
						isHidden={card.isHidden}
						onCardSelected={cardSelectedHandler}
						checkIfMatch={checkIfMatch}
					/>						
				)
			})
		}
		</ul>
	);
};
export default Board;
