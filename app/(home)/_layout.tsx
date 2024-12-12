import { Ionicons } from "@expo/vector-icons";
import { Slot, useRouter } from "expo-router";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function Layout() {

  const router = useRouter()

  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="userModal" options={{ headerShown: false, presentation: 'modal' }} />
      <Stack.Screen name="addTask" 
        options={{
          presentation: "modal",
          headerShown: true,
          title: "",
          headerShadowVisible: false,
          headerTitleStyle: {
            color: 'white',
            fontFamily: 'DMSans-Bold',
            fontSize: 20
            
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
            >
              <Ionicons name="close-circle" size={28} color='white' />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#202020'
          },
          gestureEnabled: false
        }}
      />
      {/* <Stack.Screen name="(task)/addTask" options={{ headerShown: false, presentation: 'modal'}} /> */}
    </Stack>
  );
}
