import { View, Text, TextInput, KeyboardTypeOptions } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import DatePicker from "react-native-date-picker";

export type CustomTextInputProps = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string | Date) => void;
  hasError: boolean;
  dateValue?: Date;
  openDatePicker?: boolean;
  onCancelPicker?: () => void;
  onPress?: () => void;
  editable?: boolean;
};

const CustomTextInput = ({
  type,
  placeholder,
  value,
  onChange,
  hasError,
  dateValue,
  openDatePicker,
  onCancelPicker,
  onPress,
  editable,
}: CustomTextInputProps) => {
  let keyboardType: KeyboardTypeOptions = "default";

  const [height, setHeight] = useState(53);
  const textInputRef = React.useRef<TextInput>(null);

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
      console.log("date value --> ", value);
      focusedSharedValue.value = false;
      if (type === "date") onCancelPicker && onCancelPicker();
    }
  };

  const handleDateInputFocused = () => {
    focusedSharedValue.value = true;
    onPress && onPress();
  };

  useEffect(() => {
    if (value) {
      focusedSharedValue.value = true;
    }
  }, [])

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
        ? withTiming(-13, { duration: 150 })
        : withTiming(0, { duration: 150 }),
    };
  }, []);

  const rOuterContainerStyle = useAnimatedStyle(() => {
    return {
      padding: hasError
        ? withTiming(2, { duration: 150 })
        : withTiming(0, { duration: 150 }),
      borderColor: hasError
        ? withTiming("#e63946", { duration: 150 })
        : withTiming("transparent", { duration: 150 }),
      borderWidth: hasError
        ? withTiming(3, { duration: 150 })
        : withTiming(0, { duration: 150 }),
      borderRadius: withTiming(15, { duration: 150 }),
    };
  }, [hasError]);

  return (
    <Animated.View className="relative w-full" style={rOuterContainerStyle}>
      <Animated.View
        className=" bg-primary-light rounded-xl px-4 py-5 w-full relative z-10"
        style={rContainerStyle}
      >
        <Animated.Text
          className="absolute left-4 z-1 text-[#A0A0A0] font-dmSans tracking-widest"
          style={[rLabelStyle, { fontFamily: "DMSans-Regular" }]}
        >
          {placeholder}
        </Animated.Text>
        <Animated.View className="z-10 w-full" style={rTextContainerStyle}>
          <TextInput
            ref={textInputRef}
            className="font-dmSans tracking-widest text-secondary-white"
            value={value}
            onChangeText={(value) => {
              onChange(value);
            }}
            keyboardType={keyboardType}
            onFocus={
              type === "date" || type === 'time' ? handleDateInputFocused : handleTextInputFocused
            }
            onBlur={handleTextInputBlurred}
            secureTextEntry={type === "password"}
            style={{ fontFamily: "DMSans-Regular"}}
            onPress={type === "date" || type === 'time' ? handleDateInputFocused : () => {}}
            editable={editable}
            numberOfLines={2}
            textAlignVertical="top"
          />
          {type === "date" && (
            <DatePicker
              modal
              mode="datetime"
              open={openDatePicker}
              date={dateValue!}
              onConfirm={onChange}
              onCancel={handleTextInputBlurred}
            />
          )}
          {type === "time" && (
            <DatePicker
              modal
              mode="time"
              open={openDatePicker}
              date={dateValue!}
              onConfirm={onChange}
              onCancel={handleTextInputBlurred}
            />
          )}
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

export default CustomTextInput;
