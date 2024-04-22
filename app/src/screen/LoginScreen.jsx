import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import { loginUser } from "../Redux/auth/authSlice";
// Assuming you have an authSlice with loginUser action

// Define validation schema using Yup
const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const [loginError, setLoginError] = useState("");

  const handleLogin = async (values) => {
    setLoginError(""); // Clear previous error
    try {
      await dispatch(loginUser(values));
    } catch (error) {
      setLoginError(error.message);
    }
  };

  console.log(error);
  return (
    <View className="w-screen h-screen flex items-center justify-center p-5 ">
      <View className="w-full">
        <Text className="text-orange-600 text-5xl font-black text-center mb-5">
          FoodSavr
        </Text>
        <Text className="text-orange-600 text-[25px]">Sign In</Text>
        <Text className="text-gray-600">
          Fill your login details to login to your account.
        </Text>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View className="mt-2">
              <TextInput
                placeholder="Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                autoCapitalize="none"
                keyboardType="email-address"
                className="w-full px-3 py-2 border border-gray-300 rounded mb-3"
              />
              {errors.email && (
                <Text style={{ color: "red" }}>{errors.email}</Text>
              )}
              <TextInput
                placeholder="Password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry
                className="w-full px-3 py-2 border border-gray-300 rounded mb-3"
              />
              {errors.password && (
                <Text style={{ color: "red" }}>{errors.password}</Text>
              )}
              {error && (
                <Text style={{ color: "red" }} className="mb-1">
                  {error.message}
                </Text>
              )}
              {loginError !== "" && (
                <Text style={{ color: "red" }}>{loginError}</Text>
              )}
              {loading ? (
                <ActivityIndicator size="large" color="orange" />
              ) : (
                <Pressable
                  onPress={handleSubmit}
                  className="bg-orange-400 rounded-full px-3 py-4 mt-2"
                >
                  <Text className="text-center text-white">Login</Text>
                </Pressable>
              )}
            </View>
          )}
        </Formik>
        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text className="text-center mt-3">
            I don't have an account{" "}
            <Text className="text-blue-500">Sign Up</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;
