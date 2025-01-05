import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Pressable,
  ScrollView,
  Touchable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInLeft,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
  ZoomIn,
  ZoomInRight,
  ZoomOut,
} from "react-native-reanimated";
import { mockTasks } from "@/constants/MockData";
import { Task } from "@/constants/Types";
import { getDatePart } from "@/helper/helperFunction";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Svg, { Line } from "react-native-svg";
import { getSupabaseClient } from "@/utils/supabase";
import { useAuth } from "@clerk/clerk-expo";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const BUTTON_THRESHOLD = SCREEN_WIDTH - 16 - SCREEN_WIDTH * 0.5 - 6; // Total width minus horizontal padding minus button width

const TaskDetailScreen = () => {
  const { taskId, taskColor } = useLocalSearchParams();
  const router = useRouter();
  const { getToken, userId } = useAuth();

  // Animation variables
  const arrowTranslateX = useSharedValue(0);
  const buttonTranslateX = useSharedValue(0);
  const buttonMarkAsDoneOpacity = useSharedValue(0);

  const isStringColor = (color: any): color is string =>
    typeof color === "string";

  const validTaskColor = isStringColor(taskColor) ? taskColor : "defaultColor";

  const [task, setTask] = useState<Task | undefined>(undefined);
  const [taskStatus, setTaskStatus] = useState<string | undefined>(undefined);
  const [openMoreOptions, setOpenMoreOptions] = useState<boolean>(false);

  const [taskLoading, setTaskLoading] = useState(false);

  const handleTaskStatusChange = (isComplete: boolean) => {
    if (task) {
      const updatedTask = {
        ...task,
        status: isComplete ? "Complete" : "Incomplete",
      };

      setTaskStatus(updatedTask.status);
      // setTask(updatedTask);
      // Here you would typically also update the task in your backend/storage
    }
  };

  useEffect(() => {
    // const currentTask = mockTasks.find((task) => task.id === taskId);
    const fetchCurrentTask = async () => {
      try {
        setTaskLoading(true);
        const supabase = await getSupabaseClient(getToken);
        const { data, error } = await supabase
          .from("Tasks")
          .select("*")
          .eq("id", taskId);

        if (data) {
          console.log("Individual task data received --> ", data);
          setTask(data[0]);
          setTaskStatus(data[0].status);

          buttonTranslateX.value =
            data[0]?.status === "Complete" ? BUTTON_THRESHOLD : 0;
          buttonMarkAsDoneOpacity.value =
            data[0]?.status === "Complete" ? 0 : 1;
        }
      } catch (err: any) {
      } finally {
        setTaskLoading(false);
      }
    };

    fetchCurrentTask()

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

      buttonTranslateX.value = withTiming(snapToEnd ? BUTTON_THRESHOLD : 0, {
        duration: 500,
      });

      // Update task status based on final position
      runOnJS(handleTaskStatusChange)(snapToEnd);
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
      {openMoreOptions && (
        <View className="absolute flex-1 w-full h-full justify-center items-center">
          <Pressable
            className="  w-full h-full z-10"
            onPress={() => {
              if (openMoreOptions) {
                setOpenMoreOptions(false);
              }
            }}
          ></Pressable>
          <Animated.View
            onPointerDown={(e) => e.stopPropagation()}
            entering={ZoomIn.springify().duration(500)}
            exiting={ZoomOut.duration(300)}
            style={{ transformOrigin: "top right" }}
            className="absolute top-[65px] right-4 bg-secondary-white rounded-[12px] 
              w-[40%] p-4 gap-6 border-[1px] z-20 items-end
              border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
          >
            <TouchableOpacity onPress={() => setOpenMoreOptions(false)}>
              <Ionicons name="close" size={25} color="black" />
            </TouchableOpacity>
            <TouchableOpacity className="w-full flex-row items-center gap-2">
              <Ionicons name="pencil" size={20} color="black" />
              <Text className="font-helvetica text-black text-[12px] uppercase">
                Edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-full flex-row items-center gap-2">
              <Ionicons name="trash" size={20} color="black" />
              <Text className="font-helvetica text-black text-[12px] uppercase">
                Delete
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
      <SafeAreaView
        className="flex-1 items-center w-full px-4"
        // edges={["top", "left", "right"]}
      >
        {/* Header Nav and overview */}
        <View className="flex-row justify-between items-center w-full">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={35} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setOpenMoreOptions(!openMoreOptions)}
            className="z-20"
          >
            <Ionicons name="ellipsis-vertical" size={25} color="black" />
          </TouchableOpacity>
        </View>

        <ScrollView
          className="mt-7"
          contentContainerStyle={{ paddingBottom: 100, gap: 27, width: "100%" }}
        >
          <View className="flex-row items-center gap-4 w-full">
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

          <View className="flex-row items-center justify-between gap-2 w-full">
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

          {/* {task?.tags && task?.tags.length > 0 && ( */}
          <View className="gap-2">
            <View className="flex-row gap-2 items-center">
              <Text className="font-helvetica text-primary-light text-[10px] uppercase tracking-wider">
                Tags
              </Text>
              <View className="flex-1">
                <Svg
                  width="100%"
                  height={1}
                  viewBox="0 0 100 1"
                  preserveAspectRatio="none"
                >
                  <Line
                    x1="0"
                    y1="0"
                    x2="100"
                    y2="0"
                    stroke="#363636"
                    strokeWidth={1}
                    strokeDasharray={[5, 1]}
                  />
                </Svg>
              </View>
            </View>
            <View className="flex-row flex-wrap gap-2">
              {task?.tags &&
                task?.tags.length > 0 &&
                task?.tags.map((tag, index) => (
                  <TouchableOpacity key={index}>
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
                  </TouchableOpacity>
                ))}

              <TouchableOpacity>
                <View
                  className="flex-row items-center gap-2 p-[6px] border-[0.75px] 
                rounded-lg border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  style={{
                    backgroundColor: validTaskColor,
                  }}
                >
                  <Ionicons name="add" size={14} color="black" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* )} */}

          <View className="gap-2">
            <View className="flex-row gap-2 items-center">
              <Text className="font-helvetica text-primary-light text-[10px] uppercase tracking-wider">
                Description
              </Text>
              <View className="flex-1">
                <Svg
                  width="100%"
                  height={1}
                  viewBox="0 0 100 1"
                  preserveAspectRatio="none"
                >
                  <Line
                    x1="0"
                    y1="0"
                    x2="100"
                    y2="0"
                    stroke="#363636"
                    strokeWidth={1}
                    strokeDasharray={[5, 1]}
                  />
                </Svg>
              </View>
            </View>
            <Text className="font-dmSansRegular text-black text-[14px] tracking-wider">
              {task?.description ||
                "No description added yet. Add one to help remember what this task is about! 😊"}
            </Text>
          </View>

          <View className="gap-2">
            <View className="flex-row gap-2 items-center">
              <Text className="font-helvetica text-primary-light text-[10px] uppercase tracking-wider">
                Created On
              </Text>
              <View className="flex-1">
                <Svg
                  width="100%"
                  height={1}
                  viewBox="0 0 100 1"
                  preserveAspectRatio="none"
                >
                  <Line
                    x1="0"
                    y1="0"
                    x2="100"
                    y2="0"
                    stroke="#363636"
                    strokeWidth={1}
                    strokeDasharray={[5, 1]}
                  />
                </Svg>
              </View>
            </View>
            <Text className="font-dmSansRegular text-black text-[14px] tracking-wider uppercase">
              {getDatePart(task?.startDate, "day")}{" "}
              {getDatePart(task?.startDate, "month", true)}
              {", "}
              {getDatePart(task?.startDate, "year")}
            </Text>
          </View>
        </ScrollView>
        <View className="absolute bottom-4 w-full h-[84px] bg-primary-dark rounded-[40px] p-2">
          <GestureDetector gesture={panGesture}>
            <Animated.View
              className="w-[50%] h-full bg-secondary-white rounded-full items-center justify-center"
              style={rButtonAnimation}
            >
              {/* <Ionicons name="checkmark" size={25} color="black" /> */}
              <Animated.Text className="font-helvetica text-black text-[14px] uppercase">
                {taskStatus === "Complete" ? "Completed" : "Mark as Done"}
              </Animated.Text>
            </Animated.View>
          </GestureDetector>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
};

export default TaskDetailScreen;
