import { View, Text } from 'react-native'
import React from 'react'
import AuthenticateScreen from './AuthenticateScreen'
import SignUpScreen from './(auth)/sign-up'

const LandingScreen = () => {
  return (
    <View className='flex-1'>
      <SignUpScreen />
    </View>
  )
}

export default LandingScreen