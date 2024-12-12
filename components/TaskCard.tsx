import { View, Text } from "react-native";
import React from "react";
import { Task } from "@/constants/Types";
import { CardColors } from "@/constants/GlobalData";

export type TaskCardProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
  const randomColor = () => {
    if (!Array.isArray(CardColors) || CardColors.length === 0) {
      return "#FEF752";
    }

    const randomIndex = Math.floor(Math.random() * CardColors.length);
    return CardColors[randomIndex];
  };

  return (
    <View
      className={`w-full rounded-[20px] flex-row px-3 py-5 gap-6 justify-center items-center`}
      style={{ backgroundColor: randomColor() }}
    >
      <View className="flex items-center gap-2">
        <View className="items-center">
          <Text className="text-black text-[22px] font-dmSansRegular">12</Text>
          <Text className="text-black font-helvetica tracking-wider text-xs">
            SEPT
          </Text>
        </View>
        <View className="w-[1.5px] rounded-full flex-1 bg-black"></View>
        <View className="items-center">
          <Text className="text-black text-[22px] font-dmSansRegular">17</Text>
          <Text className="text-black font-helvetica tracking-wider text-xs">
            SEPT
          </Text>
        </View>
      </View>
      <View className="flex-1 gap-7 justify-center">
        <Text className="text-5xl uppercase font-helvetica tracking-widest w-full">
          {task.title}
        </Text>
        <View className="flex-row w-full gap-4">
          <Text className="font-helveticaLight uppercase tracking-wider">
            {task.type === "Group" ? "Tasks to complete" : "complete by"}
          </Text>
          <Text className="font-helveticaBold ">
            {task.type === "Group" ? task.tasksToComplete : "5 PM"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TaskCard;
