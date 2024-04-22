import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import tw from "nativewind";

const Button = ({ title, onPress, className }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full p-3 rounded items-center justify-center bg-orange-600 ${className}`}
    >
      <Text className="text-white text-light">{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
