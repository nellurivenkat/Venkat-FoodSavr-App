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

import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker"; // Import ImagePicker from expo-image-picker

import Map from "../components/ShowMap";
import { createPost } from "../Redux/post/postSlice";
import Done from "./Done";

const registerSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  price: yup.string().required("Price is required"),
  details: yup.string().required("Details is required"),
  type: yup.string().required("Type is required"),
});

const CreatePost = ({ navigation }) => {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.post.error);
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState();
  const [addLocation, setAddLocation] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  // Function to handle image upload
  const upLoadImage = async () => {
    try {
      setLoading(true);
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setRegisterError("Error uploading image. Please try again.");
    }
    setLoading(false);
  };

  const handleRegister = async (values) => {
    setRegisterError(""); // Clear previous error
    try {
      let imageUrl = null;
      if (image) {
        // If image is selected, upload it to Cloudinary
        const formData = new FormData();
        formData.append("file", {
          uri: image,
          name: "image.jpg",
          type: "image/jpg",
        });
        const cloudName = "dd6wbwlw9";
        const uploadPreset = "jmro2et8";

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload?upload_preset=${uploadPreset}`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        console.log(data);
        imageUrl = data.secure_url;
      }
      console.log(loading);

      console.log(imageUrl);
      // Create postData with the imageUrl
      const postData = { ...values, media: imageUrl, location };

      // Dispatch action to create post with postData
      dispatch(createPost(postData));
      setDone(true);
    } catch (error) {
      console.error("Error uploading image:", error);
      setRegisterError("Error uploading image. Please try again.");
    }
  };

  return (
    <>
      <View className="px-4 h-screen mt-20">
        <Text className="text-orange-600 text-[25px]">Upload Food</Text>
        <Text className="text-gray-600 mb-3">
          Fill your login details to login to your account.
        </Text>
        <Formik
          initialValues={{
            title: "",
            price: "",
            details: "",
            type: "pickUp",
          }}
          validationSchema={registerSchema}
          onSubmit={handleRegister}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View>
              {/* Form fields */}
              <TextInput
                placeholder="Title"
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
                value={values.title}
                className="w-full px-3 py-2 border border-gray-300 rounded mb-3"
              />
              {errors.title && (
                <Text style={{ color: "red" }}>{errors.title}</Text>
              )}
              <TextInput
                placeholder="Details"
                onChangeText={handleChange("details")}
                onBlur={handleBlur("details")}
                value={values.details}
                className="w-full px-3 py-2 border border-gray-300 rounded mb-3"
              />
              {errors.details && (
                <Text style={{ color: "red" }}>{errors.details}</Text>
              )}
              <TextInput
                placeholder="Price"
                onChangeText={handleChange("price")}
                onBlur={handleBlur("price")}
                value={values.price}
                keyboardType="phone-pad"
                className="w-full px-3 py-2 border border-gray-300 rounded mb-3"
              />
              {errors.price && (
                <Text style={{ color: "red" }}>{errors.price}</Text>
              )}
              <View className="w-full px-3  border border-gray-300 rounded mb-3">
                <Picker
                  selectedValue={values.type}
                  style={{ height: 50, width: "100%" }}
                  onValueChange={(itemValue) => handleChange("type")(itemValue)}
                >
                  <Picker.Item label="Pick Up" value="pickUp" />
                  <Picker.Item label="Delivery" value="delivery" />
                </Picker>
              </View>
              {errors.type && (
                <Text style={{ color: "red" }}>{errors.type}</Text>
              )}
              {addLocation && (
                <Map
                  setLocation={setLocation}
                  handleSubmit={() => setAddLocation(false)}
                />
              )}
              {addLocation ? (
                <Pressable
                  onPress={() => setAddLocation(false)}
                  className="bg-orange-400 rounded-full px-3 py-4 mt-2"
                >
                  <Text className="text-center text-white">Hide Map</Text>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => setAddLocation(true)}
                  className="bg-blue-400 rounded-xl px-3 py-4 mt-2"
                >
                  <Text className="text-center text-white">Show Map</Text>
                </Pressable>
              )}
              {registerError !== "" && (
                <Text style={{ color: "red" }}>{registerError}</Text>
              )}
              {/* Upload Image button */}
              <Pressable
                onPress={upLoadImage}
                className="bg-red-700 rounded-xl px-3 py-4 mt-2"
              >
                <Text className="text-center text-white">Upload Image</Text>
              </Pressable>
              {/* Loading indicator and Register button */}
              {loading ? (
                <ActivityIndicator size="large" color="blue" />
              ) : (
                <Pressable
                  onPress={handleSubmit}
                  className="bg-orange-400 rounded-xl px-3 py-4 mt-4"
                >
                  <Text className="text-center text-white">Upload</Text>
                </Pressable>
              )}
              {error && <Text style={{ color: "red" }}>{error.message}</Text>}
            </View>
          )}
        </Formik>
      </View>
      {/* Add location */}

      {done && <Done setDone={setDone} />}
    </>
  );
};

export default CreatePost;
