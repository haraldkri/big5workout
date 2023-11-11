import {formatPickerWeight, formatWeight, parsePickerWeight} from "./formatWeight";

describe("formatWeight", () => {
    it("formats a weight", () => {
        expect(formatWeight(1.005)).toEqual("1");
        expect(formatWeight(1.004)).toEqual("1");
        expect(formatWeight(1.05)).toEqual("1.05");
    });
})

describe("formatPickerWeight", () => {
    it("formats a weight", () => {
        expect(formatPickerWeight(22.5)).toEqual({
            weight: "22.5"
        });
        expect(formatPickerWeight(1.004)).toEqual({
            weight: "1"
        });
        expect(formatPickerWeight(1.000)).toEqual({
            weight: "1"
        });
    });
})

describe("parsePickerWeight", () => {
    it("formats a weight", () => {
        expect(parsePickerWeight({
            weight: "22.5"
        })).toEqual(22.5);
    });
})