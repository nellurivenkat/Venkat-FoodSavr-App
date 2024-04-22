import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUserProfile, getUserProfile } from "../Redux/profile/profileSlice";
import { StyleSheet, Text, View, Button, Image, Pressable } from "react-native"; // Corrected import statement

import * as ImagePicker from "expo-image-picker"; // Import ImagePicker from expo-image-picker
import { updatePost } from "../Redux/post/postSlice";
import { logoutUser, setUser } from "../Redux/auth/authSlice";
import { ScrollView } from "react-native-gesture-handler";
import CloseIcon from "../assets/icon/close.png"; // Import the SVG icon

const UserProfile = ({ userId, setShowUser }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state
  const [registerError, setRegisterError] = useState(""); // Added registerError state

  useEffect(() => {
    dispatch(getUserProfile(userId));
  }, [dispatch]);

  const { userProfile, error } = useSelector((state) => state.profile);

  const uploadImage = async () => {
    try {
      setLoading(true);
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        setLoading(false); // Set loading to false
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.assets[0].uri);
        setRegisterError(""); // Clear previous error

        let imageUrl = null;
        if (image) {
          const formData = new FormData();
          formData.append("file", {
            uri: image,
            name: "image.jpg",
            type: "image/jpg",
          });
          const cloudName = "dd6wbwlw9";
          const uploadPreset = "jmro2et8";

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload?upload_preset=${uploadPreset}`,
            {
              method: "POST",
              body: formData,
            }
          );
          const data = await response.json();
          console.log(data);
          imageUrl = data.secure_url;
        }
        console.log(imageUrl);

        const userData = { ...userProfile, image: imageUrl };

        dispatch(editUserProfile(userData));
        dispatch(setUser(userData));
        setLoading(false); // Set loading to false after image upload
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setRegisterError("Error uploading image. Please try again.");
      setLoading(false); // Set loading to false on error
    }
  };
  console.log(userProfile);

  return (
    <View className="w-full h-full  ">
      {/* {user._id !== userId && (
        <View className="">
          <Pressable
            onPress={() => setShowUser(false)}
            className="bg-orange-600 w-full text-center p-3 pt-10"
          >
            <Text className="text-white text-center">Close</Text>
          </Pressable>
        </View>
      )} */}

      <Image
        source={{ uri: userProfile?.user?.image }}
        style={{ width: "100%", height: 300, resizeMode: "cover" }}
      />

      {userId === userProfile?.user?._id && (
        <Button title="Change Image+" onPress={uploadImage} />
      )}

      <View className="mt-4 px-4">
        <Text className="text-orange-600 text-[20px] font-light ">
          {userProfile?.user?.firstName} {userProfile?.user?.lastName}
        </Text>
        <Text className="text-gray-500 mb-1  text-[11px]">
          Discover nearby restaurants: explore menu and find delicious options
          nearby.
        </Text>
        <Text className="mt-2 font-bold text-blue-600 text-[16px]">
          {userProfile?.user?.email}
        </Text>
        <Text className="mt-1 font-bold uppercase text-[16px] ">
          {userProfile?.user?.phoneNumber}
        </Text>
        <Text className="mt-1 font-bold uppercase text-[16px]">
          {userProfile?.user?.accountType}
        </Text>
      </View>

      <ScrollView className="grid grid-cols-3 w-full">
        {userProfile &&
          userProfile.post &&
          userProfile.post.map((p) => (
            <View key={p._id} className="mt-2 mb-3 rounded">
              {p.media && p.media.length > 0 && (
                <Image
                  source={{ uri: p.media[0] }}
                  style={{ width: "100%", height: 300, resizeMode: "cover" }}
                />
              )}
            </View>
          ))}
        <View></View>
        <Pressable
          className="w-full bg-orange-600 p-3 rounded-full mt-3"
          onPress={() => {
            dispatch(logoutUser());
          }}
        >
          <Text className="text-white">Sign Out</Text>
        </Pressable>
      </ScrollView>

      {loading && <Text>Loading...</Text>}
      {registerError !== "" && <Text>{registerError}</Text>}
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({});
