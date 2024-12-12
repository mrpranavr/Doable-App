import { View, Text, TextInput, KeyboardTypeOptions } from "react-native";
import React, { useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export type CustomTextInputProps = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  hasError: boolean;
};

const CustomTextInput = ({
  type,
  placeholder,
  value,
  onChange,
  hasError,
}: CustomTextInputProps) => {
  let keyboardType: KeyboardTypeOptions = "default";

  switch (type) {
    case "email":
      keyboardType = "email-address";
      break;
    case "password":
      keyboardType = "default";
      break;
    default:
      break;
  }

  const focusedSharedValue = useSharedValue(false);

  const handleTextInputFocused = () => {
    focusedSharedValue.value = true;
  };

  const handleTextInputBlurred = () => {
    if (!value) {
      focusedSharedValue.value = false;
    }
  };

  const rLabelStyle = useAnimatedStyle(() => {
    return {
      top: focusedSharedValue.value
        ? withTiming(10, { duration: 150 })
        : withTiming(17, { duration: 150 }),
      fontSize: focusedSharedValue.value
        ? withTiming(12, { duration: 150 })
        : withTiming(14, { duration: 150 }),
      letterSpacing: focusedSharedValue.value
        ? withTiming(0.7, { duration: 150 })
        : withTiming(1, { duration: 150 }),
    };
  }, []);

  const rContainerStyle = useAnimatedStyle(() => {
    return {
      // paddingTop: focusedSharedValue.value
      //   ? withTiming(35, { duration: 150 })
      //   : withTiming(16, { duration: 150 }),
      height: focusedSharedValue.value
        ? withTiming(63, { duration: 150 })
        : withTiming(53, { duration: 150 }),
    };
  }, []);

  const rTextContainerStyle = useAnimatedStyle(() => {
    return {
      bottom: focusedSharedValue.value
        ? withTiming(-10, { duration: 150 })
        : withTiming(0, { duration: 150 }),
    };
  }, []);

  const rOuterContainerStyle = useAnimatedStyle(() => {
    return {
      padding: hasError ? withTiming(2, { duration: 150 }): withTiming(0, { duration: 150 }),
      borderColor: hasError ? withTiming("#e63946", {duration: 150}) : withTiming("transparent", {duration: 150}),
      borderWidth: hasError ? withTiming(3, {duration: 150}) : withTiming(0, {duration: 150}),
      borderRadius: withTiming(15, {duration: 150}),
    }
  }, [hasError]);

  return (
    <Animated.View className="relative" style={rOuterContainerStyle}>
      <Animated.View
        className="flex-row items-center bg-primary-light rounded-xl px-4 py-5 w-full relative z-10"
        style={rContainerStyle}
      >
        <Animated.Text
          className="absolute left-4 text-[#A0A0A0] font-dmSans tracking-widest"
          style={[rLabelStyle, {fontFamily: 'DMSans-Regular'}]}
        >
          {placeholder}
        </Animated.Text>
        <Animated.View className="w-full" style={rTextContainerStyle}>
          <TextInput
            className="font-dmSans tracking-widest text-secondary-white w-full"
            value={value}
            onChangeText={onChange}
            keyboardType={keyboardType}
            onFocus={handleTextInputFocused}
            onBlur={handleTextInputBlurred}
            secureTextEntry={type === "password"}
            style={{fontFamily: 'DMSans-Regular'}}
          />
        </Animated.View>
      </Animated.View>

      {/* <Animated.View className="absolute top-0 left-0 w-full bg-red-600 rounded-xl z-[1] justify-end" style={rErrorContainerStyle}>
        <Text className="text-secondary-white font-dmSans tracking-widest text-sm">Has Error</Text>
      </Animated.View> */}
    </Animated.View>
  );
};

export default CustomTextInput;
