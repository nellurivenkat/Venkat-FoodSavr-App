import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import AddLocation from "./AddLocation";
import Feed from "./Feed";
import CreatePost from "./CreatePost";
import UserProfile from "./UserProfile";
import User from "./User";

const FeedScreen = () => {
  const { user } = useSelector((state) => state.auth);
  if (!user.location) {
    return <AddLocation />;
  }
  console.log(user);
  return (
    <View style={styles.container}>
      <Feed />
    </View>
  );
};

const PlusScreen = () => {
  return (
    <View style={styles.container}>
      <CreatePost />
    </View>
  );
};

const ChatScreen = () => (
  <View style={styles.container}>
    <User />
  </View>
);

const ProfileScreen = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <View style={styles.container}>
      <UserProfile userId={user.id} />
    </View>
  );
};

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Plus"
        component={PlusScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Users"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {},
});
