import React from "react";
import { View } from "react-native";
import SalonListScreen from "./salons/SalonListScreen";
import { HeaderButtons } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = (props: any) => {
  return (
    <View>
      <SalonListScreen navigation={props.navigation} />
    </View>
  );
};

export const screenOptions = (navData: any) => {
  return {
    headerTitle: "Home",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Ionicons
          name="add-circle"
          size={24}
          color="blue"
          onPress={() => {
            navData.navigation.navigate("SalonForm");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default HomeScreen;
