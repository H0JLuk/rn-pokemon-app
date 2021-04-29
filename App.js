import React, { useState } from 'react'
import { Provider } from 'react-redux'
import AppLoading from 'expo-app-loading'

import { bootstrap } from './src/bootstrap'
import store from './src/redux'
import { MainScreen } from './src/screens/MainScreen/MainScreen'

export default function App() {
  const [isReady, setIsReady] = useState(false)

  if (!isReady) {
    return <AppLoading startAsync={bootstrap} onFinish={() => setIsReady(true)} onError={console.error} />
  }

  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  )
}
