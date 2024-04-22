import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import LoginScreen from "../screen/LoginScreen";
import RegisterScreen from "../screen/RegisterScreen";
import OnboardScreen from "../screen/OnboardScreen";
import HomeScreen from "../screen/HomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ViewPost from "../screen/ViewPost";

// Import your screens

const Stack = createStackNavigator();

const AppNavigator = () => {
  const user = useSelector((state) => state.auth.user);
  const token = AsyncStorage.getItem("token");
  console.log(token);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen
              name="Onbard"
              component={OnboardScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
