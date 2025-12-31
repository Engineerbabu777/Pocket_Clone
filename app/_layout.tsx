


import { Stack } from 'expo-router'
import React from 'react'
import { KeyboardProvider } from 'react-native-keyboard-controller'


const Layout = () => {
  return (
    <KeyboardProvider>
    
    <Stack>
        <Stack.Screen name='index' options={{ headerShown:false }} />
    </Stack>

    </KeyboardProvider>

  )
}

export default Layout