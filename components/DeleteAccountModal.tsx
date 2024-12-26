import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

type DeleteAccountModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirmDelete: () => Promise<void>;
  isLoading?: boolean;
};

export const DeleteAccountModal = ({ 
  visible, 
  onClose,
  onConfirmDelete,
  isLoading = false,
}: DeleteAccountModalProps) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [deleteText, setDeleteText] = useState('');
  const [error, setError] = useState('');

  const handleDelete = async () => {
    if (step === 1) {
      setStep(2);
      return;
    }

    if (deleteText !== 'DELETE') {
      setError('Please type DELETE to confirm');
      return;
    }

    try {
      await onConfirmDelete();
    } catch (error) {
      setError('Failed to delete account. Please try again.');
    }
  };

  const handleClose = () => {
    setStep(1);
    setDeleteText('');
    setError('');
    onClose();
  };

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={handleClose}
      animationType="fade"
    >
      <BlurView intensity={30} tint="dark" style={{ flex: 1 }}>
        <Pressable 
          className="flex-1 justify-center items-center bg-black/50"
          onPress={handleClose}
        >
          <Pressable 
            className="w-[85%] bg-[#2A2A2A] rounded-2xl p-6"
            onPress={e => e.stopPropagation()}
          >
            {/* Header with close button */}
            <View className="flex-row justify-between items-center mb-4">
              <View className="flex-row items-center">
                <Ionicons name="warning" color="#FF4444" size={24} />
                <Text className="text-white text-xl font-dmSansBold tracking-wide ml-2">
                  Delete Account
                </Text>
              </View>
              <TouchableOpacity 
                onPress={handleClose}
                className="rounded-full p-2 bg-[#202020]"
              >
                <Ionicons name="close" color="white" size={16} />
              </TouchableOpacity>
            </View>

            {/* Message */}
            <Text className="text-gray-300 font-dmSansRegular tracking-wide text-base mb-6">
              {step === 1 
                ? "Are you sure you want to delete your account? This action cannot be undone."
                : "To confirm deletion, please type 'DELETE' in the field below:"
              }
            </Text>

            {/* Delete Confirmation Input */}
            {step === 2 && (
              <View className="mb-6">
                <TextInput
                  className="bg-[#202020] text-white px-4 py-3 rounded-xl font-dmSansRegular tracking-wide"
                  placeholder="Type DELETE to confirm"
                  placeholderTextColor="#666"
                  value={deleteText}
                  onChangeText={(text) => {
                    setDeleteText(text);
                    setError('');
                  }}
                />
                {error ? (
                  <Text className="text-[#FF4444] mt-2 font-dmSansRegular">
                    {error}
                  </Text>
                ) : null}
              </View>
            )}

            {/* Buttons */}
            <View className="flex-row justify-end gap-5">
              <TouchableOpacity 
                onPress={handleClose}
                className="flex-1 py-3 px-4 rounded-3xl bg-[#202020]"
              >
                <Text className="text-white text-center font-dmSansRegular tracking-wide">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={handleDelete}
                disabled={isLoading || (step === 2 && deleteText !== 'DELETE')}
                className={`flex-1 py-3 px-4 rounded-3xl ${step === 2 && deleteText !== 'DELETE' ? 'bg-[#FF4444]/30' : 'bg-[#FF4444]'}`}
              >
                <Text className="text-white text-center font-dmSansBold tracking-wide">
                  {isLoading ? 'Deleting...' : 'Delete'}
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </BlurView>
    </Modal>
  );
}; 