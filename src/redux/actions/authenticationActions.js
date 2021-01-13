import * as types from "./actionTypes";

export function setUserAuthenticated(user) {
  return { type: types.SET_USER_AUTHENTICATED, user };
}
