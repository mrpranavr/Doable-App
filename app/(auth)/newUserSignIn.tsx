import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import CustomTextInput from "@/components/CustomTextInput";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

const NewUserSignUpScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp, isLoaded, setActive } = useSignUp();

  const router = useRouter();

  const signUpUser = async () => {
    if (!isLoaded) {
      console.log("Sign Up Loading...");
      return;
    }
    setLoading(true);

    try {
      // Creating user in Clerk
      console.log("Creating user in Clerk..." + username + ' / ' + email + ' / ' + password);
      const result = await signUp.create({
        username,
        emailAddress: email,
        password,
      });
      console.log("Sign Up Success", result);
      setActive({ session: result.createdSessionId });
      console.log("SESSION ID RECEIVED !");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="bg-primary-dark flex-1 items-center pt-5 px-4 gap-2 justify-between pb-14">
      {loading && (
        <View className="absolute top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-primary-dark">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
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
        onPress={signUpUser}
      >
        <Text className="font-dmSans font-bold text-base tracking-widest text-primary-dark">
          Create Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewUserSignUpScreen;
