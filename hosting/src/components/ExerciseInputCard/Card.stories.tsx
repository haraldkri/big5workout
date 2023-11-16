import type {Meta} from '@storybook/react';
import Card, {Props} from "./Card";
import {FC, useState} from "react";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Components/ExerciseInputCard',
    component: Card,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        //layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs']
} satisfies Meta<typeof Card>;

export default meta;
// type Story = StoryObj<typeof meta>;

const Template: FC<Props> = (args) => {
    const [value, setValue] = useState(args.value);
    return <Card {...args} value={value} onChange={setValue}/>
}

export const Default: any = Template.bind({});
Default.args = {
    value: {weight: 80, duration: 123},
    title: 'Bench Press',
    latestWeight: 80,
    latestDuration: 123,
    images: [{
        placeholderUrl: 'https://cdn-0.weighttraining.guide/wp-content/uploads/2016/12/machine-chest-press-resized.png?ezimgfmt=ng%3Awebp%2Fngcb4',
        url: 'https://cdn-0.weighttraining.guide/wp-content/uploads/2016/12/machine-chest-press-resized.png?ezimgfmt=ng%3Awebp%2Fngcb4',
        link: 'https://weighttraining.guide/exercises/machine-chest-press/',
        alt: 'Bench Press'
    },
        {
            placeholderUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/04/Lever-Shoulder-Press.gif',
            url: 'https://fitnessprogramer.com/wp-content/uploads/2021/04/Lever-Shoulder-Press.gif',
            link: 'https://weighttraining.guide/exercises/',
            alt: 'Bench Press'
        }]
};

export const MinView: any = Template.bind({});
MinView.args = {
    useMinView: true,
    value: {weight: 80, duration: 123},
    title: 'Bench Press',
    latestWeight: 80,
    latestDuration: 123,
    images: [{
        placeholderUrl: 'https://cdn-0.weighttraining.guide/wp-content/uploads/2016/12/machine-chest-press-resized.png?ezimgfmt=ng%3Awebp%2Fngcb4',
        url: 'https://cdn-0.weighttraining.guide/wp-content/uploads/2016/12/machine-chest-press-resized.png?ezimgfmt=ng%3Awebp%2Fngcb4',
        link: 'https://weighttraining.guide/exercises/machine-chest-press/',
        alt: 'Bench Press'
    },
        {
            placeholderUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/04/Lever-Shoulder-Press.gif',
            url: 'https://fitnessprogramer.com/wp-content/uploads/2021/04/Lever-Shoulder-Press.gif',
            link: 'https://weighttraining.guide/exercises/',
            alt: 'Bench Press'
        }]
};