//Nelluri Venkat

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import store from "./src/Redux/store";
import AppNavigator from "./src/function/AppNavigator";

export default function App() {
  return (
    <View className="h-screen">
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </View>
  );
}
