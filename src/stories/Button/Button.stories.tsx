import Link from 'next/link'
import { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import { Mail, Loader2 } from 'lucide-react'
import { fn } from '@storybook/test'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Button 是一個可以讓使用者點擊的元件。',
      },
    },
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: '是否禁用',
      default: false,
      type: 'boolean',
    },
    variant: {
      control: 'radio',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      type: 'string',
      description: '樣式',
    },
    children: {
      control: 'text',
      type: 'function',
      description: 'ReactNode',
    },
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'Button',
  },
}

export const WithIcon: Story = {
  args: {
    variant: 'outline',
  },
  render: (args) => (
    <Button {...args}>
      <Mail className='mr-2 h-4 w-4' />
      Login with Email
    </Button>
  ),
}

export const Loading: Story = {
  render: (args) => (
    <Button {...args}>
      <Loader2 className='mr-2 animate-spin' />
      Loading
    </Button>
  ),
}

export const LinkButton: Story = {
  render: (args) => (
    <Button asChild {...args}>
      <Link href='/login'>Login</Link>
    </Button>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
}
