import initialState from "./initialState";

export default function categoriesReducer(
  state = initialState.categories,
  action
) {
  switch (action.type) {
    default:
      return state;
  }
}
