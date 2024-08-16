import * as React from 'react'
import { cn } from '@/lib/utils'
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons'

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type?: 'text' | 'email' | 'number' | 'tel' | 'url' | 'search'
  status?: 'default' | 'error'
  disabled?: boolean
  Password?: React.ReactNode
}

const inputDefaultStyle = cn(
  'flex items-center placeholder:text-muted-foreground transition-all ease-in-out',
  'h-10 w-full px-2 rounded-md border border-input bg-background shadow-sm',
  'file:border-0 file:bg-transparent file:text-sm file:font-medium',
  'focus-within:outline-none focus-within:ring-1 focus-within:ring-ring focus-within:ring-slate-400'
)

const Input = React.forwardRef<HTMLInputElement, InputProps>(function InputField(
  { className, type = 'text', status = 'default', ...props },
  ref
) {
  return (
    <input
      type={type}
      className={cn(inputDefaultStyle, status === 'error' && 'border-rose-500', className)}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'

interface InputPasswordProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {}

/** 密碼 */
const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(function InputPassword(
  { className, ...props },
  ref
) {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)

  const togglePasswordVisibility = React.useCallback(() => {
    setIsPasswordVisible((prev) => !prev)
  }, [])

  return (
    <div className={cn(inputDefaultStyle, className)}>
      <input
        type={isPasswordVisible ? 'text' : 'password'}
        className={cn('bg-transparent outline-none text-base w-full h-full px-3 py-1 disabled:cursor-not-allowed')}
        ref={ref}
        {...props}
      />
      <div className={cn('cursor-pointer pr-2', className)} onClick={togglePasswordVisibility} {...props}>
        {isPasswordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
      </div>
    </div>
  )
})
InputPassword.displayName = 'InputPassword'

interface AddonProps extends React.HTMLAttributes<HTMLSpanElement> {
  position: 'before' | 'after'
}

const InputAddonBox = ({ children, position, className, ...props }: AddonProps) => (
  <div
    className={cn(
      'flex items-center justify-center border-2 px-2 bg-neutral-50',
      position === 'before' ? 'rounded-l-md' : 'rounded-r-md',
      className
    )}
    {...props}
  >
    <div className='text-slate-950 text-opacity-75'>{children}</div>
  </div>
)

export { Input, InputPassword, InputAddonBox }
