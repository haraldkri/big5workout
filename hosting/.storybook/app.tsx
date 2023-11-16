import {I18nextProvider, useTranslation} from "react-i18next";
import "./18next.ts";
import {useEffect} from "react";
import moment from "moment";
import {ConfigProvider, theme} from "antd";
import CustomThemeProvider from "../src/provider/ThemeProvider";

const App = ({Story, context}) => {
    const {i18n} = useTranslation();
    const {locale} = context.globals;

    // When the locale global changes
    // Set the new locale in i18n
    useEffect(() => {
        window["i18nLanguage"] = locale;
        localStorage.setItem('i18nLanguage', locale);
        moment.locale(locale);
        i18n.changeLanguage(locale);
    }, [locale]);

    return <I18nextProvider i18n={i18n}>
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
            }}
        >
            <CustomThemeProvider>
                <Story/>

            </CustomThemeProvider>
        </ConfigProvider>
    </I18nextProvider>
}

export default App;