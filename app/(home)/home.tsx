import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Vibration,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useAuth, useClerk, useUser } from "@clerk/clerk-expo";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {
  formatDateToDayDateMonth,
  getInitials,
  mapToTask,
} from "@/helper/helperFunction";
import { NavigationHeaders } from "@/constants/GlobalData";
import { mockTasks } from "@/constants/MockData";
import TaskCard from "@/components/TaskCard";
import { getSupabaseClient } from "@/utils/supabase";
import { Task } from "@/constants/Types";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DeleteTaskModal from "@/components/DeleteTaskModal";

type NavigationTextProps = {
  title: string;
  onPress: (title: string) => void;
  isSelected: boolean;
};

const NavigationText = ({
  title,
  onPress,
  isSelected,
}: NavigationTextProps) => {
  return (
    <TouchableOpacity onPress={() => onPress(title)}>
      <Text
        className={`${
          isSelected ? "text-secondary-white" : "text-secondary-lightWhite"
        } font-helvetica text-3xl uppercase tracking-widest`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  // CLERK COMPONENTS
  const { signOut } = useClerk();
  const { getToken, userId } = useAuth();
  const { isLoaded, isSignedIn, user } = useUser();
  // const client = getSupabaseClient()
  const [tasksData, setTasksData] = useState<Task[]>([]);
  const [selectedPage, setSelectedPage] = useState(NavigationHeaders[0].title);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(false);

  const [showErrorVerbiage, setShowErrorVerbiage] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setShowErrorVerbiage(false);
        setLoadingTasks(true);
        const supabase = await getSupabaseClient(getToken);
        const { data, error } = await supabase.from("Tasks").select("*"); // Replace 'tasks' with your table name

        if (error) {
          console.error("Error fetching tasks:", error);
          setShowErrorVerbiage(true);
          setTasksData([]);
        } else {
          console.log("Tasks fetched successfully:", data);

          let filteredData = data.map(mapToTask);
          console.log('filtered Data --> ', filteredData)
          switch (selectedPage) {
            case "Tasks":
              filteredData = filteredData.filter(
                (task: Task) => task.parent_task == null
              );
              break;
            case "Overdue":
              console.log();
              filteredData = filteredData.filter((task: Task) => {
                const taskEndDate = new Date(task.endDate);
                return taskEndDate < new Date();
              });
              break;
            case "Pending":
              filteredData = filteredData.filter((task: any) => {
                console.log(task.status === "Incomplete");
                return task.status == "Incomplete" || task.status == "Overdue";
              });
              break;
            default:
              break;
          }

          setTasksData(filteredData);
        }
      } catch (err) {
        setShowErrorVerbiage(true);
        console.error("Unexpected error:", err);
      } finally {
        // setLoading(false);
        setLoadingTasks(false);
      }
    };

    fetchTasks();
  }, [selectedPage]);

  if (!isLoaded) {
    // Oops issue component here
  } else {
  }

  // PAGE PROPERTIES HERE
  const navigationScrollRef = useRef<ScrollView>(null);
  const scrollRef = useRef<ScrollView>(null);

  const snapToItem = (index: number) => {
    if (navigationScrollRef.current) {
      // Adjust these values if needed for padding/margin
      const itemWidth = 100; // Approximate width of each item in the scroll view
      const spacing = 23; // Gap between items
      const offset = (itemWidth + spacing) * index; // Calculate horizontal offset
      navigationScrollRef.current.scrollTo({ x: offset, animated: true });
    }
  };

  const router = useRouter();

  const handleUserModalOpen = () => {
    router.push("/userModal");
  };

  const handleNavigationChange = (title: string) => {
    setSelectedPage(
      NavigationHeaders.find((header) => header.title === title)!.title
    );
  };

  const onDismiss = (task: Task) => {
    console.log("onDismiss tasks", task);
    setTaskToDelete(task);
    setShowDeleteModal(true);

    Vibration.vibrate(200);
  };

  const handleConfirmDelete = async () => {
    setIsLoading(true);
    // Implement delete task logic here
    // await onConfirmDelete();
    setIsLoading(false);
    handleCloseDeleteModal(); // Ensure modal is closed after deletion
  };

  const taskCardRefs = useRef<Map<string, any>>(new Map());

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setTaskToDelete(undefined);
    // Reset animation values for all TaskCards
    // taskCardRefs.current.forEach((ref) => {
    //   if (ref && ref.resetAnimationValues) {
    //     ref.resetAnimationValues();
    //   }
    // });
  };

  return (
    <View className="relative w-full flex-1 bg-primary-dark ">
      <Image
        source={require("@/assets/images/checker_bg.png")}
        style={{ width: "100%", height: "100%" }}
        className="absolute"
      />
      {loadingTasks && (
        <View className="absolute top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-primary-dark/80">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      {showDeleteModal && (
        <DeleteTaskModal
          onClose={handleCloseDeleteModal}
          isLoading={isLoading}
          onConfirmDelete={handleConfirmDelete}
          task={taskToDelete!}
        />
      )}
      <SafeAreaView className="px-4 flex items-center w-full">
        {/* User Avatar and add task button */}
        <View className="flex-row justify-between  items-center w-full">
          {user?.imageUrl ? (
            <TouchableOpacity
              onPress={handleUserModalOpen}
              className="bg-gray-300 rounded-full"
            >
              <Image
                source={{ uri: user?.imageUrl }}
                style={{ width: 52, height: 52 }}
                className="rounded-full"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="w-[52px] h-[52px] bg-bold-green rounded-full flex items-center justify-center"
              onPress={handleUserModalOpen}
            >
              <Text className="font-dmSans font-bold text-3xl">
                {getInitials(user?.firstName, user?.lastName)}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => router.push("/addTask")}>
            <Ionicons name="add-outline" size={42} color="white" />
          </TouchableOpacity>
        </View>

        {/* Top navigation section */}
        <View className="flex justify-start w-full mt-7 gap-3">
          <Text className="tracking-widest text-secondary-white uppercase font-dmSans">
            {formatDateToDayDateMonth()}
          </Text>
          <ScrollView
            ref={navigationScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              columnGap: 23,
            }}
            scrollEventThrottle={16}
            pagingEnabled
          >
            {NavigationHeaders.map((header, index) => (
              <NavigationText
                key={index}
                title={header.title}
                onPress={(title) => {
                  handleNavigationChange(title);
                  snapToItem(index);
                }}
                isSelected={header.title === selectedPage}
              />
            ))}
          </ScrollView>
        </View>

        {showErrorVerbiage && <Text>There was an error loading the tasks</Text>}

        {/* Group Tasks Section */}
        <View className="w-full mt-7">
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={{
              rowGap: 15,
              // flex: 1
              paddingBottom: 300,
            }}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
          >
            {(selectedPage === "Pending" ||
              selectedPage === "Overdue" ||
              selectedPage == "Tasks") && (
              <>
                {tasksData.filter((task) => task.type === "Group").length >
                  0 && (
                  <View className="w-full flex justify-center items-center">
                    <Text className="uppercase text-secondary-lightWhite font-helvetica tracking-wider text-sm">
                      Group Tasks (
                      {tasksData.filter((task) => task.type == "Group").length})
                    </Text>
                  </View>
                )}
                {tasksData
                  .filter((task) => task.type === "Group")
                  .map((task, index) => (
                    <TaskCard
                      simGesture={scrollRef}
                      onDismiss={onDismiss}
                      key={task.id}
                      task={task}
                    />
                  ))}

                {tasksData.filter((task) => task.type === "Task").length >
                  0 && (
                  <View className="w-full flex justify-center items-center">
                    <Text className="uppercase text-secondary-lightWhite font-helvetica tracking-wider text-sm">
                      Individual Tasks (
                      {tasksData.filter((task) => task.type === "Task").length})
                    </Text>
                  </View>
                )}
                {tasksData
                  .filter((task) => task.type === "Task")
                  .map((task, index) => (
                    <TaskCard
                      simGesture={scrollRef}
                      onDismiss={onDismiss}
                      key={task.id}
                      task={task}
                    />
                  ))}
              </>
            )}
            {/* {selectedPage === "Tasks" &&
              tasksData.map((task, index) => (
                <TaskCard
                  simGesture={scrollRef}
                  onDismiss={onDismiss}
                  key={task.id}
                  task={task}
                />
              ))} */}
          </ScrollView>
          {/* <FlatList
            data={tasksData}
            renderItem={({ item }) => <TaskCard task={item} />}
            keyExtractor={(item) => item.id}
            scrollEventThrottle={16}
            contentContainerStyle={{
              rowGap: 10,
              paddingBottom: 300,
            }}
            showsVerticalScrollIndicator={false}
          /> */}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
