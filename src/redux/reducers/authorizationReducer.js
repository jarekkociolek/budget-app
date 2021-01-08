import initialState from "./initialState";
import * as types from "../actions/actionTypes";

export default function authorizationReducer(
  state = initialState.authorization,
  action
) {
  switch (action.type) {
    case types.SET_USER_AUTHENTICATED:
      return { ...state, isAuthenticated: action.isAuthenticated };
    default:
      return state;
  }
}
