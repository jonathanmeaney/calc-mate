/* istanbul ignore file */
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import calculationsReducer from  './calculations';
import taxYearReducer from  './tax-year';

// export default (history) =>
//   combineReducers({
//     router: connectRouter(history)
//   });

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  calculations: calculationsReducer,
  taxYear: taxYearReducer
});

export default rootReducer;
