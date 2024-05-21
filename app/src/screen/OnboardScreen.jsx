import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
const OnboardScreen = ({ navigation }) => {
  return (
    <View className="w-screen h-screen relative">
      <Image
        className="absolute w-96 h-96 left-[-100] top-0"
        style={{ objectFit: "contain" }}
        source={{
          uri: "https://res.cloudinary.com/dd6wbwlw9/image/upload/v1712125787/vacant/zfoje7lm9hfvjnzskty8.png",
        }}
      />
      <Image
        className="absolute w-96 h-96 right-[-90] bottom-0"
        style={{ objectFit: "contain" }}
        source={{
          uri: "https://res.cloudinary.com/dd6wbwlw9/image/upload/v1712125786/vacant/zh9rodgqx4iq6oyohgdp.png",
        }}
      />
      {/* main content */}
      <View className="flex w-screen h-screen justify-center items-center">
        <Text className="text-orange-600 text-5xl font-black">FoodSavr</Text>
        <Text className="text-[18px]">Transforming Waste into Taste!</Text>
        <Text className="px-3 text-center text-gray-500">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate pariatur dicta laboriosam assumenda illum similique dolore in voluptatem corporis est.</Text>
      </View>
      <View className="absolute bottom-10 w-full">
        <View className="flex justify-end items-center">
          <TouchableOpacity
            className="bg-orange-600 w-[300] max-w-full h-11 flex  items-center justify-center rounded-full font-light"
            onPress={() => navigation.navigate("Register")}
          >
            <Text className="text-white text-xl">Sign Up</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text className="text-center mt-3 text-blue-400">
            I already have an account{" "}
          </Text>
        </TouchableOpacity>

       
      </View>
    </View>
  );
};

export default OnboardScreen;
