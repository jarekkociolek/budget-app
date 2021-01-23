import * as actionTypes from "./actionTypes";

export const deleteCategorySuccess = (categoryId) => ({
  type: actionTypes.DELETE_CATEGORY_SUCCESS,
  categoryId,
});

export function deleteCategory(categoryId) {
  return (dispatch) => {
    return dispatch(deleteCategorySuccess(categoryId));
  };
}
