import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, Button, Pressable } from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";

const Map2 = ({ setLocation, handleSubmit }) => {
  const [region, setRegion] = useState(null);
  const [showPermissionPopup, setShowPermissionPopup] = useState(false);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { granted } = await requestForegroundPermissionsAsync();
      if (granted) {
        const location = await getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
    
      } else {
        setShowPermissionPopup(true);
      }
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

//   const handleMapPress = (event) => {
//     const { coordinate } = event.nativeEvent;
//     console.log("Selected location:", coordinate);
//     setRegion({
//       latitude: coordinate.latitude,
//       longitude: coordinate.longitude,
//       latitudeDelta: 0.0922,
//       longitudeDelta: 0.0421,
//     });
//     setLocation(coordinate);
//   };

  return (
    <View style={styles.container}>
      {showPermissionPopup && (
        <Alert
          title="Location Permission Required"
          message="Please allow access to your location to use this feature."
          buttons={[
            {
              text: "OK",
              onPress: async () => {
                setShowPermissionPopup(false);
                await requestLocationPermission();
              },
            },
          ]}
        />
      )}
      {region ? (
        <>
          <MapView
            style={styles.map}
            initialRegion={region}
        
          >
            <Marker coordinate={region} />
          </MapView>
          <View className="p-2 flex items-center ">
           
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default Map2;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
