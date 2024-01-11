const PokemonDetail = ({ pokemon, isLoading, error }) => {
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!pokemon) return <div>No Pokémon selected</div>;

    return (
        <div>
            <h3>{pokemon.name}</h3>
            <p>Base Experience: {pokemon.base_experience}</p>
            <p>Height: {pokemon.height}</p>

            <h4>Abilities</h4>
            <ul>
                {pokemon.abilities.map((ability, index) => (
                    <li key={index}>{ability.ability.name} (Hidden: {ability.is_hidden ? 'Yes' : 'No'})</li>
                ))}
            </ul>

            <h4>Forms</h4>
            <ul>
                {pokemon.forms.map((form, index) => (
                    <li key={index}>{form.name}</li>
                ))}
            </ul>

            <h4>Game Indices</h4>
            <ul>
                {pokemon.game_indices.map((game, index) => (
                    <li key={index}>{game.version.name} (Game Index: {game.game_index})</li>
                ))}
            </ul>

            <h4>Moves</h4>
            <ul>
                {pokemon.moves.map((move, index) => (
                    <li key={index}>{move.move.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default PokemonDetail;