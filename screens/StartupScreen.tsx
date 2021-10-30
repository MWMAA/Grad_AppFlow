import React, { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import * as authActions from "../store/actions/User";

const StartupScreen: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.tryAutoLogin());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>iGRAD</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
});

export default StartupScreen;
