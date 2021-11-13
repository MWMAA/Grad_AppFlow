import axios, { Method } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch } from "redux";

const Link = "http://192.168.1.101:3000";

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

export const createAppointment = (salonData: {}) => {
  return async (dispatch: Dispatch) => {
    axiosRequest("post", "/appointments", { ...salonData }, true)
      .then(async (res: any) => {
        dispatch({
          type: "SET_ARTIFACTS",
          products: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const readAllAppointments = () => {
  return async (dispatch: Dispatch) => {
    axiosRequest("get", "/appointments", {}, true)
      .then(async (res: any) => {
        dispatch({
          type: "SET_ARTIFACTS",
          products: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const readAppointmentByID = (id: string) => {
  return async (dispatch: Dispatch) => {
    axiosRequest("get", `/appointments/${id}`, {}, true)
      .then(async (res: any) => {
        dispatch({
          type: "SET_ARTIFACTS",
          products: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const updateAppointment = (id: string) => {
  return async (dispatch: Dispatch) => {
    axiosRequest("patch", `/appointments/${id}`, {}, true)
      .then(async (res: any) => {
        dispatch({
          type: "SET_ARTIFACTS",
          products: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteAppointment = (id: string) => {
  return async (dispatch: Dispatch) => {
    axiosRequest("delete", `/appointments/${id}`, {}, true)
      .then(async (res: any) => {
        dispatch({
          type: "SET_ARTIFACTS",
          products: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const completeAppointment = (id: string) => {
  return async (dispatch: Dispatch) => {
    axiosRequest("post", `/completeAppointment/${id}`, {}, true)
      .then(async (res: any) => {
        dispatch({
          type: "SET_ARTIFACTS",
          products: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};
