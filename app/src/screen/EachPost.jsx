import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../Redux/profile/profileSlice";
import Distance from "../function/Distance";

import MakeRequest from "./MakeRequest";

function EachPost({ post, user }) {
      const [selsectPost, setSelectPost] = useState(null);
      // console.log(posts);

      const [showPost, setShowPost] = useState(false);
  return (
    <View
      key={post._id}
      className="mb-3 rounded-[15px] shadow  bg-white w-full"
    >
      <Pressable
        onPress={() => {
          setSelectPost(post._id);
          setShowPost(true);
        }}
        className=" overflow-hidden items-center relative w-full"
      >
        <View className="bg-gray-100 w-full">
          <Image
            source={{ uri: post.media[0] }}
            className="rounded-tl-lg w-[100%] h-[200px] object-cover"
          />
        </View>
        <View className="w-full px-4 py-2">
          <Text className="font-bold text-orange-500 text-[20px] mb-1">
            {post.title}
          </Text>
          <Text className="text-gray-800 text-[12px] mb-2 mt-1">
            {post.details}
          </Text>
          <View className="">
            <Distance to={post?.location} userLocation={user?.location} />
          </View>
          <Text className="text-red-400 text-[12px] ">{post.type}</Text>
          <View className="w-full">
            <Text className="text-right font-bold text-[20px]">
              € {post.price}
            </Text>
          </View>
        </View>
      </Pressable>
      {showPost && <MakeRequest setShowPost={setShowPost} data={post} />}
    </View>
  );
}

export default EachPost;
