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
import { registerUser } from "../Redux/auth/authSlice";
import { Picker } from "@react-native-picker/picker"; // Import Picker from @react-native-picker/picker

const registerSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  accountType: yup.string().required("Account type is required"),
});

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const [registerError, setRegisterError] = useState("");

  const handleRegister = async (values) => {
    setRegisterError(""); // Clear previous error
    try {
      await dispatch(registerUser(values));
    } catch (error) {
      setRegisterError(error.message);
    }
  };

  return (
    <View className="w-screen h-screen flex items-center justify-center p-5 ">
      <View className="w-full">
        <Text className="text-orange-600 text-5xl font-black text-center mb-5">
          FoodSavr
        </Text>
        <View className="border rounded-xl p-3 border-gray-200">
          <Text className="text-orange-600 text-[25px]">Join Us</Text>
          <Text className="text-gray-600">
            Fill your details to create an account with us.
          </Text>

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              phoneNumber: "",
              accountType: "user", // Default account type
            }}
            validationSchema={registerSchema}
            onSubmit={handleRegister}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View className="mt-4">
                <TextInput
                  placeholder="First Name"
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  value={values.firstName}
                  className="w-full px-3 py-2 border border-gray-300 rounded mb-3"
                />
                {errors.firstName && (
                  <Text style={{ color: "red" }}>{errors.firstName}</Text>
                )}
                <TextInput
                  placeholder="Last Name"
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  value={values.lastName}
                  className="w-full px-3 py-2 border border-gray-300 rounded mb-3"
                />
                {errors.lastName && (
                  <Text style={{ color: "red" }}>{errors.lastName}</Text>
                )}
                <TextInput
                  placeholder="Email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
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
                <TextInput
                  placeholder="Phone Number"
                  onChangeText={handleChange("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  value={values.phoneNumber}
                  keyboardType="phone-pad"
                  className="w-full px-3 py-2 border border-gray-300 rounded mb-3"
                />
                {errors.phoneNumber && (
                  <Text style={{ color: "red" }}>{errors.phoneNumber}</Text>
                )}
                <View className="w-full  border border-gray-300 rounded mb-3">
                  <Picker
                    selectedValue={values.accountType}
                    style={{ height: 50, width: "100%" }}
                    onValueChange={(itemValue) =>
                      handleChange("accountType")(itemValue)
                    }
                  >
                    <Picker.Item label="User" value="user" />
                    <Picker.Item label="Restaurant" value="restaurant" />
                  </Picker>
                </View>
                {error && <Text style={{ color: "red" }}>{error.message}</Text>}
                {errors.accountType && (
                  <Text style={{ color: "red" }}>{errors.accountType}</Text>
                )}
                {registerError !== "" && (
                  <Text style={{ color: "red" }}>{registerError}</Text>
                )}
                {loading ? (
                  <ActivityIndicator size="large" color="blue" />
                ) : (
                  <Pressable
                    onPress={handleSubmit}
                    className="bg-orange-400 rounded-full px-3 py-4 mt-2"
                  >
                    <Text className="text-center text-white">
                      Create Account
                    </Text>
                  </Pressable>
                )}
              </View>
            )}
          </Formik>
          <Pressable
            className="mt-3 text-center"
            onPress={() => navigation.navigate("Login")}
          >
            <Text className="text-center text-gray-500">
              Already have an account?{" "}
              <Text className="text-blue-500"> Sign In</Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;
