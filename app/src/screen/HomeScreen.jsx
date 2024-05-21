import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from Expo vector icons
import Feed from "./Feed";
import CreatePost from "./CreatePost";
import UserProfile from "./UserProfile";
import User from "./User";
import { useSelector } from "react-redux";

const FeedScreen = () => {
  // Your FeedScreen component code

  return (
    <View style={styles.container}>
      <Feed />
    </View>
  );
};

const PlusScreen = () => {
  // Your PlusScreen component code
  return (
    <View style={styles.container}>
      <CreatePost />
    </View>
  );
};

const ChatScreen = () => {
  // Your ChatScreen component code
  return (
    <View style={styles.container}>
      <User />
    </View>
  );
};

const ProfileScreen = () => {
  const { user } = useSelector((state) => state.auth);
  // Your ProfileScreen component code
  return (
    <View style={styles.container}>
      <UserProfile userId={user?.id} />
    </View>
  );
};

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Feed") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Plus") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "Users") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#ff4500",
        inactiveTintColor: "gray",
      }}
    >
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

const styles = StyleSheet.create({});
