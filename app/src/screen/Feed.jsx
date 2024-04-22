import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../Redux/profile/profileSlice";
import Distance from "../function/Distance";
import { getAllPosts } from "../Redux/post/postSlice";
import { ScrollView } from "react-native-gesture-handler";
import ViewPost from "./ViewPost";
import UserProfile from "./UserProfile";
import MakeRequest from "./MakeRequest";
import EachPost from "./EachPost";

const Feed = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const { posts } = useSelector((state) => state.post);
  const loadingPost = useSelector((state) => state.post.loading);

  const { user } = useSelector((state) => state.auth);
  const { allUsers, loading } = useSelector((state) => state.profile);

  // Filter users based on userType === 'restaurant'
  const restaurantUsers = allUsers.filter(
    (user) => user.accountType === "restaurant"
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
  const partOfDay = getPartOfDay();
  return (
    <ScrollView>
      {showUser && <NewProfile userId={clickUser} setShowUser={setShowUser} />}
      <View className="mt-16 px-2">
        <View className=" pb-3">
          <Text className="text-[18px] text-gray-700 font-light">
            {partOfDay}
          </Text>
          <Text className="text-5 text-[25px] text-gray-400">
            Welcome
            <Text className="font-bold text-orange-600">{user.firstName}.</Text>
          </Text>
        </View>
        <View className="w-screen flex items-center mt-4 px-2">
          <View className="flex flex-row w-full broder border-gray-300 bg-white p-2 pb-5 rounded-xl gap-4">
            <View className="w-[50%]">
              <Text className="text-orange-600 font-bold text-[15px]">
                Tips on how to reduce food waste!
              </Text>
              <Text className="text-gray-600  text-[11px]">
                Eating certain foods may help you reduce the amount of food
                you’re...
              </Text>
            </View>
            <View className="w-[50%]">
              <Text>kkkk</Text>
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
                  setClickUser(restaurant._id);
                  setShowUser(true);
                }}
                key={restaurant._id}
                className="rounded-xl overflow-hidden bg-white"
              >
                <Image
                  source={{
                    uri: restaurant.image,
                  }}
                  style={{ width: 200, height: 150, resizeMode: "cover" }}
                />
                <Text className="pl-2 font-bold text-orange-500 py-2">
                  {restaurant.firstName} {restaurant.firstName}
                </Text>
                <View className="pb-3 pl-2 py-2 border-t border-gray-100">
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
          <Text>Loading..."</Text>
        ) : (
          <>
            {posts && posts.map((post) => <EachPost post={post} user={user} />)}
          </>
        )}

        <Text className="text-gray-500 text-center mt-2 mb-2">
          Copy right 2024 project.
        </Text>
      </View>
    </ScrollView>
  );
};

export default Feed;

const styles = StyleSheet.create({});
