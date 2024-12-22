import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Task } from "@/constants/Types";
import { CardColors } from "@/constants/GlobalData";
import { mockTasks } from "@/constants/MockData";
import { getDatePart, randomColor } from "@/helper/helperFunction";
import { useRouter } from "expo-router";

export type TaskCardProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
  const [numberOfSubTasks, setNumberOfSubTasks] = useState(0)
  const router = useRouter();

  const bgColor = randomColor()

  useEffect(() => {
    // get the child tasks count
    const subTasks = mockTasks.filter((t) => t.parent_task === task.id);
    setNumberOfSubTasks(subTasks.length)
  }, [])

  const handleGroupTaskTransition = (parentId: string | undefined) => {
    if(!parentId) {
      router.push({
        pathname: '/(home)/(task)/[groupTask]',
        params: {
          groupTask: task.id,
        }
      })
    } else {
      router.push({
        pathname: '/(home)/(task)/taskDetail/[taskId]',
        params: {
          taskId: task.id,
          taskColor: bgColor
        }
      })
    }
  }

  return (
    <TouchableOpacity
      className={`w-full rounded-[20px] flex-row px-3 py-5 gap-6 justify-center items-center`}
      style={{ backgroundColor: bgColor }}
      activeOpacity={1}
      onPress={() => handleGroupTaskTransition(task.parent_task)}
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
            {task.parent_task == null ? "Tasks to complete" : "complete by"}
          </Text>
          <Text className="font-helveticaBold ">
            {task.parent_task == null ? numberOfSubTasks : "5 PM"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TaskCard;
