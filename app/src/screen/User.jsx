import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../Redux/profile/profileSlice";
import Distance from "../function/Distance";
import { ScrollView } from "react-native-gesture-handler";

const User = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  const { allUsers, loading } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);
  console.log(allUsers);
  const Cuser = useSelector((state) => state.auth.user);
  return (
    <View>
      <View className="mt-16 px-1">
        <Text className="text-5 text-[25px] text-gray-400">
          User List
          {/* <Text className="font-bold text-orange-600">{user.firstName}.</Text> */}
        </Text>
        <Text className="mb-1">
          This are the list of all the users on our platform.
        </Text>

        <ScrollView>
          {allUsers &&
            allUsers.map((user) => (
              <View className="bg-gray-200  rounded-full flex flex-row items-center gap-3 mb-2 mt-2">
                <Image
                  source={{
                    uri: user.image,
                  }}
                  className="rounded-full"
                  style={{ width: 100, height: 100, resizeMode: "cover" }}
                />
                <View>
                  <Text className="text-[18px] text-orange-600 uppercase">
                    {user.firstName} {user.lastName}
                  </Text>
                  <Distance
                    to={user?.location}
                    userLocation={Cuser?.location}
                  />
                  <Text>{user?.eamil}</Text>
                  <Text>{user?.phoneNumber}</Text>
                </View>
              </View>
            ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({});
