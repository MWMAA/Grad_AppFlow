import { AnyAction } from "redux";

interface stateInterface {
  token: string | null;
  userData: {} | null;
  didTryAutoLogin: boolean;
}

const initialState: stateInterface = {
  token: null,
  userData: null,
  didTryAutoLogin: false,
};

export const userReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case "AUTHENTICATE":
      return {
        token: action.token,
        userData: action.userData,
        didTryAutoLogin: true,
      };
    case "LOGOUT":
      return { ...initialState, didTryAutoLogin: false };
    case "TOKEN_REFRESH":
      return { ...state, token: action.accessToken };
    case "AUTO_LOGIN_TRIED":
      return { ...state, didTryAutoLogin: true };
    default:
      return state;
  }
};
