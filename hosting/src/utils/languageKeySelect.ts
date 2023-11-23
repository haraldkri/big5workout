// Please provide the function with the language object from the local i18n instance
// const {i18n} = useTranslation();
// i18n.language
export function getName(data: Required<{ englishName: string, germanName: string }> | null, language: string) {
    if (!data) return undefined;
    if (language === "de") return data?.germanName;
    return data?.englishName;
}