import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useRef, useState } from "react";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {formatDateToDayDateMonth, getInitials } from "@/helper/helperFunction";
import { NavigationHeaders } from "@/constants/GlobalData";
import { mockGroupTasks } from "@/constants/MockData";
import TaskCard from "@/components/TaskCard";

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
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    // Oops issue component here
  } else {
  }

  // PAGE PROPERTIES HERE
  const [selectedPage, setSelectedPage] = useState(NavigationHeaders[0].title);
  const navigationScrollRef = useRef<ScrollView>(null);


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
    console.log(title);
    setSelectedPage(
      NavigationHeaders.find((header) => header.title === title)!.title
    );

  };

  return (
    <View className="relative w-full flex-1 bg-primary-dark ">
      <Image
        source={require("@/assets/images/checker_bg.png")}
        style={{ width: "100%", height: "100%" }}
        className="absolute"
      />
      <SafeAreaView className="px-4 flex items-center w-full">
        {/* User Avatar and add task button */}
        <View className="flex-row justify-between items-center w-full">
          {user?.hasImage ? (
            <TouchableOpacity onPress={handleUserModalOpen}>
              <Image
                source={{ uri: user?.imageUrl }}
                style={{ width: 52 }}
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
                  snapToItem(index)
                }}
                isSelected={header.title === selectedPage}
              />
            ))}
          </ScrollView>
        </View>

        {/* Group Tasks Section */}
        <View className="w-full mt-7">
          {/* <ScrollView
            contentContainerStyle={{
              rowGap: 10,
              // flex: 1
            }}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
          >
            {
              mockGroupTasks.filter((task) => task.type === 'Group').map((task, index) => (
                <TaskCard key={task.id} task={task} />
              ))
            }
          </ScrollView> */}
          <FlatList 
            data={mockGroupTasks.filter((task) => task.type === 'Group')}
            renderItem={({item}) => <TaskCard task={item} />}
            keyExtractor={(item) => item.id}
            scrollEventThrottle={16}
            contentContainerStyle={{
              rowGap: 10,
              paddingBottom: 300
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
