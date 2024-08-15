import { Label } from '@/components/ui/label'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { RadioGroup as RadioGroupContent, RadioGroupItem } from '@/components/ui/radio-group'

export interface RadioOption {
  id: string
  value: string
}

export interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  options: RadioOption[]
  label?: string
  defaultValue?: string
}

export const RadioGroup = ({ label, options, defaultValue, ...props }: RadioGroupProps) => {
  return (
    <div className='space-y-2'>
      {label && <Label className='text-base'>{label}</Label>}
      <RadioGroupContent defaultValue={defaultValue} {...props}>
        {options.map((item) => (
          <div className='flex items-center space-x-2' key={item.id}>
            <RadioGroupItem value={item.value} id={item.id} />
            <Label htmlFor={item.id}>{item.value}</Label>
          </div>
        ))}
      </RadioGroupContent>
    </div>
  )
}
