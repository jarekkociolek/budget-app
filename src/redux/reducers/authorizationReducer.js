import initialState from "./initialState";

export default function authorizationReducer(
  state = initialState.authorization,
  action
) {
  switch (action.type) {
    default:
      return state;
  }
}
