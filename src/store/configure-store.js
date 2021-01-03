/* istanbul ignore file */
import { createBrowserHistory } from "history";
import { applyMiddleware } from "redux";
import { createStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "../slices";

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        thunkMiddleware
        // ... other middlewares ...
      )
    )
  );

  return store;
}
