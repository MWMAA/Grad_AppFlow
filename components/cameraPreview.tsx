import React from "react";
import { StyleSheet, View, Text, Dimensions, Image } from "react-native";

const CameraPreviewComponent = (props: any, navigation: any) => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={{ uri: props.path }} style={styles.preview} />
        <Text style={styles.cancel} onPress={() => props.setPath(null)}>
          Cancel
        </Text>
        <Text
          style={styles.LGTM}
          onPress={() => {
            navigation.navigate("Image");
          }}
        >
          AMAZING!
        </Text>
      </View>
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
  cancel: {
    position: "absolute",
    left: 20,
    top: 50,
    color: "#FFF",
    fontWeight: "600",
    fontSize: 17,
    backgroundColor: "#FF0000",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  LGTM: {
    position: "absolute",
    right: 20,
    top: 50,
    color: "#FFF",
    fontWeight: "600",
    fontSize: 17,
    backgroundColor: "#5FF314",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
});

export default CameraPreviewComponent;
