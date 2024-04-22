import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Distance = ({ userLocation, to }) => {
  // Function to calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180); // Convert degrees to radians
    const dLon = (lon2 - lon1) * (Math.PI / 180); // Convert degrees to radians
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  // Extract latitude and longitude from userLocation and to
  const { latitude: userLat, longitude: userLon } = userLocation;
  const { latitude: toLat, longitude: toLon } = to;

  // Calculate distance
  const distance = calculateDistance(userLat, userLon, toLat, toLon);

  return (
    <View>
      <Text className="text-gray-400 text-[12px]">
        {distance.toFixed(2)} km Away
      </Text>
    </View>
  );
};

export default Distance;
