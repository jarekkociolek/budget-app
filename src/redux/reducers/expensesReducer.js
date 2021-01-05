import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function expensesReducer(state = initialState.expenses, action) {
  switch (action.type) {
    case types.TOGGLE_ADD_EXPENSE:
      return { ...state, addExpenseVisible: action.addExpenseVisible };
    case types.ADD_EXPENSE_SUCCESS:
      return { ...state, items: [...state.items, action.expense] };
    case types.UPDATE_EXPENSE_SUCCESS:
      return {
        ...state,
        items: state.items.map((expense) =>
          expense.id === action.expense.id ? action.expense : expense
        ),
      };
    case types.LOAD_EXPENSES_SUCCESS:
      return { ...state, items: action.expenses };
    case types.DELETE_EXPENSE_SUCCESS:
      return {
        ...state,
        items: state.items.filter((expense) => expense.id !== action.expenseId),
      };
    default:
      return state;
  }
}
