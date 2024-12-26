import { View, Text, Modal, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Task } from '@/constants/Types';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { BlurView } from 'expo-blur';

type DeleteTaskModalProps = {
  onClose: () => void;
  onConfirmDelete: () => Promise<void>;
  task: Task;
  isLoading: boolean;
}

const DeleteTaskModal = ({ onClose, onConfirmDelete, task, isLoading }: DeleteTaskModalProps) => {
  return (
    <Modal
      transparent
      visible={true}
      onRequestClose={onClose}
      animationType="fade"
    >
      <BlurView intensity={30} tint="dark" style={{ flex: 1 }}>
        <Pressable className="flex-1 justify-center items-center bg-black/50" onPress={onClose}>
          <Pressable className="w-[85%] bg-[#2A2A2A] rounded-2xl p-6" onPress={e => e.stopPropagation()}>
            {/* Header with close button */}
            <View className="flex-row justify-between items-center mb-4">
              <View className="flex-row items-center">
                <Ionicons name="warning" color="#FF4444" size={24} />
                <Text className="text-white text-xl font-dmSansBold tracking-wide ml-2">
                  Delete Task
                </Text>
              </View>
              <TouchableOpacity onPress={onClose} className="rounded-full p-2 bg-[#202020]">
                <Ionicons name="close" color="white" size={16} />
              </TouchableOpacity>
            </View>

            {/* Message */}
            <Text className="text-gray-300 font-dmSansRegular tracking-wide text-base mb-6">
              Are you sure you want to delete this task?
            </Text>

            {/* Buttons */}
            <View className="flex-row justify-end gap-5">
              <TouchableOpacity onPress={onClose} className="flex-1 py-3 px-4 rounded-3xl bg-[#202020]">
                <Text className="text-white text-center font-dmSansRegular tracking-wide">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onConfirmDelete} className="flex-1 py-3 px-4 rounded-3xl bg-[#FF4444]">
                <Text className="text-white text-center font-dmSansBold tracking-wide">
                  {isLoading ? 'Deleting...' : 'Delete'}
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </BlurView>
    </Modal>
  )
}

export default DeleteTaskModal