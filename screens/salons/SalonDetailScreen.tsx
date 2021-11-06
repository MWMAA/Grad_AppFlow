import React from "react";
import { StyleSheet, ScrollView, Button, Platform } from "react-native";
import { useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import SalonCard from "../../components/SalonCard";
import OrderCard from "../../components/OrderCard";
import HeaderButton from "../../components/UI/HeaderButton";

const SalonDetailScreen = (props: any) => {
  const Salons = useSelector((state) => state.salon.salonData);
  const { salonId } = props.route.params;
  const Salon = Salons.find((item) => item._id === salonId);

  return (
    <ScrollView style={styles.text}>
      <SalonCard data={Salon} detailScreen={true}>
        <Button title="Services" onPress={() => {}} />
        <Button title="Reviewes" onPress={() => {}} />
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
  text: {
    fontFamily: "open-sans",
    backgroundColor: "white",
  },
});

export const screenOptions = (navData: any) => {
  return {
    // headerTitle: "All Products",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate("My Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default SalonDetailScreen;
