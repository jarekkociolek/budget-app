import { UserManager } from "oidc-client";
import { oidcConfig } from "./config";

const userManager = new UserManager(oidcConfig);

export function signinRedirect() {
  return userManager.signinRedirect();
}

export function signinRedirectCallback() {
  return userManager.signinRedirectCallback().then(
    () => {
      window.history.replaceState(
        {},
        window.document.title,
        window.location.origin
      );
    },
    (error) => {
      console.error(error);
    }
  );
}

export function signoutRedirect() {
  userManager.getUser().then((user) => {
    userManager.clearStaleState();
    userManager.removeUser();
    return userManager.signoutRedirect({ id_token_hint: user.id_token });
  });
}

export function signoutRedirectCallback() {
  userManager.clearStaleState();
  userManager.removeUser();
  return userManager.signoutRedirectCallback();
}

export function getUser() {
  return userManager.getUser();
}

export default userManager;
