import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox/Checkbox',
  component: Checkbox,
  argTypes: {
    checked: { control: 'boolean', description: '是否選中' },
    disabled: { control: 'boolean', description: '是否禁用' },
    label: { control: 'text', description: '選項名稱' },
  },
  args: {
    label: 'this is a checkbox',
    checked: false,
    disabled: false,
  },
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = React.useState(false)
    return <Checkbox {...args} checked={checked} onCheckedChange={(value: boolean) => setChecked(value)} />
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
