import React from 'react';
import {createRoot} from 'react-dom/client';
import {FirebaseAppProvider} from 'reactfire';
import {firebaseConfig} from './firebase-config';
import App from './App';
import './index.css';
import './i18n';
import CustomThemeProvider from "./provider/ThemeProvider.tsx";
import {App as AntdApp} from "antd";

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
            <CustomThemeProvider>
                <AntdApp>
                    <App/>
                </AntdApp>
            </CustomThemeProvider>
        </FirebaseAppProvider>
    </React.StrictMode>
);
