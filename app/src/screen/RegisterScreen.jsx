import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  ActivityIndicator,
  Pressable,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import { registerUser } from "../Redux/auth/authSlice";
import { Picker } from "@react-native-picker/picker"; // Import Picker from @react-native-picker/picker
import LoginImage from "../assets/images/img1.jpeg";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  bio: yup.string().required("Bio is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Your email is required"),
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
    <View className="w-screen h-screen flex items-center justify-center  ">
      <Image
        className="absolute w-[100vw] h-96 top-[-27%] rounded-full"
        style={{ objectFit: "cover" }}
        source={LoginImage}
      />
      <View className="w-full p-4 pl-4  mb-5 mt-10">
        <View>
          <Text className="text-orange-600 text-5xl font-black text-center">
            FoodSavr
          </Text>
          {/* <Text className="text-[18px] text-center">
            Transforming Waste into Taste!
          </Text> */}
        </View>
        <View className="py-2 mt-4">
          <Text className="text-orange-600 text-[25px] font-light">
            Happy to welcome you!!!
          </Text>
          <Text className="text-gray-400">
            Fill your details to create an account with us.
          </Text>
        </View>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            phoneNumber: "",
            bio: "",
            accountType: "user", // Default account type
          }}
          validationSchema={registerSchema}
          onSubmit={handleRegister}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View className="mt-4">
              <View className="flex flex-row gap-2">
                <View className="w-[45%] mb-3">
                  <TextInput
                    placeholder="First Name"
                    onChangeText={handleChange("firstName")}
                    onBlur={handleBlur("firstName")}
                    value={values.firstName}
                    className={`w-full px-3 py-2 border ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    }  rounded`}
                  />
                  {errors.firstName && (
                    <Text style={{ color: "red" }}>{errors.firstName}</Text>
                  )}
                </View>
                <View className="w-[50%] mb-3">
                  <TextInput
                    placeholder="Last Name"
                    onChangeText={handleChange("lastName")}
                    onBlur={handleBlur("lastName")}
                    value={values.lastName}
                    className={`w-full px-3 py-2 border  ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    } rounded`}
                  />
                  {errors.lastName && (
                    <Text style={{ color: "red" }}>{errors.lastName}</Text>
                  )}
                </View>
              </View>
              <View className="mb-3">
                <View
                  className={`w-full  border  ${
                    errors.accountType ? "border-red-500" : "border-gray-300"
                  } rounded text-gray-500`}
                >
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
                {errors.accountType && (
                  <Text style={{ color: "red" }}>{errors.accountType}</Text>
                )}
              </View>
              <View className="mb-3">
                <TextInput
                  placeholder="Email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                  className={`w-full px-3 py-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } border-gray-300 rounded `}
                />
                {errors.email && (
                  <Text style={{ color: "red" }}>{errors.email}</Text>
                )}
              </View>

              <View className="mb-3">
                <TextInput
                  placeholder="Your Bio"
                  onChangeText={handleChange("bio")}
                  onBlur={handleBlur("bio")}
                  value={values.bio}
                  keyboardType="bio-address"
                  className={`w-full px-3 py-2 border ${
                    errors.bio ? "border-red-500" : "border-gray-300"
                  } border-gray-300 rounded `}
                />
                {errors.bio && (
                  <Text style={{ color: "red" }}>{errors.bio}</Text>
                )}
              </View>

              <View className="mb-3">
                <TextInput
                  placeholder="Phone Number"
                  onChangeText={handleChange("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  value={values.phoneNumber}
                  keyboardType="phone-pad"
                  className={`w-full px-3 py-2 border  ${
                    errors.phoneNumber ? "border-red-500" : "border-gray-300"
                  } border-gray-300 rounded `}
                />
                {errors.phoneNumber && (
                  <Text style={{ color: "red" }}>{errors.phoneNumber}</Text>
                )}
              </View>
              <View className="mb-3">
                <TextInput
                  placeholder="Password"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry
                  className={`w-full px-3 py-2 border  ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } border-gray-300 rounded `}
                />
                {errors.password && (
                  <Text style={{ color: "red" }}>{errors.password}</Text>
                )}
              </View>

              {error && <Text style={{ color: "red" }}>{error.message}</Text>}

              {registerError !== "" && (
                <Text style={{ color: "red" }}>{registerError}</Text>
              )}
              <Text className="text-center my-2 text-gray-400 text-light">
                By creating ann account with us you have accept out terms and
                conditions.
              </Text>
              {loading ? (
                <View className="bg-orange-400 rounded px-3 py-3 mt-2">
                  <ActivityIndicator size="small" color="white" />
                </View>
              ) : (
                <Pressable
                  onPress={handleSubmit}
                  className="bg-orange-400 rounded px-3 py-4 mt-2"
                >
                  <Text className="text-center text-white">Create Account</Text>
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

      <View className="absolute bottom-0 w-full">
        <Text className="text-center text-gray-300 mb-3">
          Terms and conditons apply @ FoodSavr
        </Text>
      </View>
    </View>
  );
};

export default RegisterScreen;
