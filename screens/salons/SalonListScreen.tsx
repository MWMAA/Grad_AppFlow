import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, StyleSheet } from "react-native";
import SalonCard from "../../components/SalonCard";
// import * as salonActions from "../../store/actions/salons";
import { useDispatch, useSelector } from "react-redux";

const SalonListScreen = (props: any) => {
  const Salons = useSelector((state) => state.salon.salonData);
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(0);

  const selectItemHandler = (_id: string, name: string) => {
    props.navigation.navigate("DetailScreen", {
      salonId: _id,
      salonName: name,
    });
  };

  // useEffect(() => {
  //   const getSalons = () => {
  //     dispatch(salonActions.fetchSalons(skip));
  //     setSkip(skip + 5);
  //   };
  //   getSalons();
  // }, [dispatch]);

  // const fetchData = () => {
  //   dispatch(salonActions.fetchSalons(skip));
  //   setSkip(skip + 5);
  // };

  return (
    <FlatList
      data={Salons}
      keyExtractor={(item) => item._id}
      // onEndReached={fetchData}
      style={styles.container}
      renderItem={(itemData) => (
        <TouchableOpacity
          onPress={() => {
            selectItemHandler(itemData.item._id, itemData.item.name);
          }}
        >
          <SalonCard data={itemData.item} />
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});

export default SalonListScreen;
