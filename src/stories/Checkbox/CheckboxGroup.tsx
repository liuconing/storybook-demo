import { createContext, useContext, ReactNode, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Checkbox as CheckboxUI } from '@/components/ui/checkbox'
import { Label as LabelUI } from '@/components/ui/label'

interface CheckboxGroupContextType {
  value: string[]
  onChange: (value: string[]) => void
}

interface CheckboxProps {
  id: string
  label: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  className?: string
}

interface CheckboxGroupProps {
  value: string[]
  onChange: (value: string[]) => void
  children: ReactNode
  label?: string
  className?: string
}

const CheckboxGroupContext = createContext<CheckboxGroupContextType | null>(null)

/**
 * CheckboxGroup 是一個可以包含多個 Checkbox 的元件，用來讓使用者選擇多個選項。
 * @param value 選取的值
 * @param onChange 當選取的值改變時的 callback
 * @param children Checkbox 元件
 * @param label CheckboxGroup 的標題
 * @param className 其他樣式
 * @example <CheckboxGroup value={['option1', 'option2']} onChange={(value) => console.log(value)}>
 *  <Checkbox id='option1' label='選項 1' />
 * <Checkbox id='option2' label='選項 2' />
 * </CheckboxGroup>
 */
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

/**
 * Checkbox 是一個可以讓使用者勾選的元件。
 * @param id Checkbox 的 id
 * @param label Checkbox 的標籤
 * @param checked 是否勾選
 * @param onChange 當勾選狀態改變時的 callback
 * @param className 其他樣式
 * @param ref Checkbox 的 ref
 * @example <Checkbox id='option2' label='選項 2' checked className='text-red-500' onChange={(checked) => console.log(checked)} ref={ref}  />
 */
export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(function Checkbox(
  { id, label, checked, onChange, className },
  ref
) {
  const groupContext = useContext(CheckboxGroupContext)

  /**
   * 取得 Checkbox 的狀態
   * @param isChecked 是否勾選
   */
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
