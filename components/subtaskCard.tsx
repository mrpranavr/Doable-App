import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Task } from "@/constants/Types";
import { randomColor } from "@/helper/helperFunction";
import { Ionicons } from "@expo/vector-icons";

type SubTaskCardProps = {
  task: Task;
};

const SubTaskCard = ({ task }: SubTaskCardProps) => {
  return (
    <View
      className={`w-full rounded-[40px] px-4 py-5 pb-[150px] -mb-[150px]`}
      style={{ backgroundColor: randomColor() }}
    >
      {/* Header section */}
      <View className="flex-row w-full justify-between items-center mb-4">
        <TouchableOpacity className="rounded-[12px] border-black border-[2px] w-[37px] h-[30px]">
          <View className="hidden"></View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="open-outline" color="black" size={34} />
        </TouchableOpacity>
      </View>
      <Text className="font-helvetica text-[40px] uppercase text-black">
        {task.title}
      </Text>
    </View>
  );
};

export default SubTaskCard;
