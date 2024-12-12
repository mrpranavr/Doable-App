import { View, Text, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { useClerk } from '@clerk/clerk-expo';

const UserModal = () => {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
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