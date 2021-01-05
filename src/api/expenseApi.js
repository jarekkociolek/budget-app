import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/expenses/";

export function getExpenses() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveExpense(expense) {
  return fetch(baseUrl + (expense.id || ""), {
    method: expense.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(expense)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteExpense(expenseId) {
  return fetch(baseUrl + expenseId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
