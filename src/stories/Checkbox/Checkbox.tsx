import React from 'react'
import { Checkbox as CheckboxItem } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxItem> {
  label: string
}

export const Checkbox = ({ label = '', ...props }: CheckboxProps) => {
  return (
    <div className='flex items-center space-x-2'>
      <CheckboxItem {...props} />
      <Label
        htmlFor={props.id}
        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-60'
      >
        {label}
      </Label>
    </div>
  )
}
