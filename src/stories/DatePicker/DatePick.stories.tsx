import { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from './DatePick'
import { HeartFilledIcon, UpdateIcon } from '@radix-ui/react-icons'

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof meta>

export const Default = () => <DatePicker />
