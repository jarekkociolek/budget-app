import { UserManager } from "oidc-client";

const config = {
  authority: "",
  client_id: "",
  redirect_uri: "",
  response_type: "i",
  scope: "",
  post_logout_redirect_uri: "",
};

const userManager = new UserManager(config);

export function signinRedirect() {
  return userManager.signinRedirect();
}

export function signinRedirectCallback() {
  return userManager.signinRedirectCallback();
}

export function signoutRedirect() {
  userManager.clearStaleState();
  userManager.removeUser();
  return userManager.signoutRedirect();
}

export function signoutRedirectCallback() {
  userManager.clearStaleState();
  userManager.removeUser();
  return userManager.signoutRedirectCallback();
}

export default userManager;
