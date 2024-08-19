import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Select } from './Select'
import { fn } from '@storybook/test'

const options = [
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

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component: 'Select 是一個可以讓使用者選擇的元件。',
      },
    },
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['single', 'multiple'],
      description: '選擇模式 single = 單選, multiple = 多選',
      default: 'single',
    },
    showSearch: {
      control: 'boolean',
      description: '是否顯示搜尋框',
      default: false,
    },
    disabled: { control: 'boolean', description: '是否禁用', default: false },
    placeholder: { control: 'text', description: '輸入框的提示文字' },
    searchPlaceholder: { control: 'text', description: '搜尋框的提示文字' },
    onChange: { action: 'onChange', description: '選擇選項時觸發' },
  },
  args: {
    type: 'single',
    onChange: fn(),
  },
}

export default meta

type Story = StoryObj<typeof Select>

export const Default: Story = {
  render: (args) => {
    return (
      <Select {...args}>
        {options.map((item) => (
          <Select.Item key={item.label} value={item.value}>
            {item.label}
          </Select.Item>
        ))}
      </Select>
    )
  },
}

export const Multiple: Story = {
  args: {
    type: 'multiple',
  },
  render: (args) => {
    return (
      <Select {...args}>
        {options.map((item) => (
          <Select.Item key={item.label} value={item.value}>
            {item.label}
          </Select.Item>
        ))}
      </Select>
    )
  },
}

export const ShowSearch: Story = {
  args: {
    showSearch: true,
    placeholder: '請選擇框架',
  },
  render: (args) => {
    return (
      <Select {...args}>
        {options.map((item) => (
          <Select.Item key={item.label} value={item.value}>
            {item.label}
          </Select.Item>
        ))}
      </Select>
    )
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => {
    return (
      <Select {...args}>
        {options.map((item) => (
          <Select.Item key={item.label} value={item.value}>
            {item.label}
          </Select.Item>
        ))}
      </Select>
    )
  },
}
