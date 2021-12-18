import React from "react";
import {
  StyleSheet,
  ScrollView,
  Platform,
  View,
  Pressable,
  Text,
} from "react-native";
import { useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { HeaderButtons } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import SalonCard from "../../components/SalonCard";
import OrderCard from "../../components/OrderCard";
import HeaderButton from "../../components/UI/HeaderButton";

let selectedSalon = {};

const SalonDetailScreen = (props: any) => {
  const Salons = useSelector((state) => state.salon.salonData);
  const { salonId } = props.route.params;
  const Salon = Salons.find((item) => item._id === salonId);

  selectedSalon = Salon;

  return (
    <ScrollView style={styles.container}>
      <SalonCard data={Salon} detailScreen={true}>
        <View style={styles.button_group}>
          <Pressable onPress={() => {}} style={styles.button}>
            <Text style={styles.text}>Services</Text>
          </Pressable>
          <Pressable onPress={() => {}} style={styles.button}>
            <Text style={styles.text}>Reviews</Text>
          </Pressable>
        </View>
        <FlatList
          data={Salon.services}
          keyExtractor={(item) => item._id}
          renderItem={(itemData) => <OrderCard data={itemData} />}
        />
      </SalonCard>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    display: "flex",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  container: {
    fontFamily: "open-sans",
    backgroundColor: "white",
  },
  button_group: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  btn: {
    display: "flex",
    width: "50",
  },
});

export const screenOptions = (navData: any) => {
  return {
    // headerTitle: "All Products",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Ionicons
          name="create"
          size={24}
          color="green"
          onPress={() => {
            navData.navigation.navigate("SalonForm", { salon: selectedSalon });
          }}
        />
        <Ionicons
          name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          size={24}
          color="blue"
          onPress={() => {
            navData.navigation.navigate("My Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default SalonDetailScreen;
