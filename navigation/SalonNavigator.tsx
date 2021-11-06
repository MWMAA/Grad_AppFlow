import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen, {
  screenOptions as ProfileOptions,
} from "../screens/ProfileScreen";
import OrdersScreen from "../screens/OrdersScreen";
import CameraComponent from "../components/CameraComponent";
import MapComponent from "../components/MapComponent";
import SalonDetailScreen, {
  screenOptions as SalonDetailsOptions,
} from "../screens/salons/SalonDetailScreen";
import CartScreen from "../screens/CartScreen";

const SalonStack = createNativeStackNavigator();

const SalonStackNavigator = () => {
  return (
    <SalonStack.Navigator>
      <SalonStack.Screen name="Home" component={HomeScreen} />
      <SalonStack.Screen
        name="DetailScreen"
        component={SalonDetailScreen}
        options={SalonDetailsOptions}
      />
      <SalonStack.Screen name="My Cart" component={CartScreen} />
    </SalonStack.Navigator>
  );
};

const tabBarOption = ({ route }: any) => ({
  headerShown: false,
  tabBarIcon: ({ focused, color, size }: any) => {
    let iconName: React.ComponentProps<typeof Ionicons>["name"] | undefined;

    if (route.name === "Camera") {
      iconName = "camera-outline";
    } else if (route.name === "Salon") {
      iconName = focused ? "home" : "home-outline";
    } else if (route.name === "Profile") {
      iconName = focused ? "list" : "list-outline";
    } else if (route.name === "Map") {
      iconName = focused ? "location" : "location-outline";
    } else if (route.name === "Appointments") {
      iconName = focused ? "document-text" : "document-text-outline";
    }

    return <Ionicons name={iconName} size={size} color={color} />;
  },
});

const SettingsStackNavigator = createNativeStackNavigator();

const SettingsNavigator = () => {
  return (
    <SettingsStackNavigator.Navigator>
      <SettingsStackNavigator.Screen
        name="Configurations"
        component={ProfileScreen}
        options={ProfileOptions}
      />
    </SettingsStackNavigator.Navigator>
  );
};

const OrderssStackNavigator = createNativeStackNavigator();

const OrderssNavigator = () => {
  return (
    <SettingsStackNavigator.Navigator>
      <SettingsStackNavigator.Screen
        name="Previous Appointments"
        component={OrdersScreen}
      />
    </SettingsStackNavigator.Navigator>
  );
};

const BottomDrawer = createBottomTabNavigator();
export const SalonBarNavigator = () => {
  return (
    <BottomDrawer.Navigator screenOptions={tabBarOption}>
      <BottomDrawer.Screen name="Salon" component={SalonStackNavigator} />
      <BottomDrawer.Screen name="Map" component={MapComponent} />
      <BottomDrawer.Screen
        name="Camera"
        component={CameraComponent}
        options={{
          tabBarStyle: { display: "none" },
          tabBarShowLabel: false,
        }}
      />
      <BottomDrawer.Screen name="Appointments" component={OrderssNavigator} />
      <BottomDrawer.Screen name="Profile" component={SettingsNavigator} />
    </BottomDrawer.Navigator>
  );
};
