import {Preview} from '@storybook/react';
import App from "./app";

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
        (Story, context) => {
            return <App Story={Story} context={context}/>
        }
    ]
};

export default preview;