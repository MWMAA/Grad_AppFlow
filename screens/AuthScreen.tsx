import React from "react";

import { AuthForm } from "../components/AuthForm";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/User";
import { AuthorizationFrom } from "../interfaces/Forms";

const AuthScreen: React.FC = () => {
  const dispatch = useDispatch();

  const authHandler = async (values: AuthorizationFrom, newUser: boolean) => {
    let action;
    if (newUser) {
      action = authActions.signup(
        values.username as string,
        values.email,
        values.password
      );
    } else {
      action = authActions.login(values.email, values.password);
    }
    try {
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };

  return <AuthForm onSubmit={authHandler} />;
};

export default AuthScreen;
