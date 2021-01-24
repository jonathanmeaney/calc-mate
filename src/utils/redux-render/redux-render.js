import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

export default function reduxRender(
  component,
  initialState = {}
) {
  const middlewares = [thunk] // add your middlewares like `redux-thunk`
  const mockStore = configureStore(middlewares)
  const store = mockStore(initialState);
  return (
    <Provider store={store}>{component}</Provider>
  );
}