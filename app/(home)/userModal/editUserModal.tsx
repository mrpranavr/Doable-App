import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useClerk } from "@clerk/clerk-expo";
import CustomTextInput from "@/components/CustomTextInput";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

// Define a custom type for React Native file structure
interface RNFile {
  name: string;
  type: string;
  uri: string;
}

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
  const [imageMimeType, setImageMimeType] = useState<string>("");

  const pickImage = async () => {
    try {
      // Request permissions based on platform
      if (Platform.OS !== 'web') {
        // For iOS
        if (Platform.OS === 'ios') {
          const { status: iosStatus } = 
            await ImagePicker.requestMediaLibraryPermissionsAsync();
          
          if (iosStatus !== 'granted') {
            alert('Sorry, we need camera roll permissions to change your profile picture.');
            return null;
          }
        }
        // For Android
        else if (Platform.OS === 'android') {
          const { status: androidStatus } = 
            await ImagePicker.requestMediaLibraryPermissionsAsync();
          
          if (androidStatus !== 'granted') {
            alert('Sorry, we need storage permissions to change your profile picture.');
            return null;
          }
  
          // Additional permission for Android 13+ (PHOTO_LIBRARY)
          const { status: photoStatus } = 
            await ImagePicker.getMediaLibraryPermissionsAsync();
          
          if (photoStatus !== 'granted') {
            const { status: newPhotoStatus } = 
              await ImagePicker.requestMediaLibraryPermissionsAsync();
            
            if (newPhotoStatus !== 'granted') {
              alert('Sorry, we need photo library permissions to change your profile picture.');
              return null;
            }
          }
        }
      }
  
      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
        base64: true,
        // Android specific options
        exif: false, // Reduces image data size
        allowsMultipleSelection: false,
      });
  
      if (!result.canceled && result.assets && result.assets[0]) {
        // Handle successful image selection
        setImageUri(result.assets[0].uri);
        return result.assets[0];
      }
  
      return null;
    } catch (error) {
      console.error('Error picking image:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Detailed error:', errorMessage);
      alert('Failed to pick image. Please try again.');
      return null;
    }
  };

  const prepareImageForClerk = async (uri: string) => {
    try {
      // Read the image file
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      // Create the File-like object that Clerk expects
      const imageFile: RNFile = {
        name: 'profile-image.jpg',
        type: 'image/jpeg',
        uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
      };
  
      return imageFile;
    } catch (error) {
      console.error('Error preparing image:', error);
      throw new Error('Failed to prepare image for upload');
    }
  };

  const handleConfirmEdit = async () => {
    try {
      setIsLoading(true);

      // Validate required fields
      if (!firstName?.trim() || !lastName?.trim()) {
        throw new Error("First name and last name are required");
      }

      // Update profile image if changed and valid
      if (imageUri && imageUri !== user?.imageUrl && user) {
      try {
        console.log('Starting image upload process...');
        
        // Get the prepared image file
        const imageFile = await prepareImageForClerk(imageUri);
        console.log('Image file prepared:', imageFile);

        // Upload to Clerk
        await user.setProfileImage({ 
          file: imageFile as any
        });
        
        console.log('Profile image updated successfully');
      } catch (imageError) {
        console.error('Image upload error:', imageError);
        throw new Error("Failed to update profile image. Please try again.");
      }
    }


      // Update user details if user exists
      if (user) {
        await user.update({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
        });
      } else {
        throw new Error("User not found");
      }

      router.back();
    } catch (error: any) {
      const errorMessage =
        error.message || "An error occurred while updating profile";

      if (
        errorMessage.toLowerCase().includes("network") ||
        errorMessage.toLowerCase().includes("internet")
      ) {
        alert(
          "Unable to update profile due to network issues. Please check your connection and try again."
        );
      } else {
        alert(errorMessage);
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
