import {formatValue, parseValue} from "./picker.ts";

describe("formatValue", () => {
    it("formats weight", () => {
        expect(formatValue(1.23, "weight")).toEqual({weight: "1.23"});
    });

    it("formats duration", () => {
        expect(formatValue(123, "duration")).toEqual({minutes: "2", seconds: "3"});
    });
});

describe("parseValue", () => {
    it("parses weight", () => {
        expect(parseValue({weight: "1.23"}, "weight")).toEqual(1.23);
    });

    it("parses duration", () => {
        expect(parseValue({minutes: "2", seconds: "3"}, "duration")).toEqual(123);
    });
})