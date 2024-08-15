import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Select } from './Select'

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    type: {
      control: 'radio',
      options: ['single', 'multiple'],
      description: '選擇模式',
      default: 'single',
    },
    showSearch: {
      control: 'boolean',
      description: '是否顯示搜尋框',
      default: false,
    },
    options: { control: 'object', description: '選項' },
    onChange: { action: 'onChange', description: '選擇選項時觸發' },
  },
  args: {
    type: 'single',
  },
}

export default meta

type Story = StoryObj<typeof Select>

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
]

export const Default: Story = {
  render: (args) => {
    return <Select {...args} options={frameworks} />
  },
}

export const Multiple: Story = {
  args: {
    type: 'multiple',
  },
  render: (args) => {
    return <Select {...args} options={frameworks} />
  },
}

export const showSearch: Story = {
  args: {
    showSearch: true,
  },
  render: (args) => {
    return <Select {...args} options={frameworks} />
  },
}
