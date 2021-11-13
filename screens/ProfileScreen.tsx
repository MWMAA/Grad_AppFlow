import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen: React.FC = () => {
  const data = [
    { key: "Username", value: "Mahmoud Wessam" },
    { key: "Email", value: "Mahmoudamer95.bird@gmail.com" },
    { key: "Age", value: "undefined" },
    { key: "Gender", value: "Male" },
    { key: "Balance", value: "0.00" },
  ];
  return (
    <View style={styles.container}>
      <Ionicons
        name="person-circle-outline"
        size={100}
        color="black"
        style={styles.image}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.key}
        renderItem={(itemData) => (
          <View style={styles.title}>
            <Text style={styles.key}>{itemData.item.key}:</Text>
            <Text>{itemData.item.value}</Text>
          </View>
        )}
      />
      <Button title="Logout" onPress={() => {}} />
    </View>
  );
};

export const screenOptions = (_navData: any) => {
  return {
    headerTitle: "Profile",
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    paddingHorizontal: 10,
  },
  title: {
    display: "flex",
    flexDirection: "row",
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 30,
    letterSpacing: -0.025,
  },
  key: {
    marginRight: 5,
  },
  image: {
    justifyContent: "center",
  },
});

export default ProfileScreen;
