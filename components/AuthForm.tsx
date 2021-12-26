import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Button,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthorizationFrom } from "../interfaces/Forms";

interface Props {
  onSubmit: (values: AuthorizationFrom, newUser: boolean) => Promise<void>;
}

export const AuthForm: React.FC<Props> = (props) => {
  const [newUser, setNewUser] = useState(false);

  const initialValues: AuthorizationFrom = {
    email: "",
    password: "",
    username: "",
  };

  const ValidationSchema = () => {
    let validation;
    if (newUser) {
      validation = Yup.object({
        email: Yup.string().email().required("This Field is Required!"),
        password: Yup.string().min(8).required("This Field is Required!"),
        username: Yup.string().required("This Field is Required!"),
      });
    } else {
      validation = Yup.object({
        email: Yup.string().email().required("This Field is Required!"),
        password: Yup.string().min(8).required("This Field is Required!"),
      });
    }
    return validation;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ValidationSchema}
      onSubmit={(values) => props.onSubmit(values, newUser)}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <Text style={styles.logo}>Beauty Salons</Text>
          {newUser && errors.username && touched.username ? (
            <Text style={styles.errorTxt}>{errors.username}</Text>
          ) : null}
          {newUser && (
            <View style={styles.inputView}>
              <TextInput
                placeholder="UserName..."
                style={styles.inputText}
                value={values.username}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
              />
            </View>
          )}
          {errors.email && touched.email ? (
            <Text style={styles.errorTxt}>{errors.email}</Text>
          ) : null}
          <View style={styles.inputView}>
            <TextInput
              placeholder="Email..."
              value={values.email}
              style={styles.inputText}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
            />
          </View>
          {errors.password && touched.password ? (
            <Text style={styles.errorTxt}>{errors.password}</Text>
          ) : null}
          <View style={styles.inputView}>
            <TextInput
              secureTextEntry
              placeholder="Password..."
              style={styles.inputText}
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
            />
          </View>
          {!newUser && (
            <TouchableOpacity>
              <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.loginText}>
              {!newUser ? "LOGIN" : "SIGNUP"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setNewUser(!newUser);
            }}
          >
            <Text style={styles.changeText}>
              {!newUser
                ? "New to the application? Signup here!"
                : "ALready have an account?"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
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
    fontFamily: "open-sans-bold",
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    fontFamily: "open-sans",
    height: 50,
    color: "white",
  },
  forgot: {
    fontFamily: "open-sans",
    color: "white",
    fontSize: 14,
  },
  loginBtn: {
    width: "50%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  changeText: {
    color: "white",
    fontFamily: "open-sans",
    fontSize: 15,
  },
  errorTxt: {
    color: "red",
    width: "70%",
  },
});
