import {FC} from "react";
import Picker from "react-mobile-picker";
import {Typography} from "antd";
import {PickerSelection} from "./pickerConfigs.ts";

/**
 * The selections prop contains the data for the picker.
 * e.g. [{name: "minutes", data: ["1", "2", "3"]}, {name: "seconds", data: ["30", "45", "60"]}]
 * The pickerValue prop contains the current value of the picker.
 * e.g. {minutes: "1", seconds: "30"}
 */
type Props = {
    selections: PickerSelection[],
    value: {
        [key: string]: string
    },
    onChange: (newValue: {
        [name: string]: string,
    }) => void
}

const ExercisePicker: FC<Props> = (props) => {
    const {selections, value, onChange} = props;

    return (
        <Picker value={value} onChange={onChange} wheelMode="natural" height={360}>
            {selections.map((selection) => (
                <Picker.Column name={selection.name} key={selection.name}>
                    {selection.data.map((value: string) => (
                        <Picker.Item key={value} value={value}>
                            <Typography.Text>{value}</Typography.Text>
                        </Picker.Item>
                    ))}
                </Picker.Column>
            ))}

        </Picker>
    );
};

export default ExercisePicker;

// Check out the picker component on github:
// https://github.com/adcentury/react-mobile-picker/blob/main/lib/components/Picker.tsx