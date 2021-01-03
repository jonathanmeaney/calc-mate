/* istanbul ignore file */
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

// export default (history) =>
//   combineReducers({
//     router: connectRouter(history)
//   });

const rootReducer = (history) => combineReducers({
  router: connectRouter(history)
});

export default rootReducer;