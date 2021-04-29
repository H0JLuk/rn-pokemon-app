import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const Ability = ({ item }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.point} />
      <Text>{item.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  point: {
    marginTop: 3,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#000',
    marginRight: 6,
  },
})
