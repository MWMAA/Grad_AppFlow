import "react-native-gesture-handler";
import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { userReducer } from "./store/reducers/User";
import AppNavigator from "./navigation/AppNavigator";
import { salonReducer } from "./store/reducers/Salon";

const rootReducer = combineReducers({
  user: userReducer,
  salon: salonReducer,
  // reviews: salonReducer,
  // appointments: salonReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </SafeAreaProvider>
  );
}
