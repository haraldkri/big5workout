import {PickerValue} from "react-mobile-picker";

export function formatWeight(weight: number) {
    return (Math.round(weight * 100) / 100).toString();
}

export const reverseFormatWeight = (weight: string) => {
    return parseFloat(weight);
}

export function formatPickerWeight(weight: number) {
    return {
        weight: (Math.round(weight * 100) / 100).toString()
    }
}

export function parsePickerWeight(weight: PickerValue) {
    return parseFloat(weight.weight);
}