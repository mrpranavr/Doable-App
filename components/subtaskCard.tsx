import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Task } from "@/constants/Types";
import { randomColor } from "@/helper/helperFunction";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useRouter } from "expo-router";

type SubTaskCardProps = {
  task: Task;
  translateY: Animated.SharedValue<number>;
  index: number;
};

const CARD_SIZE = 150;

const SubTaskCard = ({ task, translateY, index }: SubTaskCardProps) => {
  // console.log(index)

  const router = useRouter()

  const rStyle = useAnimatedStyle(() => {

    const scale = interpolate(
      translateY.value,
      [-1, 0, CARD_SIZE * (index), CARD_SIZE * (index + 2) ],
      [1, 1, 1, 0.8], // Adjust scale values to fit your design
      Extrapolation.EXTEND
    );

    const translateYValue = interpolate(
      translateY.value,
      [-1, 0, CARD_SIZE * (index), CARD_SIZE * (index + 4) ],
      [0, 0, 0, 500], // Adjust scale values to fit your design
      Extrapolation.EXTEND
    );

    const opacity = interpolate(
      translateY.value,
      [-1, 0, CARD_SIZE * (index), CARD_SIZE * (index + 8) ],
      [1, 1, 1, 0], // Fade out slightly
      Extrapolation.CLAMP
    );
    return {
      transform: [
        {
          scale: scale,
        },
        { translateY: translateYValue },
      ],
      // opacity
    };
  }, [index]);

  const color = randomColor();

  const handleOpenTask = () => {
    router.push({
      pathname: '/(home)/(task)/taskDetail/[taskId]',
      params: {
        taskId: task.title,
        taskColor: color
      }
    })
  }

  return (
    <Animated.View
      className={`w-full rounded-[40px] px-4 py-5 pb-[150px] -mb-[150px]`}
      style={[{ backgroundColor: color }, rStyle]}
    >
      {/* Header section */}
      <View className="flex-row w-full justify-between items-center mb-4">
        <TouchableOpacity className="rounded-[12px] border-black border-[2px] w-[37px] h-[30px] items-center justify-center">
          {
            task.status === 'Complete'? (
              <Ionicons name="checkmark" color="black" size={20} />
            ) : (
              <View className="hidden"></View>
            )
          }
        </TouchableOpacity>

        <TouchableOpacity onPress={handleOpenTask}>
          <Ionicons name="open-outline" color="black" size={34} />
        </TouchableOpacity>
      </View>
      <Animated.Text className={`font-helvetica text-[40px] uppercase text-black ${task.status === 'Complete' ? 'line-through text-gray-800' : ''}`} sharedTransitionTag='Tag1'>
        {task.title}
      </Animated.Text>
    </Animated.View>
  );
};

export default SubTaskCard;
