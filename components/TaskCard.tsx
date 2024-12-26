import { View, Text, Dimensions } from "react-native";
import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Task } from "@/constants/Types";
import { CardColors } from "@/constants/GlobalData";
import { mockTasks } from "@/constants/MockData";
import { getDatePart, randomColor } from "@/helper/helperFunction";
import { useRouter } from "expo-router";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
  withRepeat,
  withSpring,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  Pressable,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";

export type TaskCardProps = {
  task: Task;
  simGesture: any;
  onDismiss: (task: Task) => void;
};

export type TaskCardHandle = {
  resetAnimationValues: () => void;
};

// GLOBAL VARIABLES
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const THRESHOLD = SCREEN_WIDTH * 0.45;
const LIST_ITEM_SIZE = 70;

const TaskCard = forwardRef<TaskCardHandle, TaskCardProps>(
  ({ task, simGesture, onDismiss }, ref) => {
    const [numberOfSubTasks, setNumberOfSubTasks] = useState(0);
    const router = useRouter();

    const bgColor = randomColor();

    // ANIMATION VARIABLES
    const translateX = useSharedValue(0);
    const opacity = useSharedValue(1);
    const iconTranslateY = useSharedValue(0);

    const resetAnimationValues = () => {
      translateX.value = withTiming(0);
      opacity.value = withTiming(1);
    };

    useImperativeHandle(ref, () => ({
      resetAnimationValues,
    }));

    useEffect(() => {
      const subTasks = mockTasks.filter((t) => t.parent_task === task.id);
      setNumberOfSubTasks(subTasks.length);

      iconTranslateY.value = withRepeat(withSpring(-15), -1, true);
    }, []);

    // ANIMATION FUNCTIONS
    const panGesture = Gesture.Pan()
      .onChange((event) => {
        translateX.value = event.translationX <= 0 ? event.translationX : 0;
      })
      .onEnd(() => {
        const shouldDismiss = translateX.value < -THRESHOLD;
        if (shouldDismiss) {
          runOnJS(onDismiss)(task);
          runOnJS(resetAnimationValues)();
        } else {
          translateX.value = withTiming(0);
        }
      })
      .simultaneousWithExternalGesture(simGesture);

    const rStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: translateX.value }],
      };
    });

    const rTaskContainerStyle = useAnimatedStyle(() => {
      return {};
    }, []);

    const rTrashIconStyle = useAnimatedStyle(() => {
      const opacity = translateX.value < -THRESHOLD ? withTiming(1) : withTiming(0);
      // const iconTranslateY = withRepeat(withSpring(0), -1, true);
      return {
        opacity: opacity,
        // transform: [{ translateY: withRepeat(10, -1, true) }],
        transform: [{ translateY: iconTranslateY.value }],
      };
    });

    const handleGroupTaskTransition = (parentId: string | undefined) => {
      if (!parentId) {
        router.push({
          pathname: "/(home)/(task)/[groupTask]",
          params: {
            groupTask: task.id,
          },
        });
      } else {
        router.push({
          pathname: "/(home)/(task)/taskDetail/[taskId]",
          params: {
            taskId: task.id,
            taskColor: bgColor,
          },
        });
      }
    };

    return (
      <Animated.View className='relative w-full' style={rTaskContainerStyle}>
        <Animated.View className='absolute justify-center right-[20%] h-full' style={rTrashIconStyle}>
          <FontAwesome5 
            name="trash-alt"
            size={24}
            color="white"
            className='bg-bold-red py-5 px-[20px] rounded-full'
          />
        </Animated.View>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[rStyle]}>
            <Pressable
              style={[
                {
                  backgroundColor: bgColor,
                  width: "100%",
                  borderRadius: 20,
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  flexDirection: "row",
                  gap: 24,
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
              onPress={() => handleGroupTaskTransition(task.parent_task)}
            >
              <View className="flex items-center gap-2">
                <View className="items-center">
                  <Text className="text-black text-[22px] font-dmSansRegular">
                    {getDatePart(task.startDate, "day", false)}
                  </Text>
                  <Text className="text-black font-helvetica tracking-wider text-[12px] uppercase">
                    {getDatePart(task.startDate, "month", true)}
                  </Text>
                </View>
                <View className="w-[1.5px] rounded-full flex-1 bg-black"></View>
                <View className="items-center">
                  <Text className="text-black text-[22px] font-dmSansRegular">
                    {getDatePart(task.endDate, "day", false)}
                  </Text>
                  <Text className="text-black font-helvetica tracking-wider text-[12px] uppercase">
                    {getDatePart(task.endDate, "month", true)}
                  </Text>
                </View>
              </View>
              <View className="flex-1 gap-7 justify-center">
                <Text className="text-5xl uppercase font-helvetica tracking-widest w-full">
                  {task.title}
                </Text>
                <View className="flex-row w-full gap-4">
                  <Text className="font-helveticaLight uppercase tracking-wider">
                    {task.parent_task == null
                      ? "Tasks to complete"
                      : "complete by"}
                  </Text>
                  <Text className="font-helveticaBold tracking-wider">
                    {task.parent_task == null
                      ? numberOfSubTasks
                      : new Date(task.endDate).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                  </Text>
                </View>
              </View>
            </Pressable>
          </Animated.View>
        </GestureDetector>
      </Animated.View>
    );
  }
);

export default TaskCard;
