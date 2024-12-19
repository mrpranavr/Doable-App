import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, Platform } from "react-native";
import React, { useState } from "react";
import { useClerk } from "@clerk/clerk-expo";
import CustomTextInput from "@/components/CustomTextInput";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';

const EditUserModal = () => {
  const { user } = useClerk();
  const router = useRouter();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [email, setEmail] = useState(
    user?.emailAddresses[0]?.emailAddress || ""
  );
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUri, setImageUri] = useState(user?.imageUrl || null);
  const [imageMimeType, setImageMimeType] = useState<string>('');

  const pickImage = async () => {
    try {
      // Request permissions based on platform
      if (Platform.OS !== 'web') {
        // For iOS, request photo library permissions
        if (Platform.OS === 'ios') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to change your profile picture.');
            return;
          }
        }
        // For Android, permissions are requested automatically
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const base64 = result.assets[0].base64;
        const mimeType = result.assets[0].mimeType;

        setImageUri(result.assets[0].uri);
        setImageMimeType(`data:${mimeType};base64,${base64}`);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      alert('Failed to pick image. Please try again.');
    }
  };

  const handleConfirmEdit = async () => {
    try {
      setIsLoading(true);
      
      if (!firstName.trim() || !lastName.trim()) {
        throw new Error("First name and last name are required");
      }

      // Update profile image if changed
      if (imageUri && imageUri !== user?.imageUrl) {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        console.log("Updating profile image", blob);
        await user?.setProfileImage({ file: blob})
      }

      // Update other user details
      await user?.update({
        firstName,
        lastName,
      });
      
      router.back();
    } catch (error: any) {
      if (error.message.includes("network") || error.message.includes("internet")) {
        alert("Unable to update profile due to network issues. Please check your connection and try again.");
      } else {
        alert(error.message || "An error occurred while updating profile");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="bg-primary-dark flex-1 items-center px-4 gap-2 justify-between pb-14">
      {isLoading && (
        <View className="absolute top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-primary-dark/80">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      <ScrollView className="w-full" alwaysBounceVertical={false}>
        <View>
          <Text className="font-dmSansBold text-secondary-white tracking-widest text-3xl text-center">
            Edit Profile ✏️
          </Text>
          <Text className="font-dmSansRegular text-secondary-white text-center tracking-widest mt-5">
            Update your profile information below.
          </Text>
        </View>

        <View className="w-full items-center mt-9 gap-5">
          {/* Profile Picture */}
          <TouchableOpacity 
            onPress={pickImage}
            className="relative"
            disabled={isLoading}
          >
            <View className="w-32 h-32 rounded-full bg-gray-300 items-center justify-center">
              {imageUri ? (
                <Image 
                  source={{ uri: imageUri }}
                  className="w-full h-full rounded-full"
                />
              ) : (
                <Text className="font-dmSansBold text-2xl text-primary-dark">
                  {firstName.charAt(0)}
                  {lastName ? lastName.charAt(0) : ""}
                </Text>
              )}
            </View>
            <View className="absolute bottom-0 right-0 bg-bold-green p-2 rounded-full">
              <Ionicons name="camera" size={20} color="#202020" />
            </View>
          </TouchableOpacity>

          <View className="w-full gap-4">
            <CustomTextInput
              type="default"
              placeholder="First Name"
              value={firstName}
              onChange={(value) => setFirstName(value as string)}
              hasError={false}
              editable={!isLoading}
            />

            <CustomTextInput
              type="default"
              placeholder="Last Name"
              value={lastName}
              onChange={(value) => setLastName(value as string)}
              hasError={false}
              editable={!isLoading}
            />

            <CustomTextInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(value) => setEmail(value as string)}
              hasError={false}
              editable={false}
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        className="w-full bg-bold-green rounded-full px-4 py-5 flex items-center justify-center"
        onPress={handleConfirmEdit}
        disabled={isLoading}
      >
        <Text className="font-dmSansBold font-bold text-base tracking-widest text-primary-dark">
          {isLoading ? "Updating..." : "Confirm Changes"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditUserModal;