import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import strftime from 'strftime';

export const initialState = [];

// A slice for calculations
const calculationsSlice = createSlice({
  name: "calculations",
  initialState,
  reducers: {
    add: (state, { payload }) => {
      // put the latest calculation at the start of the array
      // and maintain an array of 20 items total
      return [payload, ...state.slice(0, 19)]
    },
    update: (state, { payload }) => {
      const index = state.findIndex(calculation => String(calculation.id) === String(payload.id));
      const newState = state;
      newState[index] = payload;
      state = newState;
    },
    destroy: (state, { payload }) => {
      return state.filter(calculation => String(calculation.id) !== String(payload.id));
    }
  }
});

// Three actions generated from the slice
export const { add, update, destroy } = calculationsSlice.actions;

// Selectors
export const calculationsSelector = (state) => state.calculations;

// The reducer
export default calculationsSlice.reducer;

export function addCalculation(calculation) {
  return async (dispatch) => {
    dispatch(add({...calculation, id: uuidv4(), time: strftime('%B %d, %Y %H:%M:%S')}));
  };
}

export function updateCalculation(calculation) {
  return async (dispatch) => {
    dispatch(update(calculation));
  };
}

export function destroyCalculation(calculation) {
  return async (dispatch) => {
    dispatch(destroy(calculation));
  };
}
