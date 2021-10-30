import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import { useSelector } from "react-redux";
import SalonCard from "../../components/SalonCard";
import OrderCard from "../../components/OrderCard";
import { FlatList } from "react-native-gesture-handler";

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
  scrollView: {
    // flex: 1,
    // backgroundColor: "white",
  },
  text: {
    fontFamily: "open-sans",
    backgroundColor: "white",
    // fontSize: 14,
    // paddingHorizontal: 8,
  },
  card: {
    // flex: 1,
  },
  shareView: {
    // justifyContent: "center",
    // alignItems: "center",
  },
  shareBtn: {
    // width: "50%",
    // backgroundColor: "#f3cfad",
    // borderRadius: 25,
    // height: 40,
    // alignItems: "center",
    // justifyContent: "center",
    // marginTop: 10,
    // marginBottom: 10,
  },
  shareText: {
    // color: "grey",
    // fontFamily: "open-sans-bold",
    // fontSize: 24,
  },
});

export default SalonDetailScreen;
