import { forwardRef, DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, disabled = false, ...props },
  ref
) {
  return (
    <textarea
      className={cn(
        'flex items-center placeholder:text-muted-foreground transition-all ease-in-out',
        'h-20 w-full p-2 rounded-md border border-input bg-background shadow-sm',
        'file:border-0 file:bg-transparent file:text-sm file:font-medium',
        'focus-within:outline-none focus-within:ring-1 focus-within:ring-ring focus-within:ring-slate-400',
        disabled && 'cursor-not-allowed opacity-50 bg-muted'
      )}
      disabled={disabled}
      {...props}
      ref={ref}
    />
  )
})
