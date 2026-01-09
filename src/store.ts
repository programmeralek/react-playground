import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './features/counter/counterSlice'
import colorReducer  from './features/color/colorSlice'

export const store:any = configureStore({
  reducer: {
    counter: counterReducer,
    color: colorReducer
  }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;