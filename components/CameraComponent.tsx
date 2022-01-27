import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableHighlight,
  Image,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import cameraPreview from "./cameraPreview";

const CameraComponent = (props) => {
  const cameraRef = useRef();
  const [path, setPath] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);

  // Screen Ratio and image padding
  const [imagePadding, setImagePadding] = useState(0);
  const [ratio, setRatio] = useState("4:3"); // default is 4:3
  const { height, width } = Dimensions.get("window");
  const screenRatio = height / width;
  const [isRatioSet, setIsRatioSet] = useState(false);

  const takePicture = async () => {
    try {
      const data = await cameraRef.current!.takePictureAsync();
      setPath(data.uri);

      const accessToken = await AsyncStorage.getItem("Access_Token");

      const form = new FormData();
      form.append("image", {
        uri: data.uri,
        type: "image/jpeg",
        name: "image.jpg",
      });

      await axios({
        method: "post",
        url: "http://192.168.1.101:5000/hairRecommendation",
        data: form,
        headers: {
          "Content-type": "multipart/form-data",
          // Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const typeSetter = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const pickImage = async () => {
    async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    };

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPath(result.uri);
    }
  };

  const prepareRatio = async () => {
    let desiredRatio = "4:3";
    if (Platform.OS === "android") {
      const ratios = await cameraRef.current!.getSupportedRatiosAsync();

      let distances = {};
      let realRatios = {};
      let minDistance = null;
      for (const ratio of ratios) {
        const parts = ratio.split(":");
        const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
        realRatios[ratio] = realRatio;

        const distance = screenRatio - realRatio;
        distances[ratio] = realRatio;
        if (minDistance == null) {
          minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }

      desiredRatio = minDistance;
      const remainder = Math.floor(
        (height - realRatios[desiredRatio] * width) / 2
      );

      setImagePadding(remainder);
      setRatio(desiredRatio);
      setIsRatioSet(true);
    }
  };

  const setCameraReady = async () => {
    if (!isRatioSet) {
      await prepareRatio();
    }
  };

  const renderCamera = () => {
    return (
      <Camera
        ref={cameraRef}
        style={styles.preview}
        onCameraReady={setCameraReady}
        ratio={ratio}
        type={type}
        flashMode={Camera.Constants.FlashMode.off}
        permissionDialogTitle={"Permission to use camera"}
        permissionDialogMessage={
          "We need your permission to use your camera phone"
        }
      >
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.button}
            onPress={pickImage}
            underlayColor="rgba(255, 255, 255, 0.0)"
          >
            <Ionicons name="folder-outline" size={30} color="white" />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.capture}
            onPress={takePicture}
            underlayColor="rgba(255, 255, 255, 0.5)"
          >
            <View />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={typeSetter}
            underlayColor="rgba(255, 255, 255, 0.0)"
          >
            <Ionicons name="camera-reverse" size={30} color="white" />
          </TouchableHighlight>
        </View>
      </Camera>
    );
  };

  return (
    <View style={styles.container}>
      {path
        ? cameraPreview({ path, setPath }, props.navigation)
        : renderCamera()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  capture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: "#FFF",
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
    marginBottom: 30,
  },
  cancel: {
    position: "absolute",
    right: 20,
    top: 50,
    color: "#FFF",
    fontWeight: "600",
    fontSize: 17,
    backgroundColor: "#FF0000",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
});

export default CameraComponent;
