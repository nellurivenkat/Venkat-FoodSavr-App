import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";

import CloseIcon from "../assets/icon/close.png"; // Import the SVG icon

const Done = ({ setDone }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.closeIcon}>
          <Pressable onPress={() => setDone(false)}>
            <Image className="w-5 h-5" source={CloseIcon} />
          </Pressable>
        </View>
        <Text style={styles.title}>Uploaded Successfully</Text>
        <Text className="text-[50px]">👌</Text>
        <Text>Post has been created Successfully.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100vw",
    height: "100vh",
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
    position: "relative",
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
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

export default Done;
