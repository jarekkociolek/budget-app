import * as types from "./actionTypes";

export function setUserAuthenticated(isAuthenticated) {
  return { type: types.SET_USER_AUTHENTICATED, isAuthenticated };
}
