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
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useState } from "react";
import CustomTextInput from "@/components/CustomTextInput";
import AntDesign from "@expo/vector-icons/AntDesign";
import debounce from "lodash.debounce";
import { useRouter } from "expo-router";
import { useOAuth, useSignIn, useSignUp, useUser } from "@clerk/clerk-expo";
import * as AppleAuthentication from "expo-apple-authentication";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { ErrorPopup } from "@/components/ErrorPopup";

const KEYBOARD_HEIGHT_OFFSET = -200;
const { height, width } = Dimensions.get("screen");
// const HEADER_VERTICAL_OFFSET = -(height / );

// GOOGLE AUTH FUNCTIONALITY
export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const SignUpScreen = () => {
  useWarmUpBrowser();

  const router = useRouter();

  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [loading, setLoading] = useState(false);

  const { signIn, isLoaded, setActive } = useSignIn();
  const {
    signUp,
    isLoaded: isSignUpLoaded,
    setActive: setSignUpActive,
  } = useSignUp();

  const [errorPopupVisible, setErrorPopupVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const signInUser = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      await setActive({ session: result.createdSessionId });
    } catch (error: any) {
      // alert(error.message);
      setErrorPopupVisible(true);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    try {
    } catch (error: any) {
      if (error.code === "ERR_REQUEST_CANCELED") {
      }
    }
  };

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleGoogleAuth = React.useCallback(async () => {
    //   try {
    //     const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
    //       redirectUrl: Linking.createURL('/dashboard', { scheme: 'Doable' }),
    //     })
    //     // If sign in was successful, set the active session
    //     if (createdSessionId) {
    //       console.log('createdSessionId', createdSessionId)
    //       setActive!({ session: createdSessionId })
    //     } else {
    //       console.log('createdSessionId not found', createdSessionId)
    //       // Use signIn or signUp returned from startOAuthFlow
    //       // for next steps, such as MFA
    //     }
    //   } catch (err) {
    //     // See https://clerk.com/docs/custom-flows/error-handling
    //     // for more info on error handling
    //     console.error(JSON.stringify(err, null, 2))
    //   }
  }, []);

  // const {user} = useUser()
  // console.log('user --> ', user)

  return (
    <View className="relative w-full flex-1 items-center justify-center bg-primary-dark">
      <Image
        source={require("@/assets/images/checker_bg.png")}
        style={{ width: "100%", height: "100%" }}
        className="absolute"
      />
      {loading && (
        <View className="absolute top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-primary-dark ">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      <ErrorPopup
        visible={errorPopupVisible}
        onClose={() => {
          setErrorPopupVisible(false);
          setErrorMessage("");
        }}
        title="Error"
        message={errorMessage}
        primaryButtonText="Okay"
        onPrimaryPress={() => {
          setErrorPopupVisible(false);
          setErrorMessage("");
        }}
      />
      <KeyboardAvoidingView
        className="w-full h-full flex justify-end px-4 relative"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={KEYBOARD_HEIGHT_OFFSET}
      >
        {/* Doable Header */}
        <View className="flex-col items-center justify-center space-y-4 flex-1">
          <Text
            className="font-bold text-[64px] tracking-widest text-secondary-white"
            style={{ fontFamily: "DMSans-Bold" }}
          >
            DoAble.
          </Text>
          <Text
            className="font-dmSans font-bold text-lg tracking-widest text-secondary-white"
            style={{ fontFamily: "DMSans-Bold" }}
          >
            Your One Stop Manager
          </Text>
        </View>

        {/* User form */}
        <View className="flex w-full items-center justify-center gap-5 mb-10">
          <CustomTextInput
            type="email"
            placeholder="Enter your email or username"
            value={email}
            onChange={setEmail}
            hasError={false}
          />
          <CustomTextInput
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={setPassword}
            hasError={false}
          />

          {/* Continue button */}
          <TouchableOpacity
            className="w-full bg-bold-green rounded-full px-4 py-5 flex items-center justify-center"
            onPress={signInUser}
          >
            <Text
              className="font-bold text-base tracking-widest text-primary-dark"
              style={{ fontFamily: "DMSans-Bold" }}
            >
              Continue
            </Text>
          </TouchableOpacity>

          {/* New user sign up link */}
          <View className="flex-row items-center justify-center gap-2 mt-4">
            <Text className="text-secondary-white tracking-widest font-dmSansRegular">
              New to DoAble ?
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(auth)/newUserSignIn")}
            >
              <Text className="text-secondary-white font-dmSansBold tracking-widest underline font-bold">
                Sign Up Now
              </Text>
            </TouchableOpacity>
          </View>

          {/* Or Divider */}
          <View className="flex-row items-center justify-center w-full gap-4">
            <View className="bg-primary-light h-[2px] w-5/12 rounded-full" />
            <Text className="font-dmSansRegular text-base tracking-widest text-secondary-white">
              Or
            </Text>
            <View className="bg-primary-light h-[2px] w-5/12 rounded-full" />
          </View>

          {/* Social Login Buttons */}
          <TouchableOpacity
            className="w-full bg-primary-light rounded-xl px-4 py-5 items-center justify-center flex-row gap-3"
            onPress={handleGoogleAuth}
          >
            <AntDesign name="google" size={18} color="white" />
            <Text className="font-dmSansRegular tracking-widest text-secondary-white">
              Continue with Google
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-full bg-secondary-white rounded-xl px-4 py-5 items-center justify-center flex-row gap-3"
            onPress={handleAppleSignIn}
          >
            <AntDesign name="apple1" size={18} color="black" />
            <Text className="font-dmSansRegular tracking-widest text-black">
              Continue with Apple
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUpScreen;
