import { View, Text, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { useClerk } from '@clerk/clerk-expo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserModal = () => {
  const { signOut } = useClerk();

  const clearLocalStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('Local storage cleared.');
    } catch (error) {
      console.error('Error clearing local storage:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      // await signOut();
      await clearLocalStorage();
      await signOut();
    } catch (error: any) {
      alert(error.message);
    }
  };  

  return (
    <View className='bg-primary-dark flex-1 items-center px-4 gap-2 justify-between pb-14'>
      <Text>UserModal</Text>
      <TouchableOpacity
        className="w-full bg-bold-green rounded-full px-4 py-5 flex items-center justify-center"
        onPress={handleSignOut}
      >
        <Text className="font-dmSansBold font-bold text-base tracking-widest text-primary-dark">
          Log out
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default UserModal