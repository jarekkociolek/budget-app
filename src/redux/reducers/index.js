import { combineReducers } from "redux";
import expenses from "./expensesReducer";
import categories from "./categoriesReducer";
import apiCallsInProgress from "./apiStatusReducer";
import authorization from "./authorizationReducer";

export default combineReducers({
  expenses,
  apiCallsInProgress,
  authorization,
  categories,
});
