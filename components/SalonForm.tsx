import React from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { Button, Input, Text } from "react-native-elements";

const SalonForm = (props: any) => {
  const salon = props.selectedSalon;

  const initialValues: any = {
    name: salon ? salon.name : "",
    about: salon ? salon.about : "",
    email: salon ? salon.contact_Info.email : "",
    landline: salon ? parseInt(salon.contact_Info.landline) : "",
    mobile: salon ? salon.contact_Info.mobile[0] : "",
    services: [{ name: "", cost: "", description: "" }],
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
        description: Yup.string().min(25).required("Please add a description"),
      })
    ),
  });

  return (
    <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={75}>
      <ScrollView>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ values, handleSubmit, handleChange }) => (
            <View>
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
              <Field
                component={Input}
                name="landline"
                type="number"
                label="Landline"
                value={values.landline}
                onChangeText={handleChange("landline")}
              />
              <Field
                component={Input}
                name="mobile"
                type="text"
                label="Mobile"
                value={values.mobile}
                onChangeText={handleChange("mobile")}
              />
              <Field
                component={Input}
                name="about"
                type="text"
                label="About"
                value={values.about}
                onChangeText={handleChange("about")}
              />
              <Text h4>Services</Text>
              <Field
                component={Input}
                name="name"
                type="text"
                label="Name"
                value={values.services.name}
                //   onChangeText={handleChange("services.name")}
              />
              <Field
                component={Input}
                name="cost"
                type="number"
                label="Cost"
                value={values.services.cost}
                //   onChangeText={handleChange("services.cost")}
              />
              <Field
                component={Input}
                name="description"
                type="text"
                label="Description"
                value={values.services.description}
                //   onChangeText={handleChange("services.description")}
              />
              <Button
                //   color="primary"
                //   size="large"
                title="Button with icon component"
                onPress={() => handleSubmit(values)}
                //   disabled={!formik.isValid || formik.isSubmitting}
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
});

export default SalonForm;
