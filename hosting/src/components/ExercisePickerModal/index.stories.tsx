import type {Meta, StoryObj} from '@storybook/react';
import ExercisePickerModal from "./";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Components/ExercisePickerModal',
    component: ExercisePickerModal,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        //layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs']
} satisfies Meta<typeof ExercisePickerModal>;

export default meta;
type Story = StoryObj<typeof meta>;


export const WeightPickerModal: Story = {
    args: {
        type: "weight",
        open: true,
        value: 100,
        onConfirm: console.log
    },
};

export const DurationPickerModal: Story = {
    args: {
        type: "duration",
        open: true,
        value: 100,
        onConfirm: console.log
    },
};