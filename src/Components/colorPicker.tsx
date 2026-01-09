import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import type { PaletteColor } from "../types/colorTypes";
import { addUsedColor, changeBgColor, colorReset } from "../features/color/colorSlice";
import { changeTextColor, counterReset } from "../features/counter/counterSlice";


function ColorPicker(props: { type: "bg" | "text"; palette: PaletteColor[] }) {

    const colorSelector = useSelector(
        (state: RootState) => state.color
    );

    const textColor = useSelector(
        (state: RootState) => state.counter.color
    );

    const textColorStyle = {
        color: textColor
    }

    const dispatch = useDispatch<AppDispatch>();
    let template;

    const handleAddColor = (col: any, type: string) => {
        const color = col.value;
        if (colorSelector.usedColors.length >= 10) {
            dispatch(colorReset());
            dispatch(counterReset());
        } else {
            type == "bg" ? dispatch(changeBgColor(color)) : dispatch(changeTextColor(color));
            dispatch(addUsedColor(col.name));
        }
    }

    if (props.type == 'bg') {
        template = <>
            <h4 style={textColorStyle}>Current BG color: {colorSelector.bgColor}</h4>
            {props.palette.map((col: any, index: number) => (
                <button key={"bgColBtn_" + index} onClick={() => handleAddColor(col, "bg")}>Change to {col.name}</button>
            ))}
        </>
    } else if (props.type == 'text') {
        template = <>
            <h4 style={textColorStyle}>Current text color: {textColor}</h4>
            {props.palette.map((col: any, index: number) => (
                <button key={"textColBtn_" + index} onClick={() => handleAddColor(col, "text")}>Change to {col.name}</button>
            ))}
        </>
    }

    return template;
}

export default ColorPicker;
