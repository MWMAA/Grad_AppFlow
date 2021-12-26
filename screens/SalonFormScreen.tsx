import React from "react";
import SalonForm from "../components/SalonForm";

let selectedSalon: any = null;

export default function SalonFormScreen(props: any) {
  try {
    selectedSalon = props.route.params.salon;
    props.navigation.setOptions({ headerTitle: "Edit Salon" });
  } catch (error) {
    selectedSalon = {};
    props.navigation.setOptions({ headerTitle: "Add Salon" });
  }

  return <SalonForm selectedSalon={selectedSalon} />;
}
