import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInLeft,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { mockTasks } from "@/constants/MockData";
import { Task } from "@/constants/Types";
import { getDatePart } from "@/helper/helperFunction";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const BUTTON_THRESHOLD = SCREEN_WIDTH - 16 - SCREEN_WIDTH * 0.5 - 6; // Total width minus horizontal padding minus button width

const TaskDetailScreen = () => {
  const { taskId, taskColor } = useLocalSearchParams();
  const router = useRouter();

  // Animation variables
  const arrowTranslateX = useSharedValue(0);
  const buttonTranslateX = useSharedValue(0);

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

  // ANIMATION FUNCTIONS

  const panGesture = Gesture.Pan()
    .onChange((event) => {      
      // Allow movement between 0 and threshold in both directions
      const newValue = buttonTranslateX.value + event.translationX;
      if (newValue >= 0 && newValue <= BUTTON_THRESHOLD) {
        buttonTranslateX.value = newValue;
      } else if (newValue < 0) {
        buttonTranslateX.value = 0;
      } else if (newValue > BUTTON_THRESHOLD) {
        buttonTranslateX.value = BUTTON_THRESHOLD;
      }
    })
    .onEnd((event) => {
      // Snap to nearest end point (0 or threshold) based on velocity and position
      const velocity = event.velocityX;
      const position = buttonTranslateX.value;
      const snapToEnd = 
        velocity > 500 || // Fast swipe right
        (position > BUTTON_THRESHOLD / 2 && velocity >= 0); // Past halfway and moving right/stopped
        
      buttonTranslateX.value = withTiming(
        snapToEnd ? BUTTON_THRESHOLD : 0,
        { duration: 500 }
      );
    });

  const rArrowAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: arrowTranslateX.value,
        },
      ],
    };
  }, []);

  const rButtonAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: buttonTranslateX.value,
        },
      ],
    };
  });

  return (
    <Animated.View
      className="relative w-full flex-1 bg-primary-dark"
      style={{ backgroundColor: validTaskColor }}
      sharedTransitionTag="Tag1"
      // entering={FadeInDown.duration(400).delay(500)}
    >
      <SafeAreaView
        className="flex-1 items-center w-full px-4"
        // edges={["top", "left", "right"]}
      >
        {/* Header Nav and overview */}
        <View className="flex-row justify-between items-center w-full">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={35} color="black" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={25} color="black" />
          </TouchableOpacity>
        </View>

        <View className="mt-7 gap-7 w-full">
          <View className="flex-row items-center gap-4">
            <Text className="font-helvetica text-secondary-white text-[12px] uppercase bg-primary-dark rounded-[12px] p-2">
              {task?.priority}
            </Text>
            {task?.endDate &&
            task?.endDate < new Date() &&
            task?.status !== "Complete" ? (
              <Text className="font-helvetica text-secondary-white text-[12px] uppercase bg-primary-dark rounded-[12px] p-2">
                Overdue
              </Text>
            ) : (
              <View />
            )}
          </View>

          <Animated.Text
            className=" font-helvetica text-[40px] tracking-widest text-black uppercase"
            sharedTransitionTag={`task-title-${taskId}`}
          >
            {task?.title}
          </Animated.Text>

          <View className="flex-row items-center justify-between gap-2">
            <View className="gap-1">
              <Text className="font-helvetica text-primary-light text-[10px] uppercase tracking-wider">
                Started on
              </Text>
              <Text className="font-dmSansRegular text-black text-[14px] uppercase tracking-wider">
                {getDatePart(task?.startDate, "day")}{" "}
                {getDatePart(task?.startDate, "month", true)}
                {", "}
                {getDatePart(task?.startDate, "year")}
              </Text>
            </View>

            {/* Animated arrow line here */}

            <View className="gap-1">
              <Text className="font-helvetica text-primary-light text-[10px] uppercase tracking-wider">
                Ending on
              </Text>
              <Text className="font-dmSansRegular text-black text-[14px] uppercase tracking-wider">
                {getDatePart(task?.endDate, "day")}{" "}
                {getDatePart(task?.endDate, "month", true)}
                {", "}
                {getDatePart(task?.endDate, "year")}
              </Text>
            </View>
          </View>

          {task?.tags && task?.tags.length > 0 && (
            <View className="gap-2">
              <Text className="font-helvetica text-primary-light text-[10px] uppercase tracking-wider">
                Tags
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {task?.tags.map((tag, index) => (
                  <Text
                    key={index}
                    className={`font-helvetica uppercase text-[12px] text-black p-[6px] 
                    border-[0.75px] rounded-lg border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}
                    style={{
                      backgroundColor: validTaskColor,
                    }}
                  >
                    {tag}
                  </Text>
                ))}
              </View>
            </View>
          )}

          <View className="gap-2">
            <Text className="font-helvetica text-primary-light text-[10px] uppercase tracking-wider">
              Description
            </Text>
            <Text className="font-dmSansRegular text-black text-[14px] tracking-wider">
              {task?.description}
            </Text>
          </View>

          <View className="gap-2">
            <Text className="font-helvetica text-primary-light text-[10px] uppercase tracking-wider">
              Created On
            </Text>
            <Text className="font-dmSansRegular text-black text-[14px] tracking-wider uppercase">
              {getDatePart(task?.startDate, "day")}{" "}
              {getDatePart(task?.startDate, "month", true)}
              {", "}
              {getDatePart(task?.startDate, "year")}
            </Text>
          </View>
        </View>
        <View className="absolute bottom-4 w-full h-[84px] bg-primary-dark rounded-[40px] p-2">
          <GestureDetector gesture={panGesture}>
            <Animated.View
              className="w-[50%] h-full bg-secondary-white rounded-full items-center justify-center"
              style={rButtonAnimation}
            >
              {/* <Ionicons name="checkmark" size={25} color="black" /> */}
              <Text className="font-helvetica text-black text-[14px] uppercase">
                Mark as Done
              </Text>
            </Animated.View>
          </GestureDetector>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
};

export default TaskDetailScreen;
