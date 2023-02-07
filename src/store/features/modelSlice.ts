import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Audio, Genre } from "interfaces/interfaces";
import { isAudio } from "utils/utils";

export interface InitialState {
	modelType: string;
	selectedModel: Audio | Genre;
}

const initialState: InitialState = {
	modelType: "",
	selectedModel: {
		id: 0,
		name: "",
	},
};

export const counterSlice = createSlice({
	name: "model",
	initialState,
	reducers: {
		setModelType: (state, action: PayloadAction<string>) => {
			state.modelType = action.payload;
		},
		setModel: (state, action: PayloadAction<Audio | Genre>) => {
			if (isAudio(action.payload)) state.selectedModel = action.payload as Audio;
			else state.selectedModel = action.payload as Genre;
			// if (action.payload instanceof Genre) console.log("audio");

			// state.selectedModel = action.payload;
		},
	},
});

export const { setModelType, setModel } = counterSlice.actions;

export default counterSlice.reducer;
