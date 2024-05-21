import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AntIcon from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { logoutUser } from "../Redux/auth/authSlice";

const SignOut = ({ closeSignOut }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const LogoutAction = async () => {
    setLoading(true);
    dispatch(logoutUser());
    dispatch(setUser(null));
    dispatch(setToken(null));
    setLoading(false);
    navigation.navigate("Onbard");
  };
  return (
    <View className="flex  h-screen w-screen items-center justify-center p-4  absolute top-0 left-0 bg-[#CECECE2A]">
      <View className="w-full h-[200px] rounded-xl bg-white flex flex-col items-center justify-center">
        <Text>
          <AntIcon name="logout" size={30} color="red" />
          <Text className="text-center text-red-500 text-[20px] font-bold">
            Sign Out
          </Text>
        </Text>

        <Text className="text-gray-500 mb-3">
          Are you sure you want to sign out of the applicationi?
        </Text>
        {loading ? (
          <Text className="text-center text-gray-400">Loading....</Text>
        ) : (
          <View className=" flex items-center justify-between flex-row gap-20 ">
            <Pressable
              className="mt-4"
              onPress={() => {
                closeSignOut();
              }}
            >
              <Text className="text-red-500">Cancel</Text>
            </Pressable>

            <Pressable className="mt-4" onPress={LogoutAction}>
              <Text className="text-green-500">Yes</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

export default SignOut;

const styles = StyleSheet.create({});
