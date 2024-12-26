import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import CustomTextInput from "@/components/CustomTextInput";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { set } from "lodash";

const NewUserSignUpScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // error states
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const { signUp, isLoaded, setActive } = useSignUp();

  const router = useRouter();

  const signUpUser = async () => {
    if (!isLoaded) {
      console.log("Sign Up Loading...");
      return;
    }

    if (!firstName) {
      setFirstNameError(true);
      return
    }

    if (!lastName) {
      setLastNameError(true);
      return
    }

    if (!username) {      
      setUsernameError(true);
      return
    }

    if (!email) {
      setEmailError(true);
      return
    }

    if (!password) {
      setPasswordError(true);
      return
    }

    setLoading(true);

    try {
      // Creating user in Clerk
      console.log(
        "Creating user in Clerk..." +
          username +
          " / " +
          email +
          " / " +
          password + " / " + firstName + " / " + lastName
      );
      const result = await signUp.create({
        username,
        emailAddress: email,
        password,
        firstName,
        lastName
      });
      // console.log("Sign Up Success", result);
      setActive({ session: result.createdSessionId });
      console.log("SESSION ID RECEIVED !");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };


  // Text input change handlers
  const handleFirstNameChange = (text: string | any) => {
    setFirstName(text);
    setFirstNameError(false);
  }

  const handleLastNameChange = (text: string | any) => {
    setLastName(text);
    setLastNameError(false);
  }

  const handleUsernameChange = (text: string | any) => {
    setUsername(text);
    setUsernameError(false);
  }

  const handleEmailChange = (text: string | any) => {
    setEmail(text);
    setEmailError(false);
  }

  const handlePasswordChange = (text: string | any) => {
    setPassword(text);
    setPasswordError(false);
  }

  return (
    <View className="bg-primary-dark flex-1 items-center pt-5 px-4 gap-2 justify-between pb-14">
      {loading && (
        <View className="absolute top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-primary-dark/80">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      <View className="w-full">
        <Text className="font-dmSansBold text-secondary-white tracking-widest text-3xl text-center">
          Set up your profile ✍🏼
        </Text>
        <Text className="font-dmSansRegular text-secondary-white text-center tracking-widest mt-5">
          Create an account to get started with Doable and manage your tasks.
        </Text>

        <View className="mt-9 gap-5">
          <CustomTextInput
            placeholder="Enter your first name"
            type="default"
            value={firstName}
            onChange={handleFirstNameChange}
            hasError={firstNameError}
          />
          <CustomTextInput
            placeholder="Enter your last name"
            type="default"
            value={lastName}
            onChange={handleLastNameChange}
            hasError={lastNameError}
          />
          <CustomTextInput
            placeholder="Create a username"
            type="default"
            value={username}
            onChange={handleUsernameChange}
            hasError={usernameError}
          />

          <CustomTextInput
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            hasError={emailError}
          />
          <CustomTextInput
            placeholder="Create a new password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            hasError={passwordError}
          />
        </View>
      </View>

      <TouchableOpacity
        className="w-full bg-bold-green rounded-full px-4 py-5 flex items-center justify-center"
        onPress={signUpUser}
      >
        <Text className="font-dmSansBold font-bold text-base tracking-widest text-primary-dark">
          Create Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewUserSignUpScreen;
