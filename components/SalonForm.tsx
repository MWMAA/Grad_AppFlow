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
    contact_Info: {
      email: salon.contact_Info ? salon.contact_Info.email : "",
      landline: salon.contact_Info ? salon.contact_Info.landline : "",
      mobile: salon.contact_Info ? salon.contact_Info.mobile[0] : "",
    },
    address: {
      country: salon.address.country ? salon.address.country : "",
      city: salon.address.city ? salon.address.city : "",
      street: salon.address.street ? salon.address.street : "",
      building_number: salon.address.building_number
        ? salon.address.building_number
        : "",
    },
    services: salon.services
      ? salon.services
      : [{ name: "", cost: "", description: "" }],
  };

  const validationSchema: any = Yup.object({
    name: Yup.string().required("This Field is Required!"),
    about: Yup.string().min(25).required("This Field is Required!"),
    contact_Info: Yup.object().shape({
      email: Yup.string()
        .email("Invalid E-mail format!")
        .required("This Field is Required!"),
      landline: Yup.number(),
      mobile: Yup.number().required("This Field is Required!"),
    }),
    address: Yup.object().shape({
      country: Yup.string().required("This Field is Required!"),
      city: Yup.string().required("This Field is Required!"),
      street: Yup.string().required("This Field is Required!"),
      building_number: Yup.string().required("This Field is Required!"),
    }),
    services: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Please add at least 1 service"),
        cost: Yup.number().required("You must add a number"),
        description: Yup.string().required("Please add a description"),
      })
    ),
  });

  const submitHandler = async (values: object) => {
    let action;
    if (!salon._id) {
      action = salonActions.createSalon(values);
    } else {
      action = salonActions.updateSalon(salon._id, values);
    }
    try {
      dispatch(action);
      // props.navigation.goBack();
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
            submitHandler(values);
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
                value={values.contact_Info.email}
                onChangeText={handleChange("contact_Info.email")}
              />
              <View style={styles.input_group}>
                <View style={styles.text_input}>
                  <Field
                    component={Input}
                    name="landline"
                    keyboardType="numeric"
                    label="Landline"
                    value={values.contact_Info.landline}
                    onChangeText={handleChange("contact_Info.landline")}
                  />
                </View>
                <View style={styles.text_input}>
                  <Field
                    component={Input}
                    name="mobile"
                    keyboardType="numeric"
                    label="Mobile"
                    value={values.contact_Info.mobile}
                    onChangeText={handleChange("contact_Info.mobile")}
                  />
                </View>
              </View>
              <Field
                component={Input}
                name="about"
                label="About"
                value={values.about}
                onChangeText={handleChange("about")}
              />
              <Text h4 style={styles.title}>
                Location
              </Text>
              <View style={styles.input_group}>
                <View style={styles.text_input}>
                  <Field
                    component={Input}
                    name="country"
                    label="Country"
                    value={values.address.country}
                    onChangeText={handleChange("address.country")}
                  />
                </View>
                <View style={styles.text_input}>
                  <Field
                    component={Input}
                    name="city"
                    label="City"
                    value={values.address.city}
                    onChangeText={handleChange("address.city")}
                  />
                </View>
              </View>
              <View style={styles.input_group}>
                <View style={styles.text_input}>
                  <Field
                    component={Input}
                    name="street"
                    label="Street"
                    value={values.address.street}
                    onChangeText={handleChange("address.street")}
                  />
                </View>
                <View style={styles.text_input}>
                  <Field
                    component={Input}
                    name="building_number"
                    label="Building Number"
                    value={values.address.building_number}
                    onChangeText={handleChange("address.building_number")}
                  />
                </View>
              </View>
              <Text h4 style={styles.title}>
                Services
              </Text>
              <FieldArray name="services">
                {(arrayHelpers) => (
                  <View>
                    {arrayHelpers.form.values.services.map(
                      (service: object, index: number) => (
                        <View key={index}>
                          <View style={styles.input_group}>
                            <View style={styles.text_input}>
                              <Field
                                component={Input}
                                name="name"
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
                                label="Cost"
                                value={() =>
                                  values.services[index].cost.toString()
                                }
                                onChangeText={handleChange(
                                  `services[${index}].cost`
                                )}
                                keyboardType="numeric"
                              />
                            </View>
                          </View>
                          <Field
                            component={Input}
                            name="description"
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
                title="Save"
                onPress={handleSubmit}
                // disabled={!isValid || isSubmitting}
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
