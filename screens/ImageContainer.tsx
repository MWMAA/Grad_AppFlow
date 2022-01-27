import * as React from "react";
import { Text, View, SafeAreaView, Image, StyleSheet } from "react-native";

import Carousel from "react-native-snap-carousel";

export default class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      activeIndex: 0,
      carouselItems: [
        {
          desc: "Sleek hairsyles",
          link: "http://192.168.1.101:5000/content/3.PNG",
        },
        {
          desc: "Sleek hairsyles",
          link: "http://192.168.1.101:5000/content/3.PNG",
        },
        {
          desc: "Sleek hairsyles",
          link: "http://192.168.1.101:5000/content/3.PNG",
        },
        {
          desc: "Sleek hairsyles",
          link: "http://192.168.1.101:5000/content/3.PNG",
        },
      ],
    };
  }

  _renderItem({ item, index }) {
    return (
      <View
        style={{
          backgroundColor: "floralwhite",
          borderRadius: 5,
          height: 250,
          padding: 50,
          marginLeft: 25,
          marginRight: 25,
        }}
      >
        <Image source={{ uri: item.link }} style={styles.ImageContainer} />
        <Text>{item.desc}</Text>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "gray", paddingTop: 50 }}
      >
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
        >
          <Carousel
            layout={"stack"}
            ref={(ref) => (this.carousel = ref)}
            data={this.state.carouselItems}
            sliderWidth={200}
            itemWidth={400}
            renderItem={this._renderItem}
            onSnapToItem={(index) => this.setState({ activeIndex: index })}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  ImageContainer: {
    height: "100%",
    width: "100%",
  },
});
