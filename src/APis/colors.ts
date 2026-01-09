import axios from "axios"

const APIs = {
    xColors: "https://x-colors.yurace.pro",
    theColorAPI: {
        link: "http://www.thecolorapi.com",
        modes: [
            "monochrome",
            "monochrome-dark",
            "monochrome-light",
            // "analogic",
            "complement",
            "analogic-complement",
            "triad",
            "quad"
        ]
    }
}

export const colorsApi = {
    getRandomColor: async (returnType: 'hex' | 'rgb' | 'hsl'): Promise<any> => {
        try {
            const response: any = await axios.get(`${APIs.xColors}/api/random`);
            debugger;
            return response.data[returnType];
        } catch (error) {
            console.error("Error fetching random color:", error);
            throw new Error("Failed to fetch random color!");
        }
    },

    getColorPalette: async (providedColor: string, amount: number, type: 'hex',): Promise<any> => {
        try {
            const mode = APIs.theColorAPI.modes[Math.floor(Math.random()  * Array.length)];
            const nakedHex = providedColor.replace(/#/, "");
            const link = `${APIs.theColorAPI.link}/scheme?hex=${nakedHex}&mode=${mode}&count=${amount}&format=json`;
            const response: any = await axios.get(link);
            debugger;
            const cols:any= response.data.colors;
            debugger;
            const palette : any[] = cols.map((color: any) => ({
                name: color.name.value,
                value: color[type].value
            }))
            debugger;
            if (palette?.length >= 1) {
                return palette
            } else {
                console.error("Error building palette:", palette);
                throw new Error("Failed to build palette");
            }
        } catch (error) {
            console.error("Error fetching color palette:", error);
            throw new Error("Failed to fetch color palette!")
        }
    }

}


