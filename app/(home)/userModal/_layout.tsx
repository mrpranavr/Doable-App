import { Ionicons } from '@expo/vector-icons';
import { Link, Stack, useRouter } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';
import { useState } from 'react';
import { DeleteAccountModal } from '@/components/DeleteAccountModal';
import { useClerk } from "@clerk/clerk-expo";

const Layout = () => {
  const router = useRouter();
  const { user, signOut } = useClerk();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      setIsLoading(true);
      await user?.delete();
      await signOut();
      router.push("/sign-up");
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
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
            headerRight: () => (
              <TouchableOpacity onPress={() => setShowDeleteModal(true)}>
                <Ionicons name="trash-outline" size={23} color="#FF4444" />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>

      <DeleteAccountModal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirmDelete={handleDeleteAccount}
        isLoading={isLoading}
      />
    </>
  )
}

export default Layout