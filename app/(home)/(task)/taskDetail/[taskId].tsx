import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";

const TaskDetailScreen = () => {
  const { taskId, taskColor } = useLocalSearchParams();
  const router = useRouter();

  const isStringColor = (color: any): color is string => typeof color === 'string';

  const validTaskColor = isStringColor(taskColor) ? taskColor : 'defaultColor';


  return (
    <Animated.View
      className="relative w-full flex-1 bg-primary-dark"
      style={{ backgroundColor: validTaskColor }}
    >
      <SafeAreaView
        className="flex-1 items-center w-full"
        edges={["top", "left", "right"]}
      >
        {/* Header Nav and overview */}
        <View className="flex-row justify-between items-center w-full px-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={35} color="black" />
          </TouchableOpacity>

          <View>
            <Text className="text-black font-helvetica uppercase text-[12px]">
              Mark as Done
            </Text>
          </View>
        </View>

        <View className="mt-7 gap-7 px-4">
          <Animated.Text className=" font-helvetica text-[96px] tracking-widest text-secondary-white" sharedTransitionTag="taskCard">
            {taskId}
          </Animated.Text>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
};

export default TaskDetailScreen;
