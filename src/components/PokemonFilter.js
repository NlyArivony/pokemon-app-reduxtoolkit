import React from 'react';

const PokemonFilter = ({ filter, setFilter }) => {
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    return (
        <div>
            <input
                type="text"
                value={filter}
                onChange={handleFilterChange}
                placeholder="Filter Pokémon"
            />
        </div>
    );
};

export default PokemonFilter;