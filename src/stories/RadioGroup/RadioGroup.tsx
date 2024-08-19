import React, { ReactNode, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { RadioGroup as RadioGroupContent, RadioGroupItem } from '@/components/ui/radio-group'

interface RadioProps extends React.ComponentPropsWithoutRef<typeof RadioGroupItem> {
  label: string
  value: string
}

/**
 * 單選框
 * @param label 標籤
 * @param value 值
 * @param id id
 */
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

/**
 * 單選框群組
 * @param value 值
 * @param onValueChange 值改變時觸發
 * @param children 子元素
 * @param label 標籤
 * @example <RadioGroup value={value} onValueChange={setValue} label="單選框群組">
 *             <Radio label="選項一" value="1" />
 *             <Radio label="選項二" value="2" />
 *             <Radio label="選項三" value="3" />
 *          </RadioGroup>
 */
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
