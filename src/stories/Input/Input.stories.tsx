import type { Meta, StoryObj } from '@storybook/react'
import { Input, InputPassword, InputAddonBox } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  argTypes: {
    disabled: { control: 'boolean', type: 'boolean', description: '是否禁用' },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    type: 'text',
    placeholder: '請输入文字...',
  },
  render: (args) => {
    return <Input {...args} />
  },
}

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: '0',
  },
  render: (args) => {
    return <Input {...args} />
  },
}

export const Password: Story = {
  args: {
    placeholder: '請輸入密碼',
  },
  render: (args) => {
    return <InputPassword {...args} />
  },
}

export const AddonAfter: Story = {
  args: {
    type: 'number',
    placeholder: '請输入文字...',
  },
  render: (args) => {
    return (
      <div className='flex item'>
        <Input className='border-r-0 shadow-0 rounded-r-none' type='text' />
        <InputAddonBox position='after'>元</InputAddonBox>
      </div>
    )
  },
}

// export const PrefixIcon: Story = {
//   args: {
//     type: 'text',
//     placeholder: '請输入文字...',
//   },
//   render: (args) => {
//     return (
//       <Input>
//         <Input {...args} />
//       </Input>
//     )
//   },
// }

// export const SuffixIcon: Story = {
//   args: {
//     type: 'text',
//     placeholder: '請输入文字...',
//   },
//   render: (args) => {
//     return (
//       <Input>
//         <Input {...args} />
//       </Input>
//     )
//   },
// }

// export const AddonBefore: Story = {
//   args: {
//     type: 'number',
//     placeholder: '請输入文字...',
//     addonBefore: '＄',
//   },
//   render: (args) => {
//     return (
//       <Input>
//         <Input {...args} />
//       </Input>
//     )
//   },
// }

export const Search: Story = {
  args: {
    type: 'search',
    placeholder: '搜尋',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => {
    return (
      <div className='flex'>
        <Input {...args} />
        <InputAddonBox position='after'>元</InputAddonBox>
      </div>
    )
  },
}
