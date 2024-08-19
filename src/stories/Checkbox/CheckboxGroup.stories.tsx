import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Checkbox, CheckboxGroup } from './CheckboxGroup'

const options = [
  { id: 'option1', label: '選項 1' },
  { id: 'option2', label: '選項 2' },
  { id: 'option3', label: '選項 3' },
  { id: 'option4', label: '選項 4' },
]

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Components/Checkbox/CheckboxGroup',
  component: CheckboxGroup,
  argTypes: {
    label: { control: 'text' },
    value: { control: 'object' },
    onChange: { action: 'onChange' },
  },
  args: {
    value: [],
    onChange: (value: string[]) => console.log(value),
  },
}

export default meta

type Story = StoryObj<typeof CheckboxGroup>

export const Default: Story = {
  args: {
    label: 'Checkbox 群組',
    value: [],
    onChange: fn(),
  },
  render: (args) => {
    const [selectedValues, setSelectedValues] = React.useState<string[]>(args.value)

    const handleChange = (value: string[]) => {
      setSelectedValues(value)
      args.onChange(value)
    }
    return (
      <CheckboxGroup {...args} value={selectedValues} onChange={handleChange}>
        {options.map((option) => (
          <Checkbox key={option.id} id={option.id} label={option.label} />
        ))}
      </CheckboxGroup>
    )
  },
}
