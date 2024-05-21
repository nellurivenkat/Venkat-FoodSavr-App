import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUserProfile, getUserProfile } from "../Redux/profile/profileSlice";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Pressable,
  ScrollView,
} from "react-native"; // Corrected import statement
import Map2 from "../components/Map2";
import moment from "moment";
import * as ImagePicker from "expo-image-picker"; // Import ImagePicker from expo-image-picker
import { updatePost } from "../Redux/post/postSlice";
import { logoutUser, setUser } from "../Redux/auth/authSlice";
import CloseIcon from "../assets/icon/close.png"; // Import the SVG icon
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import AntIcon from "react-native-vector-icons/AntDesign";
import SignOut from "./SignOut";

const UserProfile = ({ userId }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state
  const [registerError, setRegisterError] = useState(""); // Added registerError state

  const [showSignOut, setShowSignOut] = useState(false);
  useEffect(() => {
    dispatch(getUserProfile(userId));
  }, [dispatch]);

  console.log("userID", userId);

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

          console.log("Loading............................");
          console.log(imageUrl);
          if (imageUrl) {
            const cuseeUser = userProfile.user;
            const userData = { ...cuseeUser, image: imageUrl };
            console.log("userDate ...........................", userData);
            dispatch(editUserProfile(userData));
            dispatch(setUser(userData));
            await AsyncStorage.setItem("user", JSON.stringify(userData));

            // Set loading to false after image upload
          }
          setLoading(false);
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setRegisterError("Error uploading image. Please try again.");
      setLoading(false); // Set loading to false on error
    }
  };
  console.log(userProfile);
  const closeSignOut = () => {
    setShowSignOut(false);
  };
  const navigation = useNavigation();
  return (
    <View className="w-full bg-white h-screen ">
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

      <View className="relative w-full  ">
        <Image
          source={{ uri: userProfile?.user?.image }}
          style={{ width: "100%", height: 300, resizeMode: "cover" }}
          className="rounded-xl bg-gray-400"
        />

        <View className="absolute top-10 right-3 bg-orange-500 rounded-full p-2">
          <Pressable onPress={uploadImage}>
            <Text className="text-white">Change Profile Image</Text>
          </Pressable>
        </View>
        {!showSignOut && (
          <Pressable
            onPress={() => {
              setShowSignOut(true);
            }}
            className="bg-orange-600 p-2 rounded w-[40px] absolute bottom-[-40px] right-2 z-50"
          >
            <Text className="text-center text-white">
              <AntIcon name="logout" size={20} color="white" />
            </Text>
          </Pressable>
        )}
      </View>

      <ScrollView className="grid grid-rows-3 w-full h-[calc(100vh-350px)] p-1 z-1">
        <View className=" p-2">
          <Text className="mt-1 font-bold uppercase text-[14px] ">
            {userProfile?.user?.accountType}
          </Text>
          <Text className="text-orange-600 text-[25px] font-bold ">
            {userProfile?.user?.firstName} {userProfile?.user?.lastName}
          </Text>
          <Text className="text-gray-500 mb-1  text-[11px]">
            {userProfile?.user?.bio}
          </Text>
        </View>
        <View className="mt-2 px-4 bg-gray-100 py-3">
          <Text className="">Contact Info</Text>
          <Text className="mt-2  text-[16px] capitalize">
            <Text className="font-bold">Email: </Text>{" "}
            {userProfile?.user?.email}
          </Text>
          <Text className="mt-1 capitalize text-[16px] ">
            <Text className="font-bold">Phone Number: </Text>{" "}
            {userProfile?.user?.phoneNumber}
          </Text>
        </View>
        <Text className=" text-[19px] text-gray-500 font-light pb-3">
          These are the post this user has made.
        </Text>
        {userProfile &&
          userProfile.post &&
          userProfile.post.map((p) => (
            <Pressable
              key={p._id}
              className="mt-2 mb-3  flex flex-row items-end  rounded-xl overflow-hidden border border-gray-100 gap-2"
              onPress={() => {
                navigation.navigate("viewPost", { postId: p._id });
              }}
            >
              {p.media && p.media.length > 0 && (
                <Image
                  source={{ uri: p.media[0] }}
                  className="w-[90px] h-[90px] object-cover rounded"
                />
              )}
              <View className="pb-2 pr-3">
                <Text className="text-orange-600  text-[22px] font-bold capitalize">
                  {p.title}
                </Text>
                <Text className="text-gray-400 text-[11px] capitalize">
                  {p.details}
                </Text>
                <Text className="text-gray-400 text-[9px]">
                  {moment(p?.createdAt).fromNow()}
                </Text>
              </View>
            </Pressable>
          ))}
      </ScrollView>

      {loading && <Text>Uploading Profile...</Text>}
      {registerError !== "" && <Text>{registerError}</Text>}

      {showSignOut && <SignOut closeSignOut={closeSignOut} />}
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({});
