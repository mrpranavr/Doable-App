import { View, Text, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useClerk } from "@clerk/clerk-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomTextInput from "@/components/CustomTextInput";

const UserModal = () => {
  const { signOut, user } = useClerk();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [email, setEmail] = useState(
    user?.emailAddresses[0]?.emailAddress || ""
  );

  const clearLocalStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log("Local storage cleared.");
    } catch (error) {
      console.error("Error clearing local storage:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      await clearLocalStorage();
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <View className="bg-primary-dark flex-1 items-center px-4 gap-2 justify-between pb-14">
      <View className="w-full">
        <View>
          <Text className="font-dmSansBold text-secondary-white tracking-widest text-3xl text-center">
            Profile 😀
          </Text>
          <Text className="font-dmSansRegular text-secondary-white text-center tracking-widest mt-5">
            <Text className="font-dmSansBold"> Hey {firstName}!</Text> Here's your profile information. Feel free to edit if needed.
          </Text>
        </View>

        <View className="w-full items-center mt-9 gap-5">
          {/* Profile Picture */}
          <View className="w-24 h-24 rounded-full bg-gray-300 items-center justify-center">
            <Text className="font-dmSansBold text-2xl text-primary-dark">
              {firstName.charAt(0)}
              {user?.lastName ? user.lastName.charAt(0) : ""}
            </Text>
          </View>

          <View className="w-full gap-4">
            <CustomTextInput
              type="default"
              placeholder="First Name"
              value={firstName}
              onChange={(value) => setFirstName(value as string)}
              hasError={false}
              editable={false}
            />

            <CustomTextInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(value) => setEmail(value as string)}
              hasError={false}
              editable={false}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        className="w-full bg-bold-green rounded-full px-4 py-5 flex items-center justify-center"
        onPress={handleSignOut}
      >
        <Text className="font-dmSansBold font-bold text-base tracking-widest text-primary-dark">
          Log out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserModal;
