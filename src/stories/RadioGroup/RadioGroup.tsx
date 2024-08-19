import React, { ReactNode, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { RadioGroup as RadioGroupContent, RadioGroupItem } from '@/components/ui/radio-group'

interface RadioProps extends React.ComponentPropsWithoutRef<typeof RadioGroupItem> {
  label: string
  value: string
}

export const Radio = forwardRef<HTMLButtonElement, RadioProps>(function Radio(
  { label, value, id, className, ...props },
  ref
) {
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <RadioGroupItem ref={ref} value={value} id={id} {...props} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  )
})

interface RadioGroupProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>, 'onValueChange'> {
  value: string
  onValueChange: (value: string) => void
  children: ReactNode
  label?: string
  className?: string
}

export const RadioGroup = ({ value, onValueChange, children, label, className, ...props }: RadioGroupProps) => {
  return (
    <div className={cn('space-y-2', className)}>
      {label && <Label className='text-base'>{label}</Label>}
      <RadioGroupContent value={value} onValueChange={onValueChange} {...props}>
        {children}
      </RadioGroupContent>
    </div>
  )
}
