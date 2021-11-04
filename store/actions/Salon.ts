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
  const refreshToken = await AsyncStorage.getItem("Access_Token");
  return axios({
    method: `${RequestMethod}`,
    url: Link + RequestUrl,
    data,
    headers: {
      "Content-type": "application/json",
      Authorization: Authenticate ? `Bearer ${refreshToken}` : null,
    },
  }).catch((err) => console.log(err));
};

// export const createSalon = (salonData: {}) => {
//   return async (dispatch: Dispatch) => {
//     axiosRequest("post", "/salons", { ...salonData }, true)
//       .then(async (res: any) => {
//         dispatch({
//           type: "ADD_SALON",
//           salonData: res.data,
//         });
//       })
//       .catch((err) => console.log(err));
//   };
// };

export const setSalons = (_skip: number) => {
  return async (dispatch: Dispatch) => {
    axiosRequest("get", `/salons`, {}, true)
      .then(async (res: any) => {
        dispatch({
          type: "SET_SALONS",
          salonData: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const updateSalon = (id: string, updates: any) => {
  return async (dispatch: Dispatch) => {
    axiosRequest("patch", `/salons/${id}`, { updates }, true)
      .then(async (res: any) => {
        dispatch({
          type: "UPDATE_SALON",
          updates,
          id,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteSalon = (id: string) => {
  return async (dispatch: Dispatch) => {
    axiosRequest("delete", `/salons/${id}`, {}, true)
      .then(async (res: any) => {
        dispatch({
          type: "DELETE_SALON",
          id,
        });
      })
      .catch((err) => console.log(err));
  };
};
