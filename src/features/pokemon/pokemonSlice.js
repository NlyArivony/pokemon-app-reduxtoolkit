import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    pokemons: [],
    pokemonDetail: null,
    pokemonsStatus: 'idle', // Status for the pokemons list
    pokemonDetailStatus: 'idle', // Separate status for individual Pokémon
    error: null
};

// Async thunk for fetching all Pokémon
export const fetchPokemons = createAsyncThunk('pokemon/fetchPokemons', async () => {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
    return response.data.results;
});

// Async thunk for fetching a single Pokémon
export const fetchPokemonById = createAsyncThunk('pokemon/fetchPokemonById', async (pokemonId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

// Async thunk for updating a Pokémon
export const updatePokemon = createAsyncThunk('pokemon/updatePokemon', async ({ pokemonId, data }) => {
    const response = await axios.put(`[YOUR_API_ENDPOINT]/pokemon/${pokemonId}`, data);
    return response.data;
});

// Async thunk for deleting a Pokémon
export const deletePokemon = createAsyncThunk('pokemon/deletePokemon', async (pokemonId) => {
    await axios.delete(`[YOUR_API_ENDPOINT]/pokemon/${pokemonId}`);
    return pokemonId;
});

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        // Action to set the currently selected Pokémon
        setSelectedPokemon: (state, action) => {
            state.pokemonDetail = state.pokemons.find(pokemon => pokemon.name === action.payload) || null;
        },
        // Other reducers...
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemons.pending, (state) => {
                state.pokemonsStatus = 'loading';
            })
            .addCase(fetchPokemons.fulfilled, (state, action) => {
                state.pokemonsStatus = 'succeeded';
                state.pokemons = action.payload;
            })
            .addCase(fetchPokemons.rejected, (state, action) => {
                state.pokemonsStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchPokemonById.pending, (state) => {
                state.pokemonDetailStatus = 'loading';
            })
            .addCase(fetchPokemonById.fulfilled, (state, action) => {
                state.pokemonDetailStatus = 'succeeded';
                state.pokemonDetail = action.payload;
            })
            .addCase(fetchPokemonById.rejected, (state, action) => {
                state.pokemonDetailStatus = 'failed';
                state.error = action.payload;
            })
            .addCase(updatePokemon.fulfilled, (state, action) => {
                const index = state.pokemons.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.pokemons[index] = action.payload;
                }
            })
            .addCase(deletePokemon.fulfilled, (state, action) => {
                state.pokemons = state.pokemons.filter(pokemon => pokemon.id !== action.payload);
            });
    },
});

export default pokemonSlice.reducer;

export const { setSelectedPokemon } = pokemonSlice.actions;

// Selector to get the filtered Pokémon
// Although not strictly necessary, creating a selector can make your code cleaner and more maintainable. It encapsulates the logic for selecting a specific piece of state:
export const selectFilteredPokemon = (state) => state.pokemon.pokemonDetail;