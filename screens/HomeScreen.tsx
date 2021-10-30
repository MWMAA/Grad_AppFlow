import React from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../App";
import SalonListScreen from "./salons/SalonListScreen";

const HomeScreen: React.FC = (props) => {
  // const dispatch = useDispatch();
  // const salons = useSelector((state: RootState) => state.salons.salonData);

  return <SalonListScreen navigation={props.navigation} />;
  // return <Text>kabpho</Text>;
};

export default HomeScreen;
