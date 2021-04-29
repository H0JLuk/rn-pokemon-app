import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

export const Search = ({ onTextType = () => {}, placeholder = 'Type pokemon name' }) => {
  const [value, setValue] = useState('')

  const onTextInput = (value) => {
    onTextType(value)
    setValue(value)
  }

  return (
    <View style={styles.wrapper}>
      <TextInput placeholder={placeholder} value={value} onTextInput={onTextInput} />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
