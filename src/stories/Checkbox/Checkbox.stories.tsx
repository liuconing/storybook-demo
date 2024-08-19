import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './CheckboxGroup'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component: 'Checkbox 是一個可以讓使用者勾選的元件。',
      },
    },
  },
  argTypes: {
    checked: { control: 'boolean', description: '是否選中', default: false },
    label: { control: 'text', description: '選項名稱' },
    onChange: { action: 'onChange', description: '選中狀態改變時的回調函數' },
    id: { control: 'text', description: '選項的唯一標識' },
  },
  args: {
    label: 'this is a checkbox',
    checked: false,
    onChange: (value: boolean) => console.log(value),
  },
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {
    checked: false,
  },
  render: (args) => {
    const [checked, setChecked] = React.useState(false)
    return <Checkbox {...args} checked={checked} onChange={(value: boolean) => setChecked(value)} />
  },
}
