import moment from "moment/moment";
import {PickerValue} from "react-mobile-picker";

export function formatSeconds(seconds: number) {
    return moment().startOf('day').seconds(seconds).format('m:ss')
}

export function reverseFormatSeconds(time: string) {
    const [minutes, seconds] = time.split(':');
    return parseInt(minutes) * 60 + parseInt(seconds)
}

export function formatPickerDuration(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return {
        minutes: minutes.toString(),
        seconds: remainingSeconds.toString()
    }
}

export function parsePickerDuration(duration: PickerValue) {
    const {minutes, seconds} = duration;
    return parseInt(minutes) * 60 + parseInt(seconds)
}