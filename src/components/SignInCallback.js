import React, { useEffect } from "react";
import * as userService from "../userService";
import { useHistory } from "react-router-dom";

const SignInCallback = () => {
  const history = useHistory();
  useEffect(() => {
    async function signinAsync() {
      await userService.signinRedirectCallback();
      history.push("/");
    }
    signinAsync();
  }, [history]);
  return <h1>You are being logged in...</h1>;
};

export default SignInCallback;
