import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import ShowMap from "../components/ShowMap";
import { editUserProfile } from "../Redux/profile/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Redux/auth/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { putDataAPI } from "../Redux/api";

const AddLocation = () => {
  const [location, setLocation] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [locationSet, setLoacationSet] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const addNavigation = () => {
    setShowMap(true);
  };

  const handleSubmit = async () => {
    // Update user data with new location
    const userData = { ...user, location: location };
    // Dispatch action to edit user profile
    try {
      const response = await putDataAPI("/profile", userData);

      console.log("UserData set", userData);

      const updatedUserData = { ...userData, location: location };
      // Save the updated user data back to AsyncStorage
      await AsyncStorage.setItem("user", JSON.stringify(updatedUserData));
      console.log("User location updated:", location);
      dispatch(setUser(userData));
      // setLoacationSet(true);
    } catch (error) {
      console.log(error);
    }
    dispatch(editUserProfile(userData));
  };

  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        height: "100vh",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="p-3"
    >
      <Text className="text-[50px] mb-3">👋</Text>
      <Text className="text-orange-600 font-bold text-[25px] mb-4">
        Hey there, {user.firstName}!
      </Text>
      <Text className="text-[17px] mb-4 text-center">
        Ready to make a difference? Let's start by pinpointing your location.
      </Text>
      <Text className="text-gray-600 text-center">
        This way, we can connect you with nearby listings and show you how many
        neighbors are eager to share in your mission to reduce food waste.
      </Text>
      <Pressable
        className="p-4 bg-orange-600 text-center w-full mt-3 rounded-full "
        onPress={addNavigation}
      >
        <Text className="text-center text-white"> Add Location</Text>
      </Pressable>
      {showMap && (
        <ShowMap setLocation={setLocation} handleSubmit={handleSubmit} />
      )}

      {locationSet && (
        <View>
          <Text>Location set Successfully</Text>
        </View>
      )}
    </View>
  );
};

export default AddLocation;

const styles = StyleSheet.create({});
