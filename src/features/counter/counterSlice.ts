import { createAction, createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
  color: string
}

const initialState: CounterState = {
  value: 0,
  color: "white"
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
    changeTextColor(state, action: PayloadAction<string>) {
      state.color = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(counterReset, state => {
      // state.value = 0;
      state.color = initialState.color;
    })
  }
});

export const { increment, decrement, changeTextColor } = counterSlice.actions;
export const counterReset = createAction("counter/reset");
export default counterSlice.reducer;