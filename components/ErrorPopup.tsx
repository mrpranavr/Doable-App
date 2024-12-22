import React from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type ErrorPopupProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  showSecondaryButton?: boolean;
  onPrimaryPress?: () => void;
  onSecondaryPress?: () => void;
};


export const ErrorPopup = ({ 
  visible, 
  onClose, 
  title = "Error", 
  message = "Something went wrong. Please try again.",
  primaryButtonText = "Okay",
  secondaryButtonText = "Cancel",
  showSecondaryButton = false,
  onPrimaryPress = () => {},
  onSecondaryPress = () => {},
}: ErrorPopupProps) => {
  const handlePrimaryPress = () => {
    onPrimaryPress();
    onClose();
  };

  const handleSecondaryPress = () => {
    onSecondaryPress();
    onClose();
  };

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onClose}
      animationType="fade"
    >
      <Pressable 
        className="flex-1 justify-center items-center bg-black/80"
        onPress={onClose}
      >
        <Pressable 
          className="w-[85%] bg-[#2A2A2A] rounded-2xl p-6"
          onPress={e => e.stopPropagation()}
        >
          {/* Header with close button */}
          <View className="flex-row justify-between items-center mb-4">
            <View className="flex-row items-center">
              <Ionicons name="alert-circle" color="#FF4444" size={24} />
              <Text className="text-white text-xl font-dmSansBold tracking-wide ml-2">{title}</Text>
            </View>
            <TouchableOpacity 
              onPress={onClose}
              className="rounded-full p-1 bg-[#202020]"
            >
              <Ionicons name="close" color="white" size={16} />
            </TouchableOpacity>
          </View>

          {/* Message */}
          <Text className="text-gray-300 font-dmSansRegular tracking-wide text-base mb-6">{message}</Text>

          {/* Buttons */}
          <View className="flex-row justify-end space-x-3">
            {showSecondaryButton && (
              <TouchableOpacity 
                onPress={handleSecondaryPress}
                className="flex-1 py-3 px-4 rounded-xl bg-[#202020]"
              >
                <Text className="text-white text-center font-dmSansRegular tracking-wide">
                  {secondaryButtonText}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity 
              onPress={handlePrimaryPress}
              className="flex-1 py-3 px-4 rounded-3xl bg-[#FF4444]"
            >
              <Text className="text-white text-center font-dmSansBold tracking-wide">
                {primaryButtonText}
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};