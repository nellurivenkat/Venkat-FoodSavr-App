import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../Redux/profile/profileSlice";
import Distance from "../function/Distance";
import { getAllPosts } from "../Redux/post/postSlice";
import ViewPost from "./ViewPost";
import UserProfile from "./UserProfile";
import MakeRequest from "./MakeRequest";
import EachPost from "./EachPost";
import Spinner from "../assets/icon/spinner.svg";
import NewProfile from "./NewProfile";
import AntIcon from "react-native-vector-icons/AntDesign";
import ImageSlide from "../assets/images/img7.png";
import { useNavigation } from "@react-navigation/native";

const Feed = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const fetchAllPost = () => {
    dispatch(getAllPosts());
  };
  useEffect(() => {
    fetchAllPost();
  }, [dispatch]);

  const { posts } = useSelector((state) => state.post);
  const loadingPost = useSelector((state) => state.post.loading);

  const { user } = useSelector((state) => state.auth);
  const { allUsers, loading } = useSelector((state) => state.profile);

  // Filter users based on userType === 'restaurant'
  const restaurantUsers = allUsers.filter(
    (user) => user?.accountType === "restaurant"
  );

  const getPartOfDay = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 6 && hour < 12) {
      return "Good morning";
    } else if (hour >= 12 && hour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  const [showUser, setShowUser] = useState(false);
  const [clickUser, setClickUser] = useState(null);

  const navigation = useNavigation();
  const partOfDay = getPartOfDay();
  return (
    <ScrollView className="bg-white">
      {showUser && <NewProfile userId={clickUser} setShowUser={setShowUser} />}
      <View className="mt-16 px-2">
        <View className=" pb-3 flex justify-between items-center flex-row pr-5">
          <View>
            <Text className="text-[16px] text-zinc-700 font-light">
              {partOfDay}
            </Text>
            <Text className="text-5 text-[25px] text-zinc-400 font-extralight">
              Welcome
              <Text className="font-normal text-orange-900">
                {""} {user?.firstName}.
              </Text>
            </Text>
          </View>
          <Pressable
            onPress={() => {
              fetchAllPost();
            }}
            className="relative"
          >
            <View className="w-1 h-1 bg-red-400 rounded-full absolute right-0"></View>
            <Text>
              <AntIcon name="reload1" size={24} color="green" spin={loading} />
            </Text>
          </Pressable>
        </View>
        <View className="w-screen flex items-center mt-4 px-2">
          <View className="flex flex-row w-full items-center broder border-gray-300 bg-zinc-100 h-[100px] pb-4 rounded-xl gap-4">
            <View className="w-[50%]">
              <Text className="text-orange-600 font-bold text-[15px]">
                Tips on how to reduce food waste!
              </Text>
              <Text className="text-gray-600  text-[11px]">
                Eating certain foods may help you reduce the amount of food
                you’re...
              </Text>
            </View>
            <View className="w-[50%] overflow-hidden">
              <Image
                source={ImageSlide}
                className="w-[160px] rounded-xl h-[90px]"
              />
            </View>
          </View>
        </View>
        <View className="mt-4">
          <Text className="text-orange-600 text-[20px] font-light ">
            Recommended Restaurants
          </Text>
          <Text className="text-gray-500 mb-3  text-[11px]">
            Discover nearby restaurants: explore menu and find delicious options
            nearby.
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="gap-2"
          >
            {restaurantUsers.map((restaurant) => (
              <Pressable
                onPress={() => {
                  navigation.navigate("profile", { userId: restaurant?._id });
                }}
                key={restaurant?._id}
                className="rounded-xl overflow-hidden bg-white border border-zinc-100"
              >
                <Image
                  source={{
                    uri: restaurant?.image,
                  }}
                  style={{ width: 170, height: 190, resizeMode: "cover" }}
                />
                <Text className="pl-2 font-bold text-orange-500 py-2">
                  {restaurant?.firstName} {restaurant?.firstName}
                </Text>
                <View className="pb-3 pl-2 py-3 border-t border-gray-100">
                  <Distance
                    to={restaurant?.location}
                    userLocation={user?.location}
                  />
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* show All post */}
        <View>
          <Text className="text-orange-600 text-[20px] font-light mt-5">
            Listings near you
          </Text>
          <Text className="text-gray-500 mb-3  text-[11px]">
            Find nearby listings near you: explore local options.
          </Text>
        </View>
        {loadingPost ? (
          <Text className="text-center mt-5 mb-20 text-gray-400">
            Loading...
          </Text>
        ) : (
          <View style={styles.container}>
            <View style={styles.post} className="grid">
              {posts &&
                posts.map((post, i) => (
                  <EachPost key={i} post={post} user={user} />
                ))}
            </View>
          </View>
        )}
        <Text className="text-gray-500 text-center text-[12px]">
          --You’ve reached the end--
        </Text>

        <Text className="text-gray-300 text-center mt-2 mb-2">
          Copy right 2024 project.
        </Text>
      </View>
    </ScrollView>
  );
};

export default Feed;

const styles = StyleSheet.create({});
