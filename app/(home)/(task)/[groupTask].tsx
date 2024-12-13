import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  useLocalSearchParams,
  useRouter,
  useSearchParams,
} from "expo-router/build/hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Task } from "@/constants/Types";
import { mockTasks } from "@/constants/MockData";

const filterAction = [
  {
    title: "All",
    value: "All",
  },
  {
    title: "Active",
    value: "Active",
  },
  {
    title: "Done",
    value: "Done",
  },
];

const GroupTaskScreen = () => {
  const router = useRouter();
  const { groupTask } = useLocalSearchParams();

  const [filterType, setFilterType] = useState(filterAction[0]);
  const [subTasks, setSubTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Collect the task data from database
    const currentTask = mockTasks.find((task) => task.id === groupTask);
    // Collect all the subtasts of this group task from database

    let retrievedSubTasks = mockTasks.filter(
      (task) =>
        task.parent_task === groupTask
    );

    switch (filterType.value) {
      case "All":
        retrievedSubTasks = mockTasks.filter(
          (task) =>
            task.parent_task === groupTask
        );
        break;
      case "Active":
        retrievedSubTasks = mockTasks.filter(
          (task) =>
            task.parent_task === groupTask && (task.status === 'Incomplete' || task.status === 'Overdue')
        );
        break;
      case 'Done':
        retrievedSubTasks = mockTasks.filter(
          (task) =>
            task.parent_task === groupTask && task.status === 'Complete'
        );
        break;
      default:
        break;
    }

    setSubTasks(retrievedSubTasks);
  }, [filterType]);

  return (
    <View className="relative w-full flex-1 bg-primary-dark">
      <Image
        source={require("@/assets/images/checker_bg.png")}
        style={{ width: "100%", height: "100%" }}
        className="absolute"
      />
      <SafeAreaView className="px-4 flex items-center w-full">
        {/* Header Nav and overview */}
        <View className="flex-row justify-between items-center w-full">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={35} color="#fff" />
          </TouchableOpacity>
          <View className="px-6 py-2 rounded-[18px] bg-transparent border-white border-[1px]">
            <Text className="text-[20px] font-helvetica text-secondary-white">
              2/15
            </Text>
          </View>
        </View>

        <View className="mt-7 gap-7">
          <Text className=" font-helvetica text-[96px] tracking-widest text-secondary-white">
            TASKS
          </Text>

          <View className="flex-row gap-6">
            {filterAction.map((item, index) => (
              <TouchableOpacity
                onPress={() => setFilterType(item)}
                activeOpacity={1}
              >
                <Text
                  className={`text-[20px] uppercase tracking-widest font-helvetica ${
                    filterType.value === item.value
                      ? "text-secondary-white"
                      : "text-secondary-lightWhite"
                  }`}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <FlatList
          data={subTasks}
          renderItem={({ item }) => (
            <View>
              <Text>{item.title}</Text>
            </View>
          )}
        />
      </SafeAreaView>
      
      {/* CREATE SUB TASKS BUTTON */}
      <View className="absolute bottom-0 w-full px-4">
        <TouchableOpacity
          className=" bottom-8 w-full flex-row items-center justify-center gap-[4px]"
          activeOpacity={1}
          onPress={() => router.push("/addTask")}
        >
          <View className="flex-row p-8 bg-black rounded-l-[40px]">
            <Text className="font-helvetica text-[20px] uppercase text-secondary-white">
              Create new subtask
            </Text>
          </View>

          <View className="py-[19.5px] pl-[10px] pr-[19.5px] bg-black rounded-r-[40px] items-center justify-center">
            <Ionicons name="add" size={40} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GroupTaskScreen;
