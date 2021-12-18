import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { Image } from "react-native-elements";

const SalonCard = (props: any) => {
  const data = props.data;
  return (
    <View style={styles.container_width}>
      <View style={styles.container}>
        <View style={styles.LSection}>
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
          <View>
            <View style={styles.LSectionText}>
              <Text style={styles.title}>{data.name}</Text>
              <Text style={styles.about}>
                {data.address.city +
                  ", " +
                  data.address.street +
                  ", " +
                  data.address.building_number}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.RSection}>
          <Text>Opening</Text>
          <Text>{data.open_hrs.starting_hour}</Text>
          <Text>Closing</Text>
          <Text>{data.open_hrs.closing_hour}</Text>
        </View>
      </View>
      {props.children && <View style={styles.list}>{props.children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container_width: {
    width: Dimensions.get("window").width,
    display: "flex",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    marginBottom: 5,
    paddingHorizontal: 5,
  },
  list: { display: "flex", height: "100%" },
  mainImage: {
    height: "100%",
    width: "100%",
  },
  mainImageContainer: { borderRadius: 25, height: 90, width: 90 },
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
    fontSize: 20,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#464545",
    padding: 10,
  },
  about: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#807D7D",
    paddingHorizontal: 10,
  },
});

export default SalonCard;
