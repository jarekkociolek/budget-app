import { UserManager } from "oidc-client";

const config = {
  authority: "",
  client_id: "",
  redirect_uri: "",
  response_type: "",
  scope: "",
  post_logout_redirect_uri: "",
};

const userManager = new UserManager(config);

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
