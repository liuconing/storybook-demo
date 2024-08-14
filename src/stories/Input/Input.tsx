import { useState, InputHTMLAttributes, forwardRef, ReactNode } from 'react'
import { cn } from '@/utils'
import { EyeOpenIcon } from '@radix-ui/react-icons'
import { EyeClosedIcon } from '@radix-ui/react-icons'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
  prefixIcon?: any
  suffixIcon?: any
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', id, prefixIcon, suffixIcon, ...props }, ref) => {
    const [isEyeOpenVisible, setIsEyeOpenVisible] = useState(false)
    return (
      <div
        className={cn(
          'flex items-center gap-2 placeholder:text-muted-foreground transition-all ease-in-out',
          'h-10 w-full',
          'rounded-md border border-input bg-background shadow-sm',
          'px-3 py-1',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'focus-within:outline-none focus-within:ring-1 focus-within:ring-ring focus-within:ring-slate-400',
          className,
          props?.disabled && 'cursor-not-allowed opacity-50 bg-muted'
        )}
      >
        {prefixIcon}
        <input
          type={!!isEyeOpenVisible ? 'text' : type}
          className='bg-transparent outline-none text-base w-full disabled:cursor-not-allowed'
          ref={ref}
          {...props}
        />
        {type !== 'password' && suffixIcon}
        {type === 'password' && (
          <div className='cursor-pointer' onClick={() => setIsEyeOpenVisible((pev) => !pev)}>
            {isEyeOpenVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
