import { useState, createContext, useContext, ReactNode } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { CrossCircledIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface SelectContextType {
  value: string[]
  type: 'single' | 'multiple'
  onSelect: (value: string) => void
}

const SelectContext = createContext<SelectContextType | undefined>(undefined)

interface SelectProps {
  type?: 'single' | 'multiple'
  showSearch?: boolean
  onChange?: (value: string | string[]) => void
  children: ReactNode
  disabled?: boolean
  placeholder?: string
  searchPlaceholder?: string
}

const Select = ({ type = 'single', showSearch = false, onChange, children, disabled, ...props }: SelectProps) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string[]>([])

  const handleSelect = (val: string) => {
    let updatedValue: string[] = []
    if (type === 'single') {
      updatedValue = [val]
      setOpen(false)
    } else {
      if (value.includes(val)) {
        updatedValue = value.filter((item) => item !== val)
      } else {
        updatedValue = [...value, val]
      }
    }
    setValue(updatedValue)
    onChange?.(updatedValue)
  }

  return (
    <SelectContext.Provider value={{ value, type, onSelect: handleSelect }}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger {...props} asChild disabled={disabled}>
          <Button variant='outline' role='combobox' aria-expanded={open} className={cn('w-[480px] justify-between')}>
            {type === 'multiple' && (
              <div className={cn('flex gap-2 justify-start')}>
                {value?.length
                  ? value.map((val, i) => (
                      <div
                        key={i}
                        className={cn('flex items-center px-2 py-1 rounded-xl border bg-slate-200 text-xs')}
                        onClick={(e) => {
                          e.preventDefault()
                          handleSelect(val)
                        }}
                      >
                        {val}
                        <CrossCircledIcon className='size-3 ml-1' />
                      </div>
                    ))
                  : (props.placeholder ?? 'Search...')}
              </div>
            )}
            {type === 'single' && (value?.length ? value[0] : (props.placeholder ?? 'Search...'))}
            <ChevronsUpDown className={cn('ml-2 h-4 w-4 shrink-0 opacity-50')} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn('w-[200px] p-0')}>
          <Command>
            {showSearch && <CommandInput placeholder={props.searchPlaceholder ?? 'Search...'} />}
            <CommandEmpty>No found.</CommandEmpty>
            <CommandList>{children}</CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </SelectContext.Provider>
  )
}

interface SelectItemProps {
  value: string
  children: React.ReactNode
}

const SelectItem = ({ value, children }: SelectItemProps) => {
  const context = useContext<SelectContextType | undefined>(SelectContext)

  if (!context) {
    throw new Error('SelectItem must be used within a Select component')
  }

  const { value: selectedValues, onSelect } = context
  const isSelected = selectedValues.includes(value)

  return (
    <CommandItem onSelect={() => onSelect(value)}>
      <Check className={cn('mr-2 h-4 w-4', isSelected ? 'opacity-100' : 'opacity-0')} />
      {children}
    </CommandItem>
  )
}

Select.Item = SelectItem

export { Select }
