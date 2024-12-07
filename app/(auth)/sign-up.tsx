import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useCallback, useState } from "react";
import CustomTextInput from "@/components/CustomTextInput";
import AntDesign from "@expo/vector-icons/AntDesign";
import debounce from "lodash.debounce";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const debouncedSetEmail = useCallback(
    debounce((value: string) => {
      setEmail(value); // Update state after delay
    }, 300), // Delay in milliseconds
    []
  );

  const createAccount = () => {
    console.log(email, password);
  };

  return (
    <View className="px-4 w-full flex-1 items-center justify-center bg-primary-dark">
      <KeyboardAvoidingView
        className="w-full h-full flex justify-between"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        {/* Doable Header */}
        <View className="flex-col items-center justify-center space-y-4 flex-1">
          <Text className="font-dmSans font-bold text-[64px] tracking-widest text-secondary-white">
            DoAble.
          </Text>
          <Text className="font-dmSans font-bold text-lg tracking-widest text-secondary-white">
            Your One Stop Manager
          </Text>
        </View>

        {/* User form */}
        <View className="flex w-full items-center justify-center gap-5 mb-10">
          <View className="flex-row items-center bg-primary-light rounded-xl px-4 py-5 w-full">
            {/* Icon here */}
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor="#A0A0A0"
              className="font-dmSans tracking-widest text-secondary-white w-full"
              // value={email}
              onChangeText={debouncedSetEmail}
              keyboardType="email-address"
            />
          </View>
          <CustomTextInput
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={setPassword}
          />

          {/* Continue button */}
          <TouchableOpacity
            className="w-full bg-bold-green rounded-full px-4 py-5 flex items-center justify-center"
            onPress={createAccount}
          >
            <Text className="font-dmSans font-medium text-base tracking-widest text-primary-dark">
              Continue
            </Text>
          </TouchableOpacity>

          {/* Or Divider */}
          <View className="flex-row items-center justify-center w-full gap-4">
            <View className="bg-primary-light h-[2px] w-5/12 rounded-full" />
            <Text className="font-dmSans text-base tracking-widest text-secondary-white">
              Or
            </Text>
            <View className="bg-primary-light h-[2px] w-5/12 rounded-full" />
          </View>

          {/* Social Login Buttons */}
          <TouchableOpacity
            className="w-full bg-primary-light rounded-xl px-4 py-5 items-center justify-center flex-row gap-3"
            onPress={() => {}}
          >
            <AntDesign name="google" size={18} color="white" />
            <Text className="font-dmSans tracking-widest text-secondary-white">
              Continue with Google
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-full bg-primary-light rounded-xl px-4 py-5 items-center justify-center flex-row gap-3"
            onPress={() => {}}
          >
            <AntDesign name="apple1" size={18} color="white" />
            <Text className="font-dmSans tracking-widest text-secondary-white">
              Continue with Apple
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUpScreen;
