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

// export const createSalon = (salonData: {}) => {
//   return async (dispatch: Dispatch) => {
//     axiosRequest("post", "/salons", { ...salonData }, true)
//       .then(async (res: any) => {
//         dispatch({
//           type: "SET_ARTIFACTS",
//           products: res.data,
//         });
//       })
//       .catch((err) => console.log(err));
//   };
// };

// export const readAllSalons = () => {
//   return async (dispatch: Dispatch) => {
//     axiosRequest("get", "/salons", {}, true)
//       .then(async (res: any) => {
//         dispatch({
//           type: "SET_ARTIFACTS",
//           products: res.data,
//         });
//       })
//       .catch((err) => console.log(err));
//   };
// };

// export const readSalonByID = (id: string) => {
//   return async (dispatch: Dispatch) => {
//     axiosRequest("get", `/salons/${id}`, {}, true)
//       .then(async (res: any) => {
//         dispatch({
//           type: "SET_ARTIFACTS",
//           products: res.data,
//         });
//       })
//       .catch((err) => console.log(err));
//   };
// };

// export const updateSalon = (id: string) => {
//   return async (dispatch: Dispatch) => {
//     axiosRequest("patch", `/salons/${id}`, {}, true)
//       .then(async (res: any) => {
//         dispatch({
//           type: "SET_ARTIFACTS",
//           products: res.data,
//         });
//       })
//       .catch((err) => console.log(err));
//   };
// };

// export const deleteSalon = (id: string) => {
//   return async (dispatch: Dispatch) => {
//     axiosRequest("delete", `/salons/${id}`, {}, true)
//       .then(async (res: any) => {
//         dispatch({
//           type: "SET_ARTIFACTS",
//           products: res.data,
//         });
//       })
//       .catch((err) => console.log(err));
//   };
// };

// ================================
export const createSalon = (salonData: {}) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: "ADD_SALON",
      salonData,
    });
  };
};

export const readAllSalons = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: "GET_ALL_SALONS",
    });
  };
};

export const readSalonByID = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: "GET_SALON",
      id,
    });
  };
};

// export const updateSalon = (id: string) => {
//   return async (dispatch: Dispatch) => {
//     dispatch({
//       type: "UPDATE_SALON",
//       products: res.data,
//     });
//   };
// };

export const deleteSalon = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: "DELETE_SALON",
      id,
    });
  };
};
