import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const DeleteSuccrss = () => {
    const navigation = useNavigation()
  return (
    <View className="flex  h-screen w-screen items-center justify-center p-4  absolute top-0 left-0">
      <View className="w-full h-[200px] rounded-xl bg-white flex flex-col items-center justify-center">
        <Image
          source={{
            uri: "https://th.bing.com/th?id=OIP.c0fNDjlEjTOz22FQl4cfLwAAAA&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
          }}
          className="rounded-xl w-[70px] h-[70px] object-cover"
        />
        <Text className="text-center text-green-500 text-[20px]">
          Post Deleted
        </Text>
        <Text>Your post has been deleted successfully.</Text>
        <Pressable className="mt-4" onPress={() => {navigation.navigate("Home")}}>
            <Text className="text-blue-500">Go Back Home</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default DeleteSuccrss;

const styles = StyleSheet.create({});
