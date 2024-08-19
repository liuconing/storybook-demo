import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Radio, RadioGroup } from './RadioGroup'

const options = [
  { id: 'option1', value: '選項 1' },
  { id: 'option2', value: '選項 2' },
  { id: 'option3', value: '選項 3' },
  { id: 'option4', value: '選項 4' },
]

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

export const Default: Story = {
  args: {
    label: 'Radio 群組',
  },
  render: (args) => {
    const [selectedValue, setSelectedValue] = React.useState('option1')
    return (
      <RadioGroup {...args} value={selectedValue} onValueChange={setSelectedValue} label='選擇選項'>
        {options.map((option) => (
          <Radio key={option.id} id={option.id} value={option.value} label={option.value} />
        ))}
      </RadioGroup>
    )
  },
}
