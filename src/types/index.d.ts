interface PokemonData {
	id: string;
	name: string;
	src: string;
	isSelected: boolean;
	isHidden: boolean;	
}

interface RequestStatus {
	abilities: any;
	base_experience: number;
	forms: any;
	game_indices: any;
	height: number;
	held_items: any;
	id: number;
	is_default: boolean;
	location_area_encounters: string;
	moves: any;
	name: string;
	order: number;
	past_abilities: any;
	past_types: any;
	species: any;
	sprites: {
		back_default: string;
		back_female: string;
		back_shiny: string;
		back_shiny_female: string;
		front_default: string;
		front_female: string;
		front_shiny: string;
		front_shiny_female: string;
		other: {
			dream_world: {
				front_default: string;
				front_female: string;
			};
			home: any;
			"official-artwork": any;
			showdown: any;
		}
		versions: any;
	};
	stats: any;
	types: any;
	weight: number;
}

interface Score {
    user: string;
    time: number;
}

interface StoredData extends Score {
    scores: Score[];   
    gameState: PokemonData[];
}
