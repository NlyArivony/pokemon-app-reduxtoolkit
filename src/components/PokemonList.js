import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemons, fetchPokemonById } from '../features/pokemon/pokemonSlice';

const PokemonList = ({ filter }) => {
    const dispatch = useDispatch();
    const pokemons = useSelector((state) => state.pokemon.pokemons);
    const status = useSelector((state) => state.pokemon.pokemonsStatus);
    const error = useSelector((state) => state.pokemon.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPokemons());
        }
    }, [status, dispatch]);

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>Error: {error}</div>;

    // on click show detail of the selected pokemon
    const handlePokemonClick = (pokemonName) => {
        dispatch(fetchPokemonById(pokemonName));
    };

    // Filtering logic
    const filteredPokemons = filter
        ? pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(filter.toLowerCase()))
        : pokemons;

    return (
        <ul>
            {filteredPokemons.map((pokemon, index) => (
                <li key={index} onClick={() => handlePokemonClick(pokemon.name)}>{pokemon.name}</li>
            ))}
        </ul>
    );
};

export default PokemonList;
