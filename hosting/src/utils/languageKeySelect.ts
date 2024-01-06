// Please provide the function with the language object from the local i18n instance
// const {i18n} = useTranslation();
// i18n.language
export function getName(data: Required<{ name: { de?: string, en?: string } }> | null, language: string) {
    if (!data) return undefined;
    if (language === "de-DE") return data?.name.de || data?.name.en;
    return data?.name.en || data?.name.de;
}