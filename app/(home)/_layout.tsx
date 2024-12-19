import { Ionicons } from "@expo/vector-icons";
import { Slot, useRouter } from "expo-router";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function Layout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen
        name="userModal"
        options={{
          headerShown: true,
          presentation: "modal",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-circle" size={28} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/editUserModal")}>
              <Ionicons name="pencil" size={23} color="white" />
            </TouchableOpacity>
          ),
          title: "",
          headerShadowVisible: false,
          headerTitleStyle: {
            color: "white",
            fontFamily: "DMSans-Bold",
            fontSize: 20,
          },
          headerStyle: {
            backgroundColor: "#202020",
          },
        }}
      />
      <Stack.Screen
        name="editUserModal"
        options={{
          headerShown: true,
          presentation: "modal",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-circle" size={28} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="pencil" size={23} color="white" />
            </TouchableOpacity>
          ),
          title: "",
          headerShadowVisible: false,
          headerTitleStyle: {
            color: "white",
            fontFamily: "DMSans-Bold",
            fontSize: 20,
          },
          headerStyle: {
            backgroundColor: "#202020",
          },
        }}
      />
      <Stack.Screen
        name="(task)/[groupTask]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(task)/taskDetail/[taskId]"
        options={{ headerShown: false, gestureEnabled: true }}
      />
      <Stack.Screen
        name="addTask"
        options={{
          presentation: "modal",
          headerShown: true,
          title: "",
          headerShadowVisible: false,
          headerTitleStyle: {
            color: "white",
            fontFamily: "DMSans-Bold",
            fontSize: 20,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-circle" size={28} color="white" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: "#202020",
          },
          gestureEnabled: false,
        }}
      />
      {/* <Stack.Screen name="(task)/addTask" options={{ headerShown: false, presentation: 'modal'}} /> */}
    </Stack>
  );
}
