import {getName} from "./languageKeySelect";

describe("getName", () => {
    it("returns undefined if data is null", () => {
        expect(getName(null, "de")).toBeUndefined();
    });

    it("returns germanName if language is de", () => {
        expect(getName({
            name: {
                en: "English",
                de: "Deutsch"
            }
        }, "de-DE")).toBe("Deutsch");
    });

    it("returns englishName if language is not de", () => {
        expect(getName({
            name: {
                en: "English",
                de: "Deutsch"
            }
        }, "en-US")).toBe("English");
    });
})