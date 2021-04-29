import { LOAD_POKEMONS_SUCCESS, LOAD_POKEMONS_ERROR, LOAD_POKEMONS } from '../types/pokemon'

const initialState = {
  pokemons: [],
  error: null,
  loading: false,
  pagination: { count: 0, next: null },
}

export const pokemonReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case LOAD_POKEMONS:
      return { ...state, loading: true }
    case LOAD_POKEMONS_SUCCESS:
      return loadPokemonsSuccess(state, payload)
    case LOAD_POKEMONS_ERROR:
      return loadPokemonsError(state, payload)
    default:
      return state
  }
}

function loadPokemonsSuccess(state, payload) {
  const { results, count, next } = payload
  console.log('count', count)
  console.log('next :>> ', next)
  console.log('-----')
  return {
    ...state,
    pokemons: [...state.pokemons, ...results],
    loading: false,
    error: null,
    pagination: { count, next },
  }
}

function loadPokemonsError(state, error) {
  return { ...initialState, error, loading: false }
}
