import React from 'react'
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ability } from './Ability'

export const PokemonItem = ({ item }) => {
  const windowWidth = Dimensions.get('window').width
  const wrapperWidth = windowWidth / Math.floor(windowWidth / 190) - 10

  return (
    <TouchableOpacity onPress={() => {}}>
      <View
        style={{
          ...styles.wrapper,
          width: wrapperWidth,
        }}
      >
        <Image source={{ uri: item.img }} style={styles.img} />
        <Text style={styles.title}>{item.name}</Text>
        {item.abilities.length && (
          <View>
            <Text>Abilities</Text>
            <FlatList
              data={item.abilities}
              renderItem={({ item }) => <Ability item={item} />}
              listKey={(abil) => item.name + abil.id}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    marginHorizontal: 5,
    marginBottom: 10,
  },
  img: {
    width: '100%',
    height: 200,
  },
  title: {
    fontWeight: '700',
    textAlign: 'center',
  },
})
