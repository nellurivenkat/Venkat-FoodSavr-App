import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
const OnboardScreen = ({navigation}) => {
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
        <Text>Transforming Waste into Taste!</Text>
      </View>
      <View className="absolute bottom-10 w-full">
        <View className="flex justify-end items-center">
          <TouchableOpacity
            className="bg-orange-600 w-[300] max-w-full h-14 flex  items-center justify-center rounded-full"
            onPress={() => navigation.navigate("Login")}
          >
            <Text className="text-white text-xl">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OnboardScreen;
