import { combineReducers } from "redux";
import expenses from "./expensesReducer";
import apiCallsInProgress from "./apiStatusReducer";

export default combineReducers({
  expenses,
  apiCallsInProgress
});
