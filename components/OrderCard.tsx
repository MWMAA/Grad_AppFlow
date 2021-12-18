import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import * as cartActions from "../store/actions/cart";
import { Image, Button } from "react-native-elements";

const OrderCard = (props: any) => {
  const dispatch = useDispatch();
  const data = props.data;

  return (
    <View style={styles.container}>
      <Image
        containerStyle={styles.mainImageContainer}
        style={
          props.detailScreen
            ? styles.mainImage
            : { ...styles.mainImage, width: "100%" }
        }
        source={{
          // uri: `data:image/jpeg;base64,${data.Image}`,
          uri: "https://scontent.fcai19-4.fna.fbcdn.net/v/t31.18172-8/1658139_721727101205007_521350763_o.jpg?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=gLGzaOl6S7IAX8Qtu6i&_nc_ht=scontent.fcai19-4.fna&oh=8ae76b27db326229148920b1f3a0d9a0&oe=61A3F4F7",
        }}
      />

      <View style={styles.text_section}>
        <Text style={styles.title}>{data.item.name}</Text>
        <Text style={styles.about}>{data.item.description}</Text>
        <View style={styles.payment_container}>
          <Text style={styles.title}>${data.item.cost}</Text>
          <Button
            buttonStyle={styles.button}
            type="solid"
            title="Book"
            onPress={() => dispatch(cartActions.addToCart(data.item))}
          />
          {/* <TouchableOpacity
            onPress={() => {
              dispatch(cartActions.addToCart(data.item));
            }}
            style={styles.button}
          >
            <Text style={styles.btn_text}>Book</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "space-between",
    flex: 1,
    height: "100%",
    width: Dimensions.get("window").width,
    backgroundColor: "white",
    paddingHorizontal: 5,
  },
  payment_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  mainImage: {
    height: "100%",
    // width: "100%",
  },
  mainImageContainer: {
    borderRadius: 25,
    height: 90,
    width: 90,
    marginVertical: 5,
    marginRight: 5,
  },
  text_section: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: "white",
    width: Dimensions.get("window").width - 120,
  },
  title: {
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 30,
    letterSpacing: -0.025,
  },
  price: {
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 30,
    letterSpacing: -0.025,
    // color: "blue",
  },
  about: {
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: -0.05,
  },
  button: {
    display: "flex",
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default OrderCard;
