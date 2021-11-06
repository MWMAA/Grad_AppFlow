import "react-native-gesture-handler";
import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AppNavigator from "./navigation/AppNavigator";
import { userReducer } from "./store/reducers/User";
import { salonReducer } from "./store/reducers/Salon";
import cartReducer from "./store/reducers/cart";
import orderReducer from "./store/reducers/orders";
import logger from "redux-logger";

const rootReducer = combineReducers({
  user: userReducer,
  salon: salonReducer,
  cart: cartReducer,
  orders: orderReducer,
  // reviews: salonReducer,
  // appointments: salonReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  // applyMiddleware(ReduxThunk, logger),
  applyMiddleware(ReduxThunk)
);

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </SafeAreaProvider>
  );
}
