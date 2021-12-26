export const ADD_ORDER = "ADD_ORDER";

import axios, { Method } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch } from "redux";

const Link = "http://192.168.1.103:3000";

const axiosRequest = async (
  RequestMethod: Method,
  RequestUrl: string,
  data: {},
  Authenticate: boolean
) => {
  const accessToken = await AsyncStorage.getItem("Access_Token");
  axios({
    method: `${RequestMethod}`,
    url: Link + RequestUrl,
    data,
    headers: {
      "Content-type": "application/json",
      Authorization: Authenticate ? `Bearer ${accessToken}` : null,
    },
  });
};

export const addOrder = (
  cartItems: [],
  totalAmount: number,
  salonId: string
) => {
  const services = cartItems.map((item) => {
    return { name: item.name, cost: item.cost, description: item.description };
  });
  console.log(services);
  return async (dispatch: Dispatch) => {
    axiosRequest(
      "post",
      "/appointments",
      { services, salon: salonId, totalCost: totalAmount },
      true
    )
      .then(async (res: any) => {
        dispatch({
          type: ADD_ORDER,
          orderData: { items: cartItems, amount: totalAmount },
        });
      })
      .catch((err) => console.log(err));
  };
};
