import { Slot, SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";

import "../global.css";
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { ActivityIndicator, Text, View } from "react-native";
import { useFonts } from "expo-font";
// import { DMSans_400Regular, DMSans_700Bold, useFonts } from "@expo-google-fonts/dm-sans";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }

      return item;
    } catch (error) {
      console.log("Error getting token: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, token: string) {
    try {
      return SecureStore.setItemAsync(key, token);
    } catch (error) {
      return;
    }
  },
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing publishable key. Please set the EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY environment variable."
  );
}

const InitialLayout = () => {
  // Loading fonts
  const [fontsLoaded, error] = useFonts({
    'DMSans-Regular': require('../assets/fonts/DMSans-Regular.ttf'),
    'DMSans-Bold': require('../assets/fonts/DMSans-Bold.ttf')
  });

  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // Throw error if fonts are not loaded
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  // Hide splash screen when fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Checking authentication
  useEffect(() => {
    if (!isLoaded) return;
    const inHomeGroup = segments[0] === '(home)'
    console.log('use effect - segments : ', segments)
    // console.log('use effect - isHomeGroup : ', inHomeGroup)
    // console.log('use effect - isSignedIn : ', isSignedIn)
    if(isSignedIn && !inHomeGroup) {
      // Bringing the user inside app
      router.replace('/(home)/home');
    } else if (!isSignedIn && inHomeGroup) {
      // Kick the user out
      router.replace('/(auth)/sign-up');
    }
  }, [isSignedIn]);


  if(!isLoaded || !fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size='large' color='#000' />
      </View>
    ) 
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(home)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <InitialLayout />
    </ClerkProvider>
  );
}
