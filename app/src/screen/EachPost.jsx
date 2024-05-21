import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../Redux/profile/profileSlice";
import Distance from "../function/Distance";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

import MakeRequest from "./MakeRequest";

function EachPost({ post, user }) {
  const [selsectPost, setSelectPost] = useState(null);
  console.log(post);

  const navigation = useNavigation();
  const [showPost, setShowPost] = useState(false);
  return (
    <View
      key={post._id}
      className="mb-3 rounded-[15px] shadow  bg-white w-full border overflow-hidden border-gray-200"
    >
      <Pressable
        onPress={() => {
          navigation.navigate("viewPost", { postId: post._id });
        }}
        className=" overflow-hidden items-center  w-full relative"
      >
        <View className="bg-gray-100 w-full">
          <Image
            source={{ uri: post.media[0] }}
            className="rounded-tl-lg w-[100%] h-[200px] object-cover"
          />
          <View className=" absolute top-3 right-3 bg-gray-800 p-2 rounded">
            <Text className="text-right font-bold text-[20px] text-white">
              € {post.price}.00
            </Text>
          </View>
        </View>

        <View className="w-full px-4 py-2">
          <Text className="font-bold text-orange-500 text-[20px] mb-1">
            {post.title}{" "}
            <Text className="text-gray-600 text-[11px]">
              . {moment(post?.createdAt).fromNow()}
            </Text>
          </Text>
          <Text className="text-gray-800 text-[12px] mb-2 mt-1">
            {post.details}
          </Text>
          <View className="">
            <Distance to={post?.location} userLocation={user?.location} />
          </View>
          <Text className="text-red-400 text-[12px] ">{post.type}</Text>
        </View>
      </Pressable>
      {/* {showPost && <MakeRequest setShowPost={setShowPost} data={post} />} */}
    </View>
  );
}

export default EachPost;
