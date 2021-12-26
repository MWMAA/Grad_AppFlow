import React, { useEffect } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Formik, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { Button, Input, Text } from "react-native-elements";
import { useDispatch } from "react-redux";

import * as salonActions from "../store/actions/Salon";

const SalonForm = (props: any) => {
  const dispatch = useDispatch();
  const salon = props.selectedSalon;

  const initialValues: any = {
    name: salon.name ? salon.name : "",
    about: salon.about ? salon.about : "",
    email: salon.contact_Info ? salon.contact_Info.email : "",
    landline: salon.contact_Info ? salon.contact_Info.landline : "",
    mobile: salon.contact_Info ? salon.contact_Info.mobile[0] : "",
    services: salon.services
      ? salon.services
      : [{ name: "", cost: "", description: "" }],
  };

  const validationSchema: any = Yup.object({
    name: Yup.string().required("This Field is Required!"),
    about: Yup.string().min(25).required("This Field is Required!"),
    email: Yup.string()
      .email("Invalid E-mail format!")
      .required("This Field is Required!"),
    landline: Yup.number(),
    mobile: Yup.number().required("This Field is Required!"),
    services: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Please add at least 1 service"),
        cost: Yup.number().required("You must add a number"),
        description: Yup.string().min(10).required("Please add a description"),
      })
    ),
  });

  const submitHandler = async (values: object, newUser: boolean) => {
    let action;
    if (newUser) {
      action = salonActions.createSalon(values);
    } else {
      action = salonActions.updateSalon(salon._id, values);
    }
    try {
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={155}>
      <ScrollView>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            submitHandler(values, true);
          }}
          validateOnMount
        >
          {({ values, handleSubmit, handleChange, isSubmitting, isValid }) => (
            <View>
              <Text h4 style={styles.title}>
                Salon Data
              </Text>
              <Field
                component={Input}
                name="name"
                type="text"
                label="Name"
                value={values.name}
                onChangeText={handleChange("name")}
              />
              <Field
                component={Input}
                name="email"
                type="email"
                label="E-mail"
                value={values.email}
                onChangeText={handleChange("email")}
              />
              <View style={styles.input_group}>
                <View style={styles.text_input}>
                  <Field
                    component={Input}
                    name="landline"
                    type="text"
                    label="Landline"
                    value={values.landline}
                    onChangeText={handleChange("landline")}
                  />
                </View>
                <View style={styles.text_input}>
                  <Field
                    component={Input}
                    name="mobile"
                    type="number"
                    label="Mobile"
                    value={values.mobile}
                    onChangeText={handleChange("mobile")}
                  />
                </View>
              </View>
              <Field
                component={Input}
                name="about"
                type="text"
                label="About"
                value={values.about}
                onChangeText={handleChange("about")}
              />
              <Text h4 style={styles.title}>
                Services
              </Text>
              <FieldArray name="services">
                {(arrayHelpers) => (
                  <View>
                    {arrayHelpers.form.values.services.map(
                      (sevice: object, index: number) => (
                        <View key={index}>
                          <View style={styles.input_group}>
                            <View style={styles.text_input}>
                              <Field
                                component={Input}
                                name="name"
                                type="text"
                                label="Name"
                                value={values.services[index].name}
                                onChangeText={handleChange(
                                  `services[${index}].name`
                                )}
                              />
                            </View>
                            <View style={styles.text_input}>
                              <Field
                                component={Input}
                                name="cost"
                                // type="number"
                                label="Cost"
                                value={() =>
                                  values.services[index].cost.toString()
                                }
                                onChangeText={handleChange(
                                  `services[${index}].cost`
                                )}
                              />
                            </View>
                          </View>
                          <Field
                            component={Input}
                            name="description"
                            type="text"
                            label="Description"
                            value={values.services[index].description}
                            onChangeText={handleChange(
                              `services[${index}].description`
                            )}
                          />
                        </View>
                      )
                    )}
                    <Button
                      title="Add Another Service"
                      type="clear"
                      onPress={() =>
                        arrayHelpers.push({
                          name: "",
                          cost: "",
                          description: "",
                        })
                      }
                    />
                  </View>
                )}
              </FieldArray>
              <Button
                //   color="primary"
                //   size="large"
                title="Save"
                onPress={() => console.log(values)}
                disabled={!isValid || isSubmitting}
              />
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    marginBottom: 20,
  },
  title: { marginLeft: 7 },
  input_group: {
    display: "flex",
    flexDirection: "row",
  },
  text_input: {
    width: Dimensions.get("window").width / 2,
  },
});

export default SalonForm;
