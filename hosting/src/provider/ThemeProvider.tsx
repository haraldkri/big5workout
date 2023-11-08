import React from "react";
import {ConfigProvider, theme} from "antd";
import {PropsWithChildren} from "../types.ts";
import {AliasToken} from "antd/lib/theme/interface";
import {ThemeProvider} from "styled-components";

const CustomThemeProvider: React.FC<PropsWithChildren> = ({children}) => {
    const {token} = theme.useToken();
    // define custom colors for antd color tokens like: primary, warning, ...
    const customTokenSettings: Partial<AliasToken> = {};

    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: customTokenSettings,
            }}
        >
            <ThemeProvider theme={token}>
                {children}
            </ThemeProvider>
        </ConfigProvider>
    );
};

export default CustomThemeProvider