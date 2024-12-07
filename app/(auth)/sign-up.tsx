import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions,
} from "react-native";
import React, { useCallback, useState } from "react";
import CustomTextInput from "@/components/CustomTextInput";
import AntDesign from "@expo/vector-icons/AntDesign";
import debounce from "lodash.debounce";
import { useRouter } from "expo-router";

const KEYBOARD_HEIGHT_OFFSET = -200;
const {height, width} = Dimensions.get('screen');
// const HEADER_VERTICAL_OFFSET = -(height / );

const SignUpScreen = () => {
  const router = useRouter();

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
    <View className="relative w-full flex-1 items-center justify-center bg-primary-dark">
      <Image
        source={require("@/assets/images/checker_bg.png")}
        style={{ width: "100%", height: "100%" }}
        className="absolute"
      />
      <KeyboardAvoidingView
        className="w-full h-full flex justify-end px-4 relative"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={KEYBOARD_HEIGHT_OFFSET}
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
          <CustomTextInput
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={setEmail}
          />
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

          {/* New user sign up link */}
          <View className="flex-row items-center justify-center gap-2 mt-4">
            <Text className="text-secondary-white font-dmSans tracking-widest">
              New to DoAble ?
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(auth)/newUserSignIn")}
            >
              <Text className="text-secondary-white font-dmSans tracking-widest underline font-bold">
                Sign Up Now
              </Text>
            </TouchableOpacity>
          </View>

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
