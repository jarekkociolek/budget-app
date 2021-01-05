import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers/index.js";
import moment from "moment";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
);

export default store;
