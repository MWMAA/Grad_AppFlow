import axios, { AxiosResponse, Method } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch } from "redux";

const Link = "http://192.168.1.103:3000";

const axiosRequest = async (
  RequestMethod: Method,
  RequestUrl: string,
  data: {},
  Authenticate: boolean
) => {
  const refreshToken = await AsyncStorage.getItem("Refresh_Token");
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

export const tryAutoLogin = () => {
  return async (dispatch: Dispatch) => {
    axiosRequest("post", "/tokenRefresh", {}, true)
      .then(async (res: any) => {
        await AsyncStorage.setItem("Access_Token", res.data.accessToken);

        dispatch({
          type: "AUTHENTICATE",
          token: res.data.accessToken,
          userData: res.data.user,
        });
        return;
      })
      .catch((err) => {
        dispatch({ type: "AUTO_LOGIN_TRIED" });
        return;
      });
  };
};

export const signup = (name: string, email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    axiosRequest("post", "/SignUp", { name, email, password }, false)
      .then(async (res: any) => {
        await AsyncStorage.setItem("Access_Token", res.data.accessToken);
        await AsyncStorage.setItem("Refresh_Token", res.data.refreshToken);

        dispatch({
          type: "AUTHENTICATE",
          token: res.data.accessToken,
          userData: res.data.user,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    axiosRequest("post", "/LogIn", { email, password }, false)
      .then(async (res: any) => {
        await AsyncStorage.setItem("Access_Token", res.data.accessToken);
        await AsyncStorage.setItem("Refresh_Token", res.data.refreshToken);

        dispatch({
          type: "AUTHENTICATE",
          token: res.data.accessToken,
          userData: res.data.user,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const logout = () => {
  return async (dispatch: Dispatch) => {
    axiosRequest("post", "/LogOut", {}, true)
      .then(async (_res: any) => {
        await AsyncStorage.removeItem("Access_Token");
        await AsyncStorage.removeItem("Refresh_Token");

        dispatch({
          type: "LOGOUT",
        });
      })
      .catch((err) => console.log(err));
  };
};

export const tokenRefresh = () => {
  return async (dispatch: Dispatch) => {
    axiosRequest("post", "/tokenRefresh", {}, true)
      .then(async (res: any) => {
        const accessToken = await AsyncStorage.setItem(
          "Access_Token",
          res.data.accessToken
        );

        dispatch({
          type: "TOKEN_REFRESH",
          accessToken,
        });
      })
      .catch((err) => console.log(err));
  };
};
