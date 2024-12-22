import { Ionicons } from '@expo/vector-icons';
import { Link, Stack, useRouter } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';

const Layout = () => {
  const router = useRouter();
  
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          // presentation: "modal",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-circle" size={28} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <Link href="/userModal/editUserModal">
              <Ionicons name="pencil" size={23} color="white" />
            </Link>
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
          // presentation: "modal",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={28} color="white" />
              {/* <Text className="text-white text-sm font-dmSansBold">Cancel</Text> */}
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
    </Stack>
  )
}

export default Layout