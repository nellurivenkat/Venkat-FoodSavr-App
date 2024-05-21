import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import LoginScreen from "../screen/LoginScreen";
import RegisterScreen from "../screen/RegisterScreen";
import OnboardScreen from "../screen/OnboardScreen";
import HomeScreen from "../screen/HomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ViewPost from "../screen/ViewPost";
import { setToken, setUser } from "../Redux/auth/authSlice";
import { View } from "react-native";
import AddLocation from "../screen/AddLocation";
import NewProfile from "../screen/NewProfile";
import Chat from "../screen/Chat";
import DeleteSuccrss from "../screen/DeleteSuccrss";

// Import your screens

const Stack = createStackNavigator();

const AppNavigator = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const userString = await AsyncStorage.getItem("user");
      const tokenString = await AsyncStorage.getItem("token");
      if (userString) {
        const user = JSON.parse(userString);
        dispatch(setUser(user));
        dispatch(setToken(tokenString));
      }
    };

    fetchUser();
  }, [dispatch]);
  console.log("Loaction", user?.loaction);

  return (
    <View className="w-screen h-screen bg-white">
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
          ) : !user.location ? (
            <>
              <Stack.Screen
                name="AddLoaction"
                component={AddLocation}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="viewPost"
                component={ViewPost}
                // options={{ title: "View Post" }}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="profile"
                component={NewProfile}
                // options={{ title: "Profile" }}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="chat"
                component={Chat}
                options={{ title: "Chat" }}
                // options={{ headerShown: false }}
              />
              <Stack.Screen
                name="deleted"
                component={DeleteSuccrss}
               
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default AppNavigator;
