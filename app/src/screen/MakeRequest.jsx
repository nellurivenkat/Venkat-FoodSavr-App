import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Linking,
} from "react-native";
import Button from "../components/Button";
import CloseIcon from "../assets/icon/close.png"; // Import the SVG icon
import Map from "../components/ShowMap";
import Mpa2 from "../components/Map2";

const MakeRequest = ({ setShowPost, data }) => {
  const [ViewMap, setViewMap] = useState(false);
    const handlePress = () => {
      const phoneNumber = "+25043944034934";
      Linking.openURL(`tel:${phoneNumber}`);
    };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.closeIcon}>
          {/* Use SvgUri to display the SVG icon */}
          <Pressable onPress={() => setShowPost(false)}>
            <Image className="w-5 h-5" source={CloseIcon} />
          </Pressable>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Make A Request From the store</Text>
          <Text className="text-gray-600 text-center">
            You can make your request by placing a call to the giver or chacking
            the loaction
          </Text>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="Make A Call" onPress={handlePress} />
            </View>
            <View style={styles.button}>
              <Button title="View Location" onPress={() => setViewMap(true)} />
            </View>
          </View>
        </View>
      </View>
      {ViewMap && (
        <View className="absolute top-0 left-0 w-full h-full ">
          <Mpa2
            setLocation={data.location}
            handleSubmit={() => setViewMap(false)}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    padding: 20,
    backgroundColor: "rgba(219, 221, 220, 0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  closeIcon: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  content: {
    width: "100%",
    height: 150,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 3,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default MakeRequest;
