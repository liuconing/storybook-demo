import { createContext, useContext, ReactNode, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Checkbox as CheckboxUI } from '@/components/ui/checkbox'
import { Label as LabelUI } from '@/components/ui/label'

interface CheckboxGroupContextType {
  value: string[]
  onChange: (value: string[]) => void
}

const CheckboxGroupContext = createContext<CheckboxGroupContextType | null>(null)

interface CheckboxProps {
  id: string
  label: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  className?: string
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(function Checkbox(
  { id, label, checked, onChange, className },
  ref
) {
  const groupContext = useContext(CheckboxGroupContext)

  const handleChange = (isChecked: boolean) => {
    if (groupContext) {
      const newValue = isChecked ? [...groupContext.value, id] : groupContext.value.filter((itemId) => itemId !== id)
      groupContext.onChange(newValue)
    } else {
      onChange?.(isChecked)
    }
  }

  const isChecked = groupContext ? groupContext.value.includes(id) : (checked ?? false)

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <CheckboxUI ref={ref} id={id} checked={isChecked} onCheckedChange={handleChange} />
      <LabelUI
        htmlFor={id}
        className={cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70')}
      >
        {label}
      </LabelUI>
    </div>
  )
})

interface CheckboxGroupProps {
  value: string[]
  onChange: (value: string[]) => void
  children: ReactNode
  label?: string
  className?: string
}

export const CheckboxGroup = ({ value, onChange, children, label, className }: CheckboxGroupProps) => {
  return (
    <CheckboxGroupContext.Provider value={{ value, onChange }}>
      <div className={cn('space-y-2', className)}>
        {label && <LabelUI className='text-base'>{label}</LabelUI>}
        {children}
      </div>
    </CheckboxGroupContext.Provider>
  )
}
