import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Linking,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { deleteDataAPI, getDataAPI } from "../Redux/api";
import { useSelector } from "react-redux";
import Distance from "../function/Distance";
import Map2 from "../components/Map2";
import { useNavigation } from "@react-navigation/native";
import DeleteSuccrss from "./DeleteSuccrss";

const ViewPost = ({ route }) => {
  const { postId } = route.params;
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

  const navigation = useNavigation();
  const fetchPost = async () => {
    try {
      setError(null);
      setLoading(true);
      const res = await getDataAPI(`/posts/${postId}`);
      setPost(res.post); // Assuming the API returns the data in a 'data' property
      setUser(res.user);
    } catch (error) {
      console.error(error);
      setError("Error fetching post.");
    } finally {
      setLoading(false);
    }
  };

  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchPost();
  }, [postId]); // Added postId as a dependency

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return (
      <View className="flex w-screen h-screen items-center justify-center">
        <Text className="text-red-500 text-center">{error}</Text>
        <Pressable
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Text className="mt-2 text-blue-400">Go back Home</Text>
        </Pressable>
      </View>
    ); // Displaying the error message
  }
  const handlePress = () => {
    const phoneNumber = user?.phoneNumber;
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleDeletePost = async () => {
    try {
      setLoading(true);
      await deleteDataAPI(`post/${post?._id}`);
      navigation.navigate("deleted");
    } catch (error) {
      setError("Error Deleting user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} className="bg-white relative">
      <Image source={{ uri: post?.media[0] }} style={styles.image} />
      <Text className="text-[20px] font-light mt-1 absolute top-[50px] bg-gray-950 text-white p-2 rounded left-3">
        € {post?.price}.00
      </Text>
      <View style={styles.content}>
        <Pressable
          className="flex flex-row items-center gap-3 "
          onPress={() => {
            navigation.navigate("Profile", { userId: user?.id });
          }}
        >
          <Image
            source={{ uri: user?.image }}
            className="w-[50px] h-[50px] rounded-full"
          />

          <View>
            <Text className=" capitalize text-[18px] font-light ">
              {user?.firstName} {user?.lastName}
            </Text>
            <Text style={styles.title} className="font-bold text-orange-600">
              {post?.title}
            </Text>
            <Distance
              to={post?.location}
              userLocation={currentUser?.location}
            />
          </View>
        </Pressable>
        {/* <View className="border  border-gray-100 mt-2"></View> */}

        <Text className="font-light text-gray-700 text-[18px] mt-2">
          Description :
        </Text>
        <Text className="mt-1">{post?.details}</Text>
      </View>
      <Text className="p-3 text-[16px] font-bold ">Location</Text>
      <View className="w-full h-[200px]">
        <Map2 setLocation={post.location} />
      </View>
      <View className="p-2 flex flex-row gap-3 items-center justify-center">
        {currentUser._id !== user._id ? (
          <>
            <Pressable
              className="bg-orange-500 w-[45%] p-4  rounded mt-4 "
              onPress={() =>
                navigation.navigate("chat", {
                  userId: user?._id,
                  currentUserId: currentUser?._id,
                })
              }
            >
              <Text className="text-white text-center">Message Seller</Text>
            </Pressable>
            <Pressable
              className="bg-orange-600 w-[45%] p-4  rounded mt-4"
              onPress={handlePress}
            >
              <Text className="text-white text-center">Contact Seller</Text>
            </Pressable>
          </>
        ) : (
          <Pressable
            className="bg-orange-500 w-full p-4  rounded  mt-5 "
            onPress={() => {
              handleDeletePost();
            }}
          >
            <Text className="text-white text-center">Delete Post</Text>
          </Pressable>
        )}
      </View>
      {showDelete && <DeleteSuccrss />}
    </ScrollView>
  );
};

export default ViewPost;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 350,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",

    textTransform: "uppercase",
  },
  // Add any additional styles you need here
});
