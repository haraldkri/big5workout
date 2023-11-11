import type {Meta, StoryObj} from '@storybook/react';
import ExerciseInputCard from "./index";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Components/ExerciseInputCard',
    component: ExerciseInputCard,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        //layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs']
} satisfies Meta<typeof ExerciseInputCard>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        data: {
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
        }
    },
};

export const Empty: Story = {
    args: {},
};