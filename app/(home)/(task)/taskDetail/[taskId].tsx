import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeInDown,
  FadeInLeft,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from "react-native-reanimated";
import { mockTasks } from "@/constants/MockData";
import { Task } from "@/constants/Types";

const TaskDetailScreen = () => {
  const { taskId, taskColor } = useLocalSearchParams();
  const router = useRouter();

  // Animation variables
  const arrowTranslateX = useSharedValue(0);

  const isStringColor = (color: any): color is string =>
    typeof color === "string";

  const validTaskColor = isStringColor(taskColor) ? taskColor : "defaultColor";

  const [task, setTask] = useState<Task | undefined>(undefined);

  useEffect(() => {
    const currentTask = mockTasks.find((task) => task.id === taskId);
    if (currentTask) {
      setTask(currentTask);
    }

    arrowTranslateX.value = withRepeat(
      withSpring(-20, {
        damping: 8,
        stiffness: 60,
        mass: 0.5,
      }),
      -1,
      true
    );
  }, []);

  const rArrowAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: arrowTranslateX.value,
        },
      ],
    };
  }, []);

  return (
    <Animated.View
      className="relative w-full flex-1 bg-primary-dark"
      style={{ backgroundColor: validTaskColor }}
      sharedTransitionTag="Tag1"
      // entering={FadeInDown.duration(400).delay(500)}
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

          <View className="flex-row items-center gap-3">
            {task?.status !== "Complete" && (
              <Animated.View
                className="flex-row items-center gap-2"
                style={rArrowAnimation}
              >
                <Text className="text-black font-helvetica uppercase text-[12px]">
                  Mark as Done
                </Text>

                <Ionicons name="arrow-forward" size={20} color="black" />
              </Animated.View>
            )}

            <TouchableOpacity className="rounded-[12px] border-black border-[1.3px] w-[37px] h-[30px] items-center justify-center p-[2px]">
              {task?.status === "Complete" ? (
                <View className="bg-black rounded-[10px] w-full h-full items-center justify-center">
                  <Ionicons name="checkmark" color="white" size={20} />
                </View>
              ) : (
                <View className="hidden"></View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-7 gap-7 px-4 w-full">
          <Animated.Text
            className=" font-helvetica text-[40px] tracking-widest text-black uppercase"
            sharedTransitionTag={`task-title-${taskId}`}
            // entering={FadeInLeft.duration(400).delay(500)}
          >
            {task?.title}
          </Animated.Text>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
};

export default TaskDetailScreen;
