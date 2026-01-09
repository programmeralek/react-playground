import { useDispatch, useSelector } from "react-redux";
import { counterReset, decrement, increment } from "../features/counter/counterSlice";
import type { AppDispatch, RootState } from "../store";
import ColorPicker from "./colorPicker";
import { colorReset } from "../features/color/colorSlice";
import { useEffect, useState } from "react";
import { colorsApi } from "../APis/colors";
import type { PaletteColor } from "../types/colorTypes";


function ColorCounter() {
    const count = useSelector((state: RootState) => state.counter);
    const bgColor = useSelector((state: RootState) => state.color.bgColor);
    const dispatch = useDispatch<AppDispatch>();
    const [colorRefreshTick, setColorRefreshTick] = useState(0);
    const usedColors = useSelector((state: RootState) => state.color.usedColors)

    const [palette, setPalette] = useState<PaletteColor[]>([
        { name: 'red', value: 'red' },
        { name: 'cyan', value: 'cyan' },
        { name: 'green', value: 'green' },
        { name: 'indigo', value: 'indigo' },
    ]);

    useEffect(() => {

        let cancelled = false;

        colorsApi.getRandomColor('hex')
            .then((randomColor) => colorsApi.getColorPalette(randomColor, 4, 'hex'))
            .then((palette) => {
                debugger;
                if (!cancelled) setPalette(palette);
            })
            .catch((e) => {
                if (!cancelled) {
                    throw new Error("Having issues with the API!");
                }
            });

        return () => {
            debugger;
            cancelled = true;
        };
    }, [colorRefreshTick]);

    const colorStyle: any = {
        color: count.color
    }

    const bgColorStyle: any = {
        backgroundColor: bgColor
    }

    // const handleIncrement = () => {
    //     if (count.value >= 5) {
    //         dispatch(counterReset());
    //         dispatch(colorReset());
    //     } else {
    //         dispatch(increment());
    //     }
    // };


    // const handleDecrement = () => {
    //     if (count.value <= -5) {
    //         dispatch(counterReset());
    //         dispatch(colorReset());
    //     } else {
    //         dispatch(decrement());
    //     }
    // }

    const handleReset = () => {
        dispatch(counterReset());
        dispatch(colorReset());
    }

    const handleRefreshColors = () => {
        setColorRefreshTick((t) => t + 1);
    }

    return (
        <div id="mainCard" style={bgColorStyle}>
            <h1><span style={colorStyle}> Amount of Colors Used: {usedColors.length}</span></h1>
            {/* <button onClick={handleIncrement}>Increment</button>
            <button onClick={handleDecrement}>Decrement</button> */}
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleRefreshColors}>Refresh Colors</button>
            <h3>Colors Used:</h3>
            <ul style={{ listStyleType: "none" }}>
                {usedColors.map((col: string, index: number) => (
                    <li key={"usedColor_" + index}>{col}</li>
                ))}
            </ul>
            <ColorPicker type="bg" palette={palette}></ColorPicker>
            <ColorPicker type="text" palette={palette}></ColorPicker>
        </div>
    );
}

export default ColorCounter;