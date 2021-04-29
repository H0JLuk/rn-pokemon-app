import React from 'react'
import { ActivityIndicator } from 'react-native'

export const Loader = ({ size, color }) => {
  return <ActivityIndicator size={size} color={color} />
}

Loader.defaultProps = {
  size: 'large',
  color: '#0000ff',
}
