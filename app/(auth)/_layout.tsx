import { View, Text } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

const AuthRoutesLayout = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    console.log('signed in')
    return <Redirect href={"/(home)/home"} />;
  }

  return <Stack />
};

export default AuthRoutesLayout;
