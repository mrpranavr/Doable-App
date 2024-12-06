import { View, Text } from 'react-native'
import React from 'react'

const SignUpScreen = () => {
  console.log('rendered')
  return (
    <View className='flex-1 items-center justify-center bg-primary-dark'>
      <View className='flex-col items-center justify-center space-y-4'>
        <Text className='font-dmSans font-bold text-[64px] tracking-widest text-secondary-white'>DoAble.</Text>
        <Text className='font-dmSans font-bold text-lg tracking-widest text-secondary-white'>Your One Stop Manager</Text>
      </View>
    </View>
  )
}

export default SignUpScreen