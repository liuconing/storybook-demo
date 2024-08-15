import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { CheckboxGroup, CheckboxOption } from './CheckboxGroup'

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Components/Checkbox/CheckboxGroup',
  component: CheckboxGroup,
  argTypes: {
    label: { control: 'text' },
  },
}

export default meta

type Story = StoryObj<typeof CheckboxGroup>

const options: CheckboxOption[] = [
  { id: 'option1', label: '選項 1' },
  { id: 'option2', label: '選項 2' },
  { id: 'option3', label: '選項 3' },
  { id: 'option4', label: '選項 4' },
]

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState<string[]>([])
    return <CheckboxGroup {...args} options={options} value={value} onChange={setValue} />
  },
  args: {
    label: 'Checkbox 群組',
  },
}
