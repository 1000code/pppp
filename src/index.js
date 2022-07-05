import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./Assets/css/App.css";
import "react-datepicker/dist/react-datepicker.css";

import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./Reducer/Index";

const store = createStore(rootReducer, composeWithDevTools());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
