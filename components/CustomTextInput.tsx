import { View, Text, TextInput, KeyboardTypeOptions } from "react-native";
import React from "react";

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

  return (
    <View className="flex-row items-center bg-primary-light rounded-xl px-4 py-5 w-full">
      {/* Icon here */}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#A0A0A0"
        className="font-dmSans tracking-widest text-secondary-white w-full"
        value={value}
        onChangeText={onChange}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default CustomTextInput;
