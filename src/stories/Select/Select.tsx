import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { CrossCircledIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface SelectOption {
  value: string
  label: string
}

export interface SelectProps {
  options: SelectOption[]
  type?: 'single' | 'multiple'
  showSearch?: boolean
  onChange?: (value: string | string[]) => void
}

export const Select = ({ options, type = 'single', showSearch = false, onChange }: SelectProps) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<string[]>([])

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
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' role='combobox' aria-expanded={open} className='w-[480px] justify-between'>
          {type === 'multiple' && (
            <div className='flex gap-2 justify-start'>
              {value?.length
                ? value.map((val, i) => (
                    <div
                      key={i}
                      className='flex items-center px-2 py-1 rounded-xl border bg-slate-200 text-xs'
                      onClick={(e) => {
                        e.preventDefault()
                        handleSelect(val)
                      }}
                    >
                      {options.find((item) => item.value === val)?.label}
                      <CrossCircledIcon className='size-3 ml-1' />
                    </div>
                  ))
                : 'Select...'}
            </div>
          )}
          {type === 'single' && (value?.length ? value : 'Select...')}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          {showSearch && <CommandInput placeholder='Search framework...' />}
          <CommandEmpty>No found.</CommandEmpty>
          <CommandList>
            {options &&
              options.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={() => {
                    handleSelect(item.value)
                  }}
                >
                  <Check className={cn('mr-2 h-4 w-4', value.includes(item.value) ? 'opacity-100' : 'opacity-0')} />
                  {item.label}
                </CommandItem>
              ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
