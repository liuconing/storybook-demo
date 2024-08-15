import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'
import { HeartFilledIcon, UpdateIcon } from '@radix-ui/react-icons'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search'],
      description: 'input 類型',
      type: 'string',
    },
    placeholder: { control: 'text', description: '提示文字' },
    disabled: { control: 'boolean', type: 'boolean', description: '是否禁用' },
    value: { control: 'text', type: 'string', description: '輸入框的值' },
    maxLength: { control: 'number', type: 'number', description: '最大長度' },
    minLength: { control: 'number', type: 'number', description: '最小長度' },
    prefixIcon: {
      control: 'radio',
      options: {
        None: null,
        HeartFilled: <HeartFilledIcon />,
        Update: <UpdateIcon />,
      },
      description: '前置圖案',
      type: 'ReactNode | SVGSVGElement',
    } as any,
    suffixIcon: {
      control: 'radio',
      options: {
        None: null,
        HeartFilled: <HeartFilledIcon />,
        Update: <UpdateIcon />,
      },
      description: '後置圖案',
      type: 'ReactNode | SVGSVGElement',
    } as any,
    addonAfter: {
      control: 'radio',
      options: {
        None: null,
        '%': '%',
        元: '元',
      },
      description: '後置標誌',
      type: 'ReactNode | string',
    } as any,
    addonBefore: {
      control: 'radio',
      options: {
        None: null,
        '%': '%',
        '＄': '＄',
      },
      description: '前置標誌',
      type: 'ReactNode | string',
    } as any,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    type: 'text',
    placeholder: '請输入文字...',
  },
}

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: '0',
  },
}

export const PrefixIcon: Story = {
  args: {
    type: 'text',
    placeholder: '請输入文字...',
    prefixIcon: <HeartFilledIcon />,
  },
}

export const SuffixIcon: Story = {
  args: {
    type: 'text',
    placeholder: '請输入文字...',
    suffixIcon: <HeartFilledIcon />,
  },
}

export const AddonBefore: Story = {
  args: {
    type: 'number',
    placeholder: '請输入文字...',
    addonBefore: '＄',
  },
}

export const AddonAfter: Story = {
  args: {
    type: 'number',
    placeholder: '請输入文字...',
    addonAfter: '元',
  },
}

export const Search: Story = {
  args: {
    type: 'search',
    placeholder: '搜尋',
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: '請輸入密碼',
  },
}

export const Disabled: Story = {
  args: {
    type: 'text',
    placeholder: '不可輸入',
    disabled: true,
  },
}
