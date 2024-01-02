import { useState, useEffect } from 'react';

export const fetchPokemon = async (id: number) => {
	let data;
	try {
		const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
		if (!res.ok) {
			throw new Error('Network response was not ok');
		}
		data = await res.json();
	}
	catch (error) {
		throw error;
	}

	return data;
};

export const useFetchPokemon = () => {
	const [results, setResults] = useState<PokemonData[]>([]);
	const [error, setError] = useState<Error>();

	const pokemonIds = [24, 25, 26, 27, 28, 29];

	useEffect(() => {
		Promise.all(
			pokemonIds.map((pokemonId) => fetchPokemon(pokemonId))
		)
		.then((results) => {	
			const values: PokemonData[] = results.map((result: RequestStatus, index) => {
				return {
					id: `${result?.id}`,
					name: result?.name,
					src: result?.sprites.other.dream_world.front_default,
					isSelected: false,
					isHidden: false,
				};
			});
			const cardsData: PokemonData[] = [...values, ...values].map((value, index) => {
				return {
					id: `${value.id}-${index}`,
					name: value.name,
					src: value.src,
					isSelected: false,
					isHidden: false,
				};
			});
			
			setResults(cardsData);
		})
		.catch((error) => {
			console.log(error.message);
			setError(error);
		});
	}, []);
	
	return { results, error };
};
