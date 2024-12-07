import { View, Text, TextInput, KeyboardTypeOptions } from "react-native";
import React, { useState } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export type CustomTextInputProps = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

const CustomTextInput = ({
  type,
  placeholder,
  value,
  onChange,
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

  // const [focused, setFocused] = useState(false)
  const focusedSharedValue = useSharedValue(false)

  const handleTextInputFocused = () => {
    focusedSharedValue.value = true
  }

  const handleTextInputBlurred = () => {
    if(!value) {
      focusedSharedValue.value = false
    } 
  }

  const rLabelStyle = useAnimatedStyle(() => {
    return {
      top: focusedSharedValue.value ? withTiming(12, {duration: 150})  : withTiming(17, {duration: 150}),
      fontSize: focusedSharedValue.value ? withTiming(12, {duration: 150})  : withTiming(14, {duration: 150}),
      letterSpacing: focusedSharedValue.value ? withTiming(0.7, {duration: 150})  : withTiming(1, {duration: 150}),
    }
  }, [])

  const rContainerStyle = useAnimatedStyle(() => {
    return {
      paddingTop: focusedSharedValue.value ? withTiming(35, {duration: 150})  : withTiming(16, {duration: 150}),
    }
  }, [])
  
  return (
    <Animated.View className="flex-row items-center bg-primary-light rounded-xl px-4 py-5 w-full relative" style={rContainerStyle}>
      <Animated.Text className="absolute left-4 text-[#A0A0A0] font-dmSans tracking-widest" style={rLabelStyle}>{placeholder}</Animated.Text>
      <TextInput
        className="font-dmSans tracking-widest text-secondary-white w-full"
        value={value}
        onChangeText={onChange}
        keyboardType={keyboardType}
        onFocus={handleTextInputFocused}
        onBlur={handleTextInputBlurred}
        secureTextEntry={type === "password"}
      />
    </Animated.View>
  );
};

export default CustomTextInput;
