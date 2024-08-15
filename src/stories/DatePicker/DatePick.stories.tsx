import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { DateTimePicker } from './DatePick'

const meta: Meta<typeof DateTimePicker> = {
  title: 'Components/DateTimePicker',
  component: DateTimePicker,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  argTypes: {
    hourCycle: {
      control: 'radio',
      options: [12, 24],
      description: '時間制',
      default: 12,
    },
    value: { control: 'date', description: '日期時間' },
    onChange: { action: 'onChange', description: '日期時間改變時觸發' },
  },
  args: { onChange: fn() },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    granularity: 'day',
  },
}

export const HourCycle12: Story = {
  args: {
    hourCycle: 12,
  },
}

export const HourCycle24: Story = {
  args: {
    hourCycle: 24,
  },
}
