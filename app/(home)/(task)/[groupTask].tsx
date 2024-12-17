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
import SubTaskCard from "@/components/subtaskCard";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";

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
  const [totalSubTasks, setTotalSubTasks] = useState(0);
  const [completedSubTasksCount, setCompletedSubTasksCount] = useState(0);

  const translateY = useSharedValue(0)
 
  useEffect(() => {
    // Collect the task data from database
    const currentTask = mockTasks.find((task) => task.id === groupTask);
    // Collect all the subtasts of this group task from database

    const allSubTasks = mockTasks.filter(
      (task) => task.parent_task === groupTask
    );
    setTotalSubTasks(allSubTasks.length)

    let dataToShow = allSubTasks

    const completedSubTasks = allSubTasks.filter((task) => task.status === 'Complete')
    setCompletedSubTasksCount(completedSubTasks.length)

    switch (filterType.value) {
      case "All":
        dataToShow = allSubTasks
        break;
      case "Active":
        dataToShow = allSubTasks.filter((task) => (task.status === "Incomplete" || task.status === "Overdue"))
        break;
      case "Done":
        dataToShow = allSubTasks.filter((task) => task.status === "Complete")
        break;
      default:
        break;
    }

    setSubTasks(dataToShow);
  }, [filterType]);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateY.value = event.contentOffset.y
  })

  return (
    <View className="relative w-full flex-1 bg-primary-dark">
      <Image
        source={require("@/assets/images/checker_bg.png")}
        style={{ width: "100%", height: "100%" }}
        className="absolute"
      />
      <SafeAreaView
        className="flex-1 items-center w-full"
        edges={["top", "left", "right"]}
      >
        {/* Header Nav and overview */}
        <View className="flex-row justify-between items-center w-full px-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={35} color="#fff" />
          </TouchableOpacity>
          <View className="px-6 py-2 rounded-[18px] bg-transparent border-white border-[1px]">
            <Text className="text-[20px] font-helvetica text-secondary-white">
              {completedSubTasksCount}/{totalSubTasks}
            </Text>
          </View>
        </View>

        <View className="mt-7 gap-7 px-4">
          <Text className=" font-helvetica text-[96px] tracking-widest text-secondary-white">
            TASKS
          </Text>

          <View className="flex-row gap-6">
            {filterAction.map((item, index) => (
              <TouchableOpacity
                onPress={() => setFilterType(item)}
                activeOpacity={1}
                key={index}
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

        <View className="w-full mt-7 flex-1">
          <Animated.FlatList
            data={subTasks}
            renderItem={({ item, index }) => <SubTaskCard task={item} translateY={translateY} index={index} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              // flex: 1,
              paddingTop: 50,
              paddingBottom: 140,
              // paddingTop: 50
              justifyContent: 'flex-end',
              // flexDirection: 'column',
              flexGrow: 1
            }}
            bounces={false}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>

      {/* CREATE SUB TASKS BUTTON */}
      <View className="absolute bottom-4 w-full px-4">
        <TouchableOpacity
          className=" bottom-0 w-full flex-row items-center justify-center gap-[4px]"
          activeOpacity={1}
          onPress={() => router.push("/addTask")}
        >
          <View className="flex-row p-8 bg-black rounded-l-[40px] flex-1">
            <Text className="font-helvetica text-[20px] uppercase text-secondary-white">
              Create new subtask
            </Text>
          </View>

          <View className=" py-[19.5px] pl-[10px] pr-[19.5px] bg-black rounded-r-[40px] items-center justify-center">
            <Ionicons name="add" size={40} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GroupTaskScreen;
