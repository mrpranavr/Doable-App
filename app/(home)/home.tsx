import { View, Text, Button } from 'react-native'
import React from 'react'
import { useClerk } from '@clerk/clerk-expo'
import { Stack } from 'expo-router'

const HomeScreen = () => {

  const {signOut} = useClerk()
  const handleSignOut = async() => {
    try {
      await signOut()
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <View>
      <Text>HomeScreen true</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  )
}

export default HomeScreen