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

import * as ImagePicker from "expo-image-picker"; // Import ImagePicker from expo-image-picker
import { updatePost } from "../Redux/post/postSlice";
import { setUser } from "../Redux/auth/authSlice";
import CloseIcon from "../assets/icon/close.png"; // Import the SVG icon
import { getDataAPI } from "../Redux/api";
import moment from "moment";
import Map2 from "../components/Map2";
import { useNavigation } from "@react-navigation/native";

const NewProfile = ({ route }) => {
  const { userId } = route.params;
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state
  const [registerError, setRegisterError] = useState(""); // Added registerError state

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        console.log(userId);
        const response = await getDataAPI(`/profile/${userId}`);
        setUserProfile(response);
        return response;
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);
  const navigation = useNavigation();
  return (
    <View className="w-full h-full bg-white ">
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View className="mt-1 relative">
          <Image
            source={{ uri: userProfile?.user?.image }}
            style={{ width: "100%", height: 300, resizeMode: "cover" }}
          />

          <ScrollView className="grid grid-rows-3 w-full h-[calc(100vh-350px)] p-1">
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
            <View className="mb-3 w-full h-[100px]">
              <Map2 setLocation={user?.location} />
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
                  <View>
                    <Text className="text-orange-600  text-[22px] font-bold capitalize">
                      {p.title}
                    </Text>
                    <Text className="text-gray-600 text-[16px] capitalize">
                      {p.details}
                    </Text>
                    <Text> {moment(p?.createdAt).fromNow()}</Text>
                  </View>
                </Pressable>
              ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default NewProfile;

const styles = StyleSheet.create({});
