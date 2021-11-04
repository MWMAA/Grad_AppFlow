import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen: React.FC = () => {
  const data = [
    { key: "Username", value: "value" },
    { key: "Email", value: "value@value.value" },
    { key: "Age", value: "159" },
    { key: "Gender", value: "Zombie" },
    { key: "Balance", value: "00.00689" },
  ];
  return (
    <View style={styles.container}>
      <Ionicons name="person-circle-outline" size={100} color="black" />
      <FlatList
        data={data}
        keyExtractor={(item) => item.key}
        renderItem={(itemData) => (
          <View style={styles.title}>
            <Text>{itemData.item.key}:</Text>
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
  },
  title: {
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 30,
    letterSpacing: -0.025,
  },
});

export default ProfileScreen;
