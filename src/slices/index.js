/* istanbul ignore file */
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import calculationsReducer from  './calculations';

// export default (history) =>
//   combineReducers({
//     router: connectRouter(history)
//   });

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  calculations: calculationsReducer
});

export default rootReducer;