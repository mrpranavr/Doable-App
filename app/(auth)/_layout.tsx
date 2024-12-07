import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const AuthRoutesLayout = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter()

  if (isSignedIn) {
    console.log("signed in");
    return <Redirect href={"/(home)/home"} />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="newUserSignIn"
        options={{
          presentation: "modal",
          headerShown: true,
          title: "",
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
            >
              <Ionicons name="close-circle" size={28} color='white' />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#202020'
          },
          gestureEnabled: false
        }}
      />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthRoutesLayout;
