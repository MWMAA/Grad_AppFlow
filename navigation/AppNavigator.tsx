import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { SalonBarNavigator } from "./SalonNavigator";
import AuthScreen from "../screens/AuthScreen";
import { RootState } from "../App";
import StartupScreen from "../screens/StartupScreen";
import useCachedResources from "../hooks/useCashedResources";

const AppNavigator: React.FC = (props: any) => {
  const isLoadingComplete = useCachedResources();
  const token = useSelector((state: RootState) => !!state.user.token);
  const didTryLogin = useSelector(
    (state: RootState) => state.user.didTryAutoLogin
  );

  if (!isLoadingComplete) {
    return <StartupScreen />;
  }

  return (
    <NavigationContainer>
      {token && <SalonBarNavigator />}
      {!token && <AuthScreen />}
      {/* {!token && !didTryLogin && <StartupScreen />} */}
    </NavigationContainer>
  );
};

export default AppNavigator;
