import { Meta, StoryObj } from '@storybook/react'
import { DateTimePicker } from './DatePick'
import { HeartFilledIcon, UpdateIcon } from '@radix-ui/react-icons'

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
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    hourCycle: 12,
    value: undefined,
    onChange: () => {},
  },
}

export const HourCycle24: Story = {
  args: {
    hourCycle: 24,
    value: undefined,
    onChange: () => {},
  },
}
