import React from 'react'
import { Checkbox } from '@/components/ui/Checkbox'
import { Label } from '@/components/ui/Label'

export interface CheckboxOption {
  id: string
  label: string
}

interface CheckboxGroupProps {
  options: CheckboxOption[]
  value: string[]
  onChange: (value: string[]) => void
  label?: string
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ options, value, onChange, label }) => {
  const handleCheckboxChange = (optionId: string, checked: boolean) => {
    if (checked) {
      onChange([...value, optionId])
    } else {
      onChange(value.filter((id) => id !== optionId))
    }
  }

  return (
    <div className='space-y-2'>
      {label && <Label className='text-base'>{label}</Label>}
      {options.map((option) => (
        <div key={option.id} className='flex items-center space-x-2'>
          <Checkbox
            id={option.id}
            checked={value.includes(option.id)}
            onCheckedChange={(checked) => handleCheckboxChange(option.id, checked as boolean)}
          />
          <Label
            htmlFor={option.id}
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            {option.label}
          </Label>
        </div>
      ))}
    </div>
  )
}
