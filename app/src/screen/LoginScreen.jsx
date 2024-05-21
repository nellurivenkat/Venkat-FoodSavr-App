import React, { useState } from "react";
import {
  View,
  TextInput,
  Image,
  Text,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import { loginUser } from "../Redux/auth/authSlice";
import LoginImage from "../assets/images/authbg.png";
// Assuming you have an authSlice with loginUser action

// Define validation schema using Yup
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Your email is required"),
  password: yup.string().required("Your password is required"),
});

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const loginLoading = useSelector((state) => state.auth.loginLoading);
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
        <View className="py-3 ">
          <Text className="text-orange-600 text-[25px]">Welcome Back!</Text>
          <Text className="text-gray-400 font-light">
            Fill your login details to login to your account.
          </Text>
        </View>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View className="mt-2">
              <View className="mb-2">
                <TextInput
                  placeholder="Email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                {errors.email && (
                  <Text style={{ color: "red" }}>{errors.email}</Text>
                )}
              </View>
              <View className="mb-2">
                <TextInput
                  placeholder="Password"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                {errors.password && (
                  <Text style={{ color: "red" }}>{errors.password}</Text>
                )}
              </View>
              {error && (
                <Text style={{ color: "red" }} className="mb-1">
                  {error.message}
                </Text>
              )}
              {loginError !== "" && (
                <Text style={{ color: "red" }}>{loginError}</Text>
              )}
              <Pressable className="">
                <Text className="text-right text-blue-400 mx-2 my-2">
                  {" "}
                  Forget Password
                </Text>
              </Pressable>
              {loginLoading ? (
                <View className="bg-orange-400 rounded px-3 py-3 mt-2">
                  <ActivityIndicator size="small" color="white" />
                </View>
              ) : (
                <Pressable
                  onPress={handleSubmit}
                  className="bg-orange-400 rounded px-3 py-4 mt-2"
                >
                  <Text className="text-center text-white">Login</Text>
                </Pressable>
              )}
            </View>
          )}
        </Formik>
        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text className="text-center mt-4">
            I don't have an account{" "}
            <Text className="text-blue-500">Sign Up</Text>
          </Text>
        </Pressable>
      </View>
      <Image
        className="absolute w-96 h-96 top-[-70]"
        style={{ objectFit: "contain" }}
        source={LoginImage}
      />
      <View className="absolute bottom-0 w-full">
        <Text className="text-center text-gray-300 mb-3">
          Terms and conditons apply @ FoodSavr
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
