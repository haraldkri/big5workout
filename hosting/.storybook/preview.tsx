import {Preview} from '@storybook/react';
import {ConfigProvider, theme} from "antd";
import CustomThemeProvider from "../src/provider/ThemeProvider";

const newViewports = {
    pixel6a: {
        name: 'Google Pixel 6a',
        styles: {
            width: '412px',
            height: '915px',
        },
    },
};

const preview: Preview = {
    parameters: {
        viewports: newViewports, // newViewports would be an ViewportMap. (see below for examples)
        defaultViewport: 'pixel6a',
    },
    decorators: [
        (Story) => (
            <ConfigProvider
                theme={{
                    algorithm: theme.darkAlgorithm,
                }}
            >
                <CustomThemeProvider>
                    {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
                    <Story/>
                </CustomThemeProvider>
            </ConfigProvider>
        ),
    ],
};

export default preview;