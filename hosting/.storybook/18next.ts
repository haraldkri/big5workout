import {initReactI18next} from "react-i18next";
import deDE from 'antd/locale/de_DE';
import enUS from 'antd/locale/en_US';
import en from "../src/i18n/locale/en.json";
import de from "../src/i18n/locale/de.json";
import i18n from "i18next";

i18n
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react!!
            formatSeparator: ','
        },
        resources: {
            en: {
                translation: {
                    ...enUS,
                    ...en
                }
            },
            de: {
                translation: {
                    ...deDE,
                    ...de
                }
            }
        },
    })

export {i18n};
