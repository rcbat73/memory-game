import React from 'react';
import placeholder from '../../assets/images/placeholder.svg';
import styles from './styles.module.css';


interface CardProps {
	id: string;
	name: string;
	src: string;
	isSelected: boolean;
	isHidden: boolean;
	onCardSelected: (id: string, isHidden: boolean) => void;
	checkIfMatch: () => void;
}

const Card = React.memo(({
	id,
	name,
	src,
	isSelected,
	isHidden,
	onCardSelected,
	checkIfMatch,
}: CardProps) => {
	const cardTransitionEndHandler = (name: string) => (event: React.TransitionEvent<HTMLDivElement>) => {
		event.stopPropagation();
		checkIfMatch();
	};
	
	const cardClickHandler = (id: string, isHidden: boolean) => (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
		event.stopPropagation();		
		if(!isHidden){
			onCardSelected(id, isSelected);
		}
	};

	const getClasses = () => {
		if(isSelected) {
			return `${styles.card} ${styles.forward}`;
		}
		else if(isHidden) {			
			return `${styles.card} ${styles.hide}`;
		}
		return styles.card;
	}
	
	return (
		<li id={`${id}`} className={styles.cardContainer} onClick={cardClickHandler(id, isHidden)}>
			<div className={getClasses()} onTransitionEnd={cardTransitionEndHandler(name)}>
				<img src={src || placeholder} width="100" height="100" alt={name ? `pokemon ${name}` : "placeholder"} />
				<div></div>
			</div>
		</li>
	);
});

export default Card;
