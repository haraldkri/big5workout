import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import moment from "moment";
import deDE from 'antd/locale/de_DE';
import enUS from 'antd/locale/en_US';
import _ from 'lodash';
import {default as de} from './locale/de.json';
import {default as en} from './locale/en.json';

import 'moment/locale/de';

export type Language = {
    code: string,
    short: string,
    name: string,
    country: string
}

export const languages: Language[] = [
    {
        code: 'en',
        short: 'en',
        name: 'English',
        country: 'USA'
    },
    {
        code: 'de',
        short: 'de',
        name: 'Deutsch',
        country: 'DE'
    }
];

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
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
    .then(() => {
        const momentLocal = _.first(i18n.language ? i18n.language.split("-") : []) || 'en';
        moment.locale(momentLocal);
    });

export {i18n};
