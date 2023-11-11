import type {Meta, StoryObj} from '@storybook/react';
import ExercisePicker from "./ExercisePicker.tsx";
import {pickerConfigs} from "./pickerConfigs.ts";
import {formatValue} from "../../utils/picker.ts";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Components/ExercisePicker',
    component: ExercisePicker,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        //layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs']
} satisfies Meta<typeof ExercisePicker>;

export default meta;
type Story = StoryObj<typeof meta>;


export const WeightPicker: Story = {
    args: {
        selections: pickerConfigs.weight.selections,
        value: formatValue(pickerConfigs.weight.defaultPickerValue, "weight"),
        onChange: console.log
    },
};

export const DurationPicker: Story = {
    args: {
        selections: pickerConfigs.duration.selections,
        value: formatValue(pickerConfigs.duration.defaultPickerValue, "duration"),
        onChange: console.log
    },
};