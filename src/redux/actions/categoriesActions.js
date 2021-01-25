import * as actionTypes from "./actionTypes";
import { beginApiCall } from "../actions/apiStatusActions";

export const deleteCategorySuccess = (categoryId) => ({
  type: actionTypes.DELETE_CATEGORY_SUCCESS,
  categoryId,
});

export const editCategorySuccess = (category) => ({
  type: actionTypes.EDIT_CATEGORIES_SUCCESS,
  category,
});

export const addCategorySuccess = (category) => ({
  type: actionTypes.ADD_CATEGORY_SUCCESS,
  category,
});

export function deleteCategory(categoryId) {
  return (dispatch) => {
    return dispatch(deleteCategorySuccess(categoryId));
  };
}

export function editCategory(category) {
  return (dispatch) => {
    dispatch(beginApiCall());
    return dispatch(editCategorySuccess(category));
  };
}

export function addCategory(category) {
  return (dispatch) => {
    dispatch(beginApiCall());
    return dispatch(addCategorySuccess(category));
  };
}
