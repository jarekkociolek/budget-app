import initialState from "./initialState";
import * as types from "../actions/actionTypes";

export default function categoriesReducer(
  state = initialState.categories,
  action
) {
  switch (action.type) {
    case types.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        items: state.items.filter(
          (category) => category.id !== action.categoryId
        ),
      };
    default:
      return state;
  }
}
