import React from "react";
import {ConfigProvider, theme} from "antd";
import {PropsWithChildren} from "../types.ts";
import {AliasToken} from "antd/lib/theme/interface";

const CustomThemeProvider: React.FC<PropsWithChildren> = ({children}) => {
    // define custom colors for antd color tokens like: primary, warning, ...
    const customTokenSettings: Partial<AliasToken> = {
        purple10: '#1E1D24'
    };

    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: customTokenSettings,
            }}
        >
            {children}
        </ConfigProvider>
    );
};

export default CustomThemeProvider