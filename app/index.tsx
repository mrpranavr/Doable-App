import { View, Text } from 'react-native'
import React from 'react'
import SignUpScreen from './(auth)/sign-up'
import { useAuth } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';

const LandingScreen = () => {

  const { isSignedIn } = useAuth();

  if(!isSignedIn) {
    return (
      // <View className='flex-1'>
      //   <SignUpScreen />
      // </View>
      <Redirect href={"/(auth)/sign-up"} />
    )
  }
}

export default LandingScreen