import { createAction, createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ColorState {
    bgColor: string;
    usedColors: string[]
}

const initialState: ColorState = {
    bgColor: "#1A1A1A",
    usedColors: []
}

const colorSlice = createSlice({
    name: "color",
    initialState,
    reducers: {
        changeBgColor(state, action: PayloadAction<string>) {
            state.bgColor = action.payload;
        },

        addUsedColor(state, action: PayloadAction<string>) {
            state.usedColors.push(action.payload)
        }

    },
    extraReducers: builder => {
        builder.addCase(colorReset, state => {
            state.bgColor = initialState.bgColor;
            state.usedColors = [];
        })
    }
})

export const { changeBgColor, addUsedColor } = colorSlice.actions;
export const colorReset = createAction("color/reset");
export default colorSlice.reducer;