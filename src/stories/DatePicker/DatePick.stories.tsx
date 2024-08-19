import { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { enUS, zhTW, zhCN, Locale } from 'date-fns/locale'
import { DateTimePicker } from './DatePick'

const meta: Meta<typeof DateTimePicker> = {
  title: 'Components/DateTimePicker',
  component: DateTimePicker,
  parameters: {
    docs: {
      description: {
        component: 'DateTimePicker 是一個可以讓使用者選擇日期時間的元件。',
      },
    },
  },
  argTypes: {
    hourCycle: {
      control: 'radio',
      options: [12, 24],
      description: '時間制',
      default: 12,
    },
    value: { control: 'date', description: '日期時間' },
    locale: {
      control: 'radio',
      description: '語系',
      options: {
        Null: null,
        'en-US': enUS,
        'zh-TW': zhTW,
        'zh-CN': zhCN,
      } as any,
    },
    onChange: { action: 'onChange', description: '日期時間改變時觸發' },
    granularity: {
      control: 'radio',
      options: ['day', 'hour', 'minute', 'second'],
      description: '選擇時間的範圍',
      default: 'day',
    },
  },
  args: { onChange: fn() },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    granularity: 'day',
  },
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(undefined)
    return (
      <DateTimePicker
        value={date}
        onChange={setDate}
        placeholder="What's your birthday?"
        granularity={args.granularity}
        locale={args.locale}
      />
    )
  },
}

export const HourCycle12: Story = {
  args: {
    hourCycle: 12,
  },
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(undefined)
    return (
      <DateTimePicker
        value={date}
        onChange={setDate}
        placeholder="What's your birthday?"
        hourCycle={args.hourCycle}
        locale={args.locale}
      />
    )
  },
}

export const HourCycle24: Story = {
  args: {
    hourCycle: 24,
  },
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(undefined)
    return (
      <DateTimePicker
        value={date}
        onChange={setDate}
        placeholder="What's your birthday?"
        hourCycle={args.hourCycle}
        locale={args.locale}
      />
    )
  },
}
