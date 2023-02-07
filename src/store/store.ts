import { configureStore } from "@reduxjs/toolkit";
import modelReducer from "./features/modelSlice";

export const store = configureStore({
	reducer: { modelReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
