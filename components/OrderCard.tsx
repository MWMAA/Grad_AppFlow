import React from "react";
import { Text, View, StyleSheet, Image, Button } from "react-native";
import { useDispatch } from "react-redux";
import * as cartActions from "../store/actions/cart";

const OrderCard = (props: any) => {
  const dispatch = useDispatch();
  const data = props.data;

  return (
    <View style={styles.container}>
      <View style={styles.LSection}>
        <View style={styles.mainImageContainer}>
          <Image
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
        </View>
        <View>
          <View style={styles.LSectionText}>
            <Text style={styles.title}>
              {data.item.name} ${data.item.cost}
            </Text>
            <Text style={styles.about}>{data.item.description}</Text>
          </View>
        </View>
      </View>
      <View style={styles.RSection}>
        <Button
          title="Book"
          onPress={() => {
            dispatch(cartActions.addToCart(data.item));
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    height: "100%",
    backgroundColor: "white",
    marginBottom: 5,
    paddingHorizontal: 5,
  },
  mainImage: {
    height: "100%",
    width: "100%",
  },
  mainImageContainer: { height: 60, width: 60 },
  LSection: {
    flexDirection: "row",
    overflow: "hidden",
    backgroundColor: "white",
  },
  LSectionText: {
    marginLeft: 4,
    maxWidth: 225,
  },
  RSection: {
    overflow: "hidden",
    backgroundColor: "white",
  },
  title: {
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 30,
    letterSpacing: -0.025,
  },
  about: {
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: -0.05,
  },
});

export default OrderCard;
