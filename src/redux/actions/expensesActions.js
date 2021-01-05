import * as actionTypes from "./actionTypes";
import * as expensesApi from "../../api/expenseApi";
import { beginApiCall, apiCallError } from "../actions/apiStatusActions";

export const loadExpensesSuccess = (expenses) => ({
  type: actionTypes.LOAD_EXPENSES_SUCCESS,
  expenses,
});

export const createExpenseSuccess = (expense) => ({
  type: actionTypes.ADD_EXPENSE_SUCCESS,
  expense,
});

export const updateExpenseSuccess = (expense) => ({
  type: actionTypes.UPDATE_EXPENSE_SUCCESS,
  expense,
});

export const deleteExpenseSuccess = (expenseId) => ({
  type: actionTypes.DELETE_EXPENSE_SUCCESS,
  expenseId,
});

export const toggleAddExpense = (addExpenseVisible) => ({
  type: actionTypes.TOGGLE_ADD_EXPENSE,
  addExpenseVisible,
});

export function loadExpenses() {
  return (dispatch) => {
    dispatch(beginApiCall());
    return expensesApi
      .getExpenses()
      .then((expenses) => {
        dispatch(loadExpensesSuccess(expenses));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function saveExpense(expense) {
  return (dispatch) => {
    dispatch(beginApiCall());
    return expensesApi
      .saveExpense(expense)
      .then((savedExpense) => {
        expense.id
          ? dispatch(updateExpenseSuccess(savedExpense))
          : dispatch(createExpenseSuccess(savedExpense));
      })
      .catch((error) => {
        dispatch(apiCallError());
        throw error;
      });
  };
}

export function deleteExpense(expenseId) {
  return (dispatch) => {
    dispatch(beginApiCall());
    return expensesApi
      .deleteExpense(expenseId)
      .then((deletedExpense) => {
        dispatch(deleteExpenseSuccess(expenseId));
      })
      .catch((error) => {
        dispatch(apiCallError());
        throw error;
      });
  };
}
