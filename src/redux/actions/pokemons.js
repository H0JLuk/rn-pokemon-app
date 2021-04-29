import { LOAD_POKEMONS_SUCCESS, LOAD_POKEMONS_ERROR, LOAD_POKEMONS } from '../types/pokemon'
import { POKEMON_URL } from '@env'
import { DB } from '../../db'

export const loadPokemonsAction = ({ url = '', limit, offset }) => async (dispatch) => {
  dispatch({ type: LOAD_POKEMONS })

  try {
    url || (url = POKEMON_URL + `pokemon?limit=${limit}&offset=${offset}`)
    const response = await fetch(url)

    for await (let pokemon of payload.results) {
      const data = await (await fetch(pokemon.url)).json()

      pokemon.id = data.id
      pokemon.img = data.sprites.other['official-artwork'].front_default

      pokemon.abilities = data.abilities.map((item) => {
        const { url, name } = item.ability
        const id = url.match(/^.+\/(\d+)\/$/)[1]
        return { id, name, url }
      })
    }

    dispatch({
      type: LOAD_POKEMONS_SUCCESS,
      payload,
    })
  } catch (err) {
    dispatch({
      type: LOAD_POKEMONS,
      err,
    })
    console.error('POKEMON ERR', err)
  }
}
