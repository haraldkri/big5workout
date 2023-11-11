export type PickerSelection = {
    name: string;
    data: string[];
}

export type PickerConfig = {
    selections: PickerSelection[],
    defaultPickerValue: number
}

type CustomPickerConfigs = {
    "duration": PickerConfig,
    "weight": PickerConfig
}

export const pickerConfigs: CustomPickerConfigs = {
    duration: {
        selections: [
            {
                name: "minutes",
                data: Array.from(Array(60).keys()).map((i) => i.toString()),
            },
            {
                name: "seconds",
                data: Array.from(Array(60).keys()).map((i) => i.toString()),
            }
        ],
        defaultPickerValue: 90
    },
    weight: {
        selections: [
            {
                name: "weight",
                data: Array.from(Array(101).keys()).map((i) => (i * 2.5).toString()),
            }
        ],
        defaultPickerValue: 0
    }

}