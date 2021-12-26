import React, { useState } from "react";
import { StyleSheet, Platform, View, Text, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { HeaderButtons } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-elements";

import SalonCard from "../../components/SalonCard";
import OrderCard from "../../components/OrderCard";
import HeaderButton from "../../components/UI/HeaderButton";

let selectedSalon = {};

const SalonDetailScreen = (props: any) => {
  const [mode, setMode] = useState(0);
  const Salons = useSelector((state) => state.salon.salonData);
  const { salonId } = props.route.params;

  let Salon;
  if (Salons) {
    Salon = Salons.find((item) => item._id === salonId);
  } else {
    return <Text>Something went very wrong please refresh</Text>;
  }
  selectedSalon = Salon;

  return (
    <View style={styles.container}>
      <SalonCard data={Salon} detailScreen={true}>
        <View style={styles.button_group}>
          <Button
            type={mode === 0 ? "solid" : "outline"}
            buttonStyle={styles.button}
            title="Services"
            onPress={() => {
              setMode(0);
            }}
          />
          <Button
            type={mode === 1 ? "solid" : "outline"}
            buttonStyle={styles.button}
            title="Reviews"
            onPress={() => {
              setMode(1);
            }}
          />
        </View>
        {mode === 0 ? (
          <ScrollView>
            <View style={styles.list}>
              {Salon.services.map((service: object, index: number) => (
                <OrderCard data={service} key={service.name} />
              ))}
            </View>
          </ScrollView>
        ) : (
          <Text style={styles.text}>
            No Reviews Available yet. Don't hesitate to be the first one to add
            a review
          </Text>
        )}
      </SalonCard>
    </View>
  );
};

const styles = StyleSheet.create({
  list: { height: "100%", display: "flex" },
  button: {
    display: "flex",
    width: Dimensions.get("window").width / 2,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "grey",
    padding: 10,
  },
  container: {
    fontFamily: "open-sans",
    backgroundColor: "white",
    // height: "100%",
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
    headerTitle: "Salon Details",
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
            navData.navigation.navigate("My Cart", {
              salonId: navData.route.params.salonId,
            });
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default SalonDetailScreen;
