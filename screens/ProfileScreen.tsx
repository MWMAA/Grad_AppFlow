import React from "react";
import { View, Text } from "react-native";

const ProfileScreen: React.FC = () => {
  return (
    <View>
      <Text>textInComponent</Text>
    </View>
  );
};

export const screenOptions = (_navData: any) => {
  return {
    headerTitle: "Profile",
  };
};

export default ProfileScreen;
