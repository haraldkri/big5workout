import type {Meta, StoryObj} from '@storybook/react';
import ContentCard from "./index.tsx";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Components/ContentCard',
    component: ContentCard,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        //layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs']
} satisfies Meta<typeof ContentCard>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        title: 'What this is about',
        children: `This app is about providing a simplistic and easy way to record and keep track of your training by the book
            “Body by Science”.`
    },
};

export const Empty: Story = {
    args: {
        children: <></>
    },
};