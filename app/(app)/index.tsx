import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

export default function HomeScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedAssetInfo, setSelectedAssetInfo] =
    useState<MediaLibrary.AssetInfo | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [locationError, setLocationError] = useState<string | null>(null);

  // Handle selecting an image
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access camera roll is required."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "livePhotos", "videos"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setSelectedImage(asset.uri);

      try {
        if (asset.assetId) {
          const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.assetId);

          setSelectedAssetInfo(assetInfo);
        }
      } catch (error) {
        console.error("Error fetching asset info:", error);
        Alert.alert(
          "Error",
          "Unable to fetch metadata for the selected image."
        );
      }
    }
  };

  // Handle fetching location
  const fetchLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setLocationError("Permission to access location was denied.");
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
  };

  useEffect(() => {
    fetchLocation(); // Fetch location on mount
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Location Section */}
        <Text style={styles.sectionTitle}>Location</Text>
        {locationError ? (
          <Text style={styles.errorText}>{locationError}</Text>
        ) : location ? (
          <Text style={styles.text}>
            Latitude: {location.coords.latitude}, Longitude:{" "}
            {location.coords.longitude}
          </Text>
        ) : (
          <Text style={styles.text}>Fetching location...</Text>
        )}
        <Button title="Refresh Location" onPress={fetchLocation} />

        {/* Image Picker Section */}
        <Text style={styles.sectionTitle}>Media Library</Text>
        <Button title="Pick an Image" onPress={pickImage} />
        {selectedImage && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: selectedImage }} style={styles.image} />
            <Text style={styles.metadataTitle}>Metadata:</Text>
            <ScrollView style={styles.metadataScroll}>
              <Text style={styles.text}>
                asset location:
                {JSON.stringify(selectedAssetInfo?.location, null, 2)}
              </Text>
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  text: {
    fontSize: 14,
    color: "gray",
    marginVertical: 5,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginVertical: 5,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  metadataTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  metadataScroll: {
    maxHeight: 200,
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    width: "100%",
  },
});
