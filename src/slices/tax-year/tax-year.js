import { createSlice } from '@reduxjs/toolkit';

export const initialState = '';

// A slice for templates
const taxYearSlice = createSlice({
  name: "taxYear",
  initialState,
  reducers: {
    update: (state, { payload }) => {
      return payload;
    }
  }
});

// Three actions generated from the slice
export const {update} = taxYearSlice.actions;

// Selectors
export const taxYearSelector = (state) => state.taxYear;

// The reducer
export default taxYearSlice.reducer;

export function updateTaxYear(taxYear) {
  return async (dispatch) => {
    dispatch(update(taxYear));
  };
}
