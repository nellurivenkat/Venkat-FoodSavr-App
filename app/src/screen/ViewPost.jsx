import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost } from "../Redux/post/postSlice";

const ViewPost = ({ postId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSinglePost(postId));
  }, [dispatch]);

  const { post, error, loading } = useSelector((state) => state.post);
  console.log(post);
  return (
    <View>
      <View>{/* <Text>{post?.title}</Text> */}</View>
      {error && <Text>{error}</Text>}
    </View>
  );
};

export default ViewPost;

const styles = StyleSheet.create({});
