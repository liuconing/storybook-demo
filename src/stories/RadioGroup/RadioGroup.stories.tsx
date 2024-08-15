import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { RadioGroup, RadioOption } from './RadioGroup'

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  argTypes: {
    label: { control: 'text' },
    onValueChange: { action: 'onValueChange', description: '選擇選項時觸發' },
  },
  args: { onValueChange: fn() },
}

export default meta

type Story = StoryObj<typeof RadioGroup>

const options: RadioOption[] = [
  { id: 'option1', value: '選項 1' },
  { id: 'option2', value: '選項 2' },
  { id: 'option3', value: '選項 3' },
  { id: 'option4', value: '選項 4' },
]

export const Default: Story = {
  render: (args) => {
    return <RadioGroup {...args} options={options} />
  },
  args: {
    label: 'Radio 群組',
  },
}
