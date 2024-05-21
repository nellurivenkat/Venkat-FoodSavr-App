import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../Redux/profile/profileSlice";
import Distance from "../function/Distance";
import { useNavigation } from "@react-navigation/native";

const User = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  const { allUsers, loading } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);
  console.log(allUsers);
  const currentUser = useSelector((state) => state.auth.user);
  const navigation = useNavigation();

  return (
    <View className="bg-white h-screen">
      <Image
        className="w-full h-[200px] bg-zinc-500"
        source={{
          uri: "https://th.bing.com/th/id/R.913becf9f884742c3bae5764e35ae12b?rik=zxv5oidL7n59fQ&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2f2%2f9%2f7%2f494243.jpg&ehk=jbHEDfWJ%2fvfSK7S0gPqDY4mLwcyroJZp5ma9w4jrfOw%3d&risl=&pid=ImgRaw&r=0",
        }}
      />
      <View className="mt-4 px-1">
        <Text className="text-5 text-[25px] text-gray-400">
          User List
          {/* <Text className="font-bold text-orange-600">{user.firstName}.</Text> */}
        </Text>
        <Text className="mb-1">
          These are the list of all the users on our platform. You can also
          contact users if you have any request
        </Text>

        <ScrollView>
          {allUsers &&
            allUsers.map((user, i) => (
              <Pressable
                key={i}
                className=" rounded flex flex-row items-center gap-1 mt-1 px-2 bg-zinc-50 py-1 "
                onPress={() =>
                  navigation.navigate("chat", {
                    userId: user?._id,
                    currentUserId: currentUser?._id,
                  })
                }
              >
                <Image
                  source={{
                    uri: user.image,
                  }}
                  className="rounded-xl"
                  style={{ width: 50, height: 50, resizeMode: "cover" }}
                />
                <View>
                  <Text className="text-[14px] mb-0 overflow-hidden text-ellipsis w-300px text-orange-600 uppercase">
                    {user.firstName} {user.lastName}
                  </Text>
                  {/* <Text>{user?.eamil}</Text> */}
                  <Text className="text-[11px] text-gray-500">
                    {user?.phoneNumber}
                  </Text>
                  <Distance
                    to={user?.location}
                    userLocation={currentUser?.location}
                  />
                </View>
              </Pressable>
            ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({});
