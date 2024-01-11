import React, { useState, useEffect } from 'react';
import PokemonList from './components/PokemonList';
import PokemonFilter from './components/PokemonFilter';
import PokemonDetail from './components/PokemonDetail';
import Modal from './components/Modal';
import { useSelector } from 'react-redux';

function App() {
  const [filter, setFilter] = useState('');
  const selectedPokemon = useSelector((state) => state.pokemon.pokemonDetail);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // pokemon detail error handling
  const isLoading = useSelector((state) => state.pokemon.pokemonDetailStatus === 'loading');
  const error = useSelector((state) => state.pokemon.error);

  // Open modal when a Pokémon is selected
  useEffect(() => {
    if (selectedPokemon) setIsModalOpen(true);
  }, [selectedPokemon]);

  // Close modal function
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <h1>Pokémon App</h1>
      <PokemonFilter filter={filter} setFilter={setFilter} />
      <PokemonList filter={filter} />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <PokemonDetail pokemon={selectedPokemon} isLoading={isLoading} error={error} />
      </Modal>

    </div>
  );
}

export default App;
