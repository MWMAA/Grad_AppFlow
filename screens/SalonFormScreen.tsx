import React from "react";
import SalonForm from "../components/SalonForm";

let selectedSalon: any = null;

export default function SalonFormScreen(props: any) {
  if (props.route.params) {
    selectedSalon = props.route.params.salon;
  }

  return <SalonForm selectedSalon={selectedSalon} />;
}

export const screenOptions = (_navData: any) => {
  return {
    headerTitle: selectedSalon ? "Add Salon" : "Edit Salon",
  };
};
