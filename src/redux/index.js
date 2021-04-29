import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { pokemonReducer } from './reducers/pokemon'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
const rootReducer = combineReducers({
  pokemons: pokemonReducer,
})

const enhancer = composeEnhancers ? composeEnhancers(applyMiddleware(thunk)) : applyMiddleware(thunk)

export default createStore(rootReducer, enhancer)
