import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Task } from "@/constants/Types";
import { CardColors } from "@/constants/GlobalData";
import { mockTasks } from "@/constants/MockData";
import { getDatePart } from "@/helper/helperFunction";

export type TaskCardProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
  const [numberOfSubTasks, setNumberOfSubTasks] = useState(0)
  const randomColor = () => {
    if (!Array.isArray(CardColors) || CardColors.length === 0) {
      return "#FEF752";
    }

    const randomIndex = Math.floor(Math.random() * CardColors.length);
    return CardColors[randomIndex];
  };

  useEffect(() => {
    // get the child tasks count
    const subTasks = mockTasks.filter((t) => t.parent_task === task.id);
    setNumberOfSubTasks(subTasks.length)
  }, [])

  return (
    <TouchableOpacity
      className={`w-full rounded-[20px] flex-row px-3 py-5 gap-6 justify-center items-center`}
      style={{ backgroundColor: randomColor() }}
      activeOpacity={1}
    >
      <View className="flex items-center gap-2">
        <View className="items-center">
          <Text className="text-black text-[22px] font-dmSansRegular">{getDatePart(task.startDate, 'day', false)}</Text>
          <Text className="text-black font-helvetica tracking-wider text-[12px] uppercase">
            {getDatePart(task.startDate, 'month', true)}
          </Text>
        </View>
        <View className="w-[1.5px] rounded-full flex-1 bg-black"></View>
        <View className="items-center">
          <Text className="text-black text-[22px] font-dmSansRegular">{getDatePart(task.endDate, 'day', false)}</Text>
          <Text className="text-black font-helvetica tracking-wider text-[12px] uppercase">
          {getDatePart(task.endDate, 'month', true)}
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
            {task.type === "Group" ? numberOfSubTasks : "5 PM"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TaskCard;
