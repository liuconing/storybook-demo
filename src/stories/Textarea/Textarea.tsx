import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { Textarea as TextareaUI } from '@/components/ui/textarea'

export interface TextareaProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {}

/**
 * 文字區塊
 * @param disabled 是否禁用
 * @example <Textarea placeholder="Type something..." />
 */
export const Textarea = ({ className, disabled = false, ...props }: TextareaProps) => {
  return (
    <TextareaUI
      className={cn(disabled && 'cursor-not-allowed opacity-50 bg-muted', className)}
      disabled={disabled}
      {...props}
    />
  )
}
