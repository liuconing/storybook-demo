import { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './Textarea'
import { fn } from '@storybook/test'

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    docs: {
      description: {
        component: 'Textarea 是一個可以讓使用者輸入多行文字的元件。',
      },
    },
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: '是否禁用',
      default: false,
    },
    placeholder: {
      control: 'text',
      description: '輸入框的提示文字',
    },
    onChange: {
      action: 'onChange',
      description: '輸入框改變時觸發',
    },
  },
}

export default meta

type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: {
    onChange: fn((e) => console.log(e.target.value)),
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
