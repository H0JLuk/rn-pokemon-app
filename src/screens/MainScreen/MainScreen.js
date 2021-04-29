import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, StatusBar, StyleSheet, View, Dimensions, Button, Text } from 'react-native'

import { Search } from '../../components/Search'
import { PokemonItem } from '../../components/PokemonItem'
import { useDispatch, useSelector } from 'react-redux'
import { loadPokemonsAction } from '../../redux/actions/pokemons'
import { Loader } from '../../components/Loader'

export const MainScreen = () => {
  const { currentHeight: statusBarHeight } = StatusBar

  const dispatch = useDispatch()
  const pokemons = useSelector((state) => state.pokemons)

  const initFetchPokemons = () => dispatch(loadPokemonsAction({ limit: 10, offset: 0 }))

  useEffect(() => {
    initFetchPokemons()
  }, [])

  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('screen').height - statusBarHeight
  const numColumns = Math.floor(windowWidth / 190)

  const fetchPokemons = () => {
    if (!pokemons.pokemons.length) {
      initFetchPokemons()
      return
    }
    dispatch(loadPokemonsAction({ url: pokemons.pagination.next }))
  }
  const hasMorePokemons = pokemons.pokemons.length !== pokemons.pagination.count

  const ShowMoreBtn = () => (
    <Button title='Show more' disabled={pokemons.loading || !hasMorePokemons} onPress={fetchPokemons} />
  )

  return (
    <View style={{ ...styles.wrapper, minHeight: windowHeight }}>
      <ScrollView>
        <View style={{ paddingTop: statusBarHeight }}>
          <Search />
          <FlatList
            contentContainerStyle={styles.pokemonsList}
            data={pokemons.pokemons}
            numColumns={numColumns}
            renderItem={({ item }) => <PokemonItem item={item} />}
            keyExtractor={(item) => item.name}
          />
          {pokemons.error && <Text style={styles.error}>Error: {pokemons.error}</Text>}

          {!pokemons.loading ? <ShowMoreBtn /> : <Loader />}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ccc',
  },
  pokemonsList: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    // alignItems: 'baseline',
    marginBottom: 5,
  },
  error: {
    textAlign: 'center',
    fontWeight: '700',
  },
})
