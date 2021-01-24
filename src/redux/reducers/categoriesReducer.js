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
    case types.EDIT_CATEGORIES_SUCCESS:
      return {
        ...state,
        items: state.items.map((category) =>
          category.id === action.category.id ? action.category : category
        ),
      };
    default:
      return state;
  }
}
