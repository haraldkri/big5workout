import {getName} from "./languageKeySelect";

describe("getName", () => {
    it("returns undefined if data is null", () => {
        expect(getName(null, "de")).toBeUndefined();
    });

    it("returns germanName if language is de", () => {
        expect(getName({englishName: "English", germanName: "Deutsch"}, "de")).toBe("Deutsch");
    });

    it("returns englishName if language is not de", () => {
        expect(getName({englishName: "English", germanName: "Deutsch"}, "en")).toBe("English");
    });
})