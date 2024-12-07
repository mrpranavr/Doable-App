import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import CustomTextInput from "@/components/CustomTextInput";

const NewUserSignUpScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View className="bg-primary-dark flex-1 items-center pt-5 px-4 gap-2 justify-between pb-14">
      <View>
        <Text className="font-dmSans font-bold text-secondary-white tracking-widest text-3xl text-center">
          Set up your profile ✍🏼
        </Text>
        <Text className="font-dmSans text-secondary-white text-center tracking-widest mt-5">
          Create an account to get started with Doable and manage your tasks.
        </Text>

        <View className="mt-9 gap-5">
          <CustomTextInput
            placeholder="Enter your username"
            type="default"
            value={username}
            onChange={setUsername}
          />
          <CustomTextInput
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={setEmail}
          />
          <CustomTextInput
            placeholder="Create a new password"
            type="password"
            value={password}
            onChange={setPassword}
          />
        </View>
      </View>

      <TouchableOpacity
        className="w-full bg-bold-green rounded-full px-4 py-5 flex items-center justify-center"
        onPress={() => {}}
      >
        <Text className="font-dmSans font-medium text-base tracking-widest text-primary-dark">
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewUserSignUpScreen;
