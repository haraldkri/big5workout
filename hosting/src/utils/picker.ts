import {formatPickerWeight, parsePickerWeight} from "./formatWeight.ts";
import {formatPickerDuration, parsePickerDuration} from "./formatTime.ts";
import {PickerValue} from "react-mobile-picker";

export const formatValue = (value: number, type: "weight" | "duration") => {
    if (type === "weight") {
        return formatPickerWeight(value);
    } else {
        return formatPickerDuration(value);
    }
}

export const parseValue = (value: PickerValue, type: "weight" | "duration") => {
    if (type === "weight") {
        return parsePickerWeight(value);
    } else {
        return parsePickerDuration(value);
    }
}