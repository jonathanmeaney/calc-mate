import React from "react";
import ReactDOM from "react-dom";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import configureStore, { history } from "./store/configure-store";

import App from "./app";

const rootElement = document.getElementById("root");
const persistedState = localStorage.getItem('calc-mate')
                       ? JSON.parse(localStorage.getItem('calc-mate'))
                       : {}
const store = configureStore(persistedState);
store.subscribe(()=>{
  localStorage.setItem('calc-mate', JSON.stringify(store.getState()));
})

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  rootElement
);