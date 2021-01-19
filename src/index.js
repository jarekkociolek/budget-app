import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";
import "./i18n";
import PageLoader from "./components/common/PageLoader";

ReactDOM.render(
  <Provider store={store}>
    <React.Suspense fallback={PageLoader()}>
      <Router>
        <App />
      </Router>
    </React.Suspense>
  </Provider>,
  document.getElementById("app")
);
