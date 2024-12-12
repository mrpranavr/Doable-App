import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import CustomTextInput from "@/components/CustomTextInput";

const AddTaskScreen = () => {
  return (
    <View className="bg-primary-dark flex-1 items-center px-4 gap-2 justify-between pb-14">
      <ScrollView>
        <Text className="font-dmSansBold text-secondary-white tracking-widest text-3xl text-center">
          Create Your Task 📝
        </Text>
        <Text className="font-dmSansRegular text-secondary-white text-center tracking-widest mt-5">
          Time to get work done! Begin by filling these out.
        </Text>

        <View className="mt-9 gap-5">
          <CustomTextInput
            placeholder="Task Title"
            type="default"
            value={''}
            onChange={() => {}}
            hasError={false}
          />
          <CustomTextInput
            placeholder="Task Description"
            type="default"
            value={''}
            onChange={() => {}}
            hasError={false}
          />
        </View>
      </ScrollView>
      
      <TouchableOpacity
        className="w-full bg-bold-green rounded-full px-4 py-5 flex items-center justify-center"
        onPress={() => {}}
      >
        <Text className="font-dmSansBold font-bold text-base tracking-widest text-primary-dark">
          Create Task
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTaskScreen;
