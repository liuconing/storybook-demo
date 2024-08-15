import * as React from 'react'
import { cn } from '@/utils'
import { EyeOpenIcon } from '@radix-ui/react-icons'
import { EyeClosedIcon } from '@radix-ui/react-icons'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
  prefixIcon?: React.ReactNode
  suffixIcon?: React.ReactNode
  addonBefore?: React.ReactNode
  addonAfter?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', id, prefixIcon, suffixIcon, addonAfter, addonBefore, ...props }, ref) => {
    const [isEyeOpenVisible, setIsEyeOpenVisible] = React.useState(false)
    return (
      <div
        className={cn(
          'flex items-center gap-2 placeholder:text-muted-foreground transition-all ease-in-out',
          'h-10 w-full',
          'rounded-md border border-input bg-background shadow-sm',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'focus-within:outline-none focus-within:ring-1 focus-within:ring-ring focus-within:ring-slate-400',
          className,
          props?.disabled && 'cursor-not-allowed opacity-50 bg-muted'
        )}
      >
        {/* 前面標誌（可放文字或圖片） */}
        {prefixIcon && <div className='pl-2'>{prefixIcon}</div>}

        {/* 前面圖片 */}
        {addonBefore && (
          <span className={cn('flex items-center justify-center h-full px-2 bg-neutral-50', 'border-r-2 rounded-l-md')}>
            <div className='text-slate-950 text-opacity-75'>{addonBefore}</div>
          </span>
        )}

        <input
          type={!!isEyeOpenVisible ? 'text' : type}
          className='bg-transparent outline-none text-base w-full h-full px-3 py-1 disabled:cursor-not-allowed'
          ref={ref}
          {...props}
        />

        {/* 不是密碼模式才可以放後面圖片 */}
        {type !== 'password' && suffixIcon && <div className='pr-2'>{suffixIcon}</div>}

        {/* 密碼模式顯示眼睛 */}
        {type === 'password' && (
          <div className='cursor-pointer' onClick={() => setIsEyeOpenVisible((pev) => !pev)}>
            {isEyeOpenVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </div>
        )}

        {/* 後面圖片（可放文字或圖片） */}
        {addonAfter && (
          <span className={cn('flex items-center justify-center h-full px-2 bg-neutral-50', 'border-l-2 rounded-r-md')}>
            <div className='text-slate-950 text-opacity-75'>{addonAfter}</div>
          </span>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
