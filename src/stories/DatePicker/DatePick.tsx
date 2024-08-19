'use client'
import * as React from 'react'
import { useImperativeHandle, useRef } from 'react'
import { add, format } from 'date-fns'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button, buttonVariants } from '@/components/ui/button'
import { CalendarProps } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Clock } from 'lucide-react'
import { enUS, Locale } from 'date-fns/locale'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DayPicker } from 'react-day-picker'

// ---------- 工具函數開始 ----------
/**
 * 檢查是否為有效的小時格式（01-23）
 */
function isValidHour(value: string) {
  return /^(0[0-9]|1[0-9]|2[0-3])$/.test(value)
}

/**
 * 檢查是否為有效的12小時制格式（01-12）
 */
function isValid12Hour(value: string) {
  return /^(0[1-9]|1[0-2])$/.test(value)
}

/**
 * 檢查是否為有效的分鐘格式（00-59）
 */
function isValidMinuteOrSecond(value: string) {
  return /^[0-5][0-9]$/.test(value)
}

type GetValidNumberConfig = { max: number; min?: number; loop?: boolean }

function getValidNumber(value: string, { max, min = 0, loop = false }: GetValidNumberConfig) {
  let numericValue = parseInt(value, 10)

  if (!isNaN(numericValue)) {
    if (!loop) {
      if (numericValue > max) numericValue = max
      if (numericValue < min) numericValue = min
    } else {
      if (numericValue > max) numericValue = min
      if (numericValue < min) numericValue = max
    }
    return numericValue.toString().padStart(2, '0')
  }

  return '00'
}

/**
 * 獲取有效的小時值
 * @param value - 24小時制值
 * @returns
 */
function getValidHour(value: string) {
  if (isValidHour(value)) return value
  return getValidNumber(value, { max: 23 })
}

/**
 * 獲取有效的12小時制值
 * @param value - 12小時制值
 */
function getValid12Hour(value: string) {
  if (isValid12Hour(value)) return value
  return getValidNumber(value, { min: 1, max: 12 })
}

/**
 * 獲取有效的分鐘或秒數值
 * @param value - 分鐘或秒數值
 */
function getValidMinuteOrSecond(value: string) {
  if (isValidMinuteOrSecond(value)) return value
  return getValidNumber(value, { max: 59 })
}

type GetValidArrowNumberConfig = {
  min: number
  max: number
  step: number
}

function getValidArrowNumber(value: string, { min, max, step }: GetValidArrowNumberConfig) {
  let numericValue = parseInt(value, 10)
  if (!isNaN(numericValue)) {
    numericValue += step
    return getValidNumber(String(numericValue), { min, max, loop: true })
  }
  return '00'
}

/**
 * 獲取有效的箭頭小時值
 * @param value - 小時值
 * @param step - 步長值
 */
function getValidArrowHour(value: string, step: number) {
  return getValidArrowNumber(value, { min: 0, max: 23, step })
}

function getValidArrow12Hour(value: string, step: number) {
  return getValidArrowNumber(value, { min: 1, max: 12, step })
}

function getValidArrowMinuteOrSecond(value: string, step: number) {
  return getValidArrowNumber(value, { min: 0, max: 59, step })
}

function setMinutes(date: Date, value: string) {
  const minutes = getValidMinuteOrSecond(value)
  date.setMinutes(parseInt(minutes, 10))
  return date
}

function setSeconds(date: Date, value: string) {
  const seconds = getValidMinuteOrSecond(value)
  date.setSeconds(parseInt(seconds, 10))
  return date
}

function setHours(date: Date, value: string) {
  const hours = getValidHour(value)
  date.setHours(parseInt(hours, 10))
  return date
}

function set12Hours(date: Date, value: string, period: Period) {
  const hours = parseInt(getValid12Hour(value), 10)
  const convertedHours = convert12HourTo24Hour(hours, period)
  date.setHours(convertedHours)
  return date
}

type TimePickerType = 'minutes' | 'seconds' | 'hours' | '12hours'
type Period = 'AM' | 'PM'

/**
 * 根據類型設置日期
 * @param date - 日期對象
 * @param value - 要設置的值
 * @param type - 時間選擇器類型
 * @param period - 週期（上午/下午）
 */
function setDateByType(date: Date, value: string, type: TimePickerType, period?: Period) {
  switch (type) {
    case 'minutes':
      return setMinutes(date, value)
    case 'seconds':
      return setSeconds(date, value)
    case 'hours':
      return setHours(date, value)
    case '12hours': {
      if (!period) return date
      return set12Hours(date, value, period)
    }
    default:
      return date
  }
}

function getDateByType(date: Date | null, type: TimePickerType) {
  if (!date) return '00'
  switch (type) {
    case 'minutes':
      return getValidMinuteOrSecond(String(date.getMinutes()))
    case 'seconds':
      return getValidMinuteOrSecond(String(date.getSeconds()))
    case 'hours':
      return getValidHour(String(date.getHours()))
    case '12hours':
      const hours = display12HourValue(date.getHours())
      return getValid12Hour(String(hours))
    default:
      return '00'
  }
}

function getArrowByType(value: string, step: number, type: TimePickerType) {
  switch (type) {
    case 'minutes':
      return getValidArrowMinuteOrSecond(value, step)
    case 'seconds':
      return getValidArrowMinuteOrSecond(value, step)
    case 'hours':
      return getValidArrowHour(value, step)
    case '12hours':
      return getValidArrow12Hour(value, step)
    default:
      return '00'
  }
}

/**
 * 處理12小時制輸入值的變化
 * 12:00 PM 是 12:00
 * 12:00 AM 是 00:00
 */
function convert12HourTo24Hour(hour: number, period: Period) {
  if (period === 'PM') {
    if (hour <= 11) {
      return hour + 12
    } else {
      return hour
    }
  } else if (period === 'AM') {
    if (hour === 12) return 0
    return hour
  }
  return hour
}

/**
 * 時間以24小時制存儲，
 * 但需要以12小時制顯示給用戶
 */
function display12HourValue(hours: number) {
  if (hours === 0 || hours === 12) return '12'
  if (hours >= 22) return `${hours - 12}`
  if (hours % 12 > 9) return `${hours}`
  return `0${hours % 12}`
}

function genMonths(locale: Locale) {
  return Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: format(new Date(2021, i), 'MMMM', { locale }),
  }))
}

function genYears(locale: Locale, yearRange = 50) {
  const today = new Date()
  return Array.from({ length: yearRange * 2 + 1 }, (_, i) => ({
    value: today.getFullYear() - yearRange + i,
    label: (today.getFullYear() - yearRange + i).toString(),
  }))
}

// ---------- 工具函數結束 ----------

/**
 * 日曆組件
 * @param className - 額外的 CSS 類名
 * @param classNames - 組件內部元件自定義 CSS 類名
 * @param showOutsideDays - 是否顯示外部日期
 * @param yearRange - 年份範圍
 */
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  yearRange = 50,
  ...props
}: CalendarProps & { yearRange?: number }) {
  const MONTHS = React.useMemo(() => genMonths(props.locale || enUS), [props.locale])
  const YEARS = React.useMemo(() => genYears(props.locale || enUS, yearRange), [props.locale, yearRange])

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 justify-center',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day: cn(buttonVariants({ variant: 'ghost' }), 'h-9 w-9 p-0 font-normal aria-selected:opacity-100'),
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside:
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className='h-4 w-4' />,
        IconRight: ({ ...props }) => <ChevronRight className='h-4 w-4' />,
        CaptionLabel: ({ displayMonth }) => {
          return (
            <div className='inline-flex gap-2'>
              <Select
                defaultValue={displayMonth.getMonth().toString()}
                onValueChange={(value) => {
                  const newDate = new Date(displayMonth)
                  newDate.setMonth(parseInt(value, 10))
                  props.onMonthChange?.(newDate)
                }}
              >
                <SelectTrigger className='w-fit border-none p-0 focus:bg-accent focus:text-accent-foreground'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MONTHS.map((month) => (
                    <SelectItem key={month.value} value={month.value.toString()}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                defaultValue={displayMonth.getFullYear().toString()}
                onValueChange={(value) => {
                  const newDate = new Date(displayMonth)
                  newDate.setFullYear(parseInt(value, 10))
                  props.onMonthChange?.(newDate)
                }}
              >
                <SelectTrigger className='w-fit border-none p-0 focus:bg-accent focus:text-accent-foreground'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {YEARS.map((year) => (
                    <SelectItem key={year.value} value={year.value.toString()}>
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

interface PeriodSelectorProps {
  period: Period
  setPeriod?: (m: Period) => void
  date?: Date | null
  onDateChange?: (date: Date | undefined) => void
  onRightFocus?: () => void
  onLeftFocus?: () => void
}

/**
 * 時間制選擇器
 * @param period - 時間制 AM/PM
 * @param setPeriod - 設置時間制
 * @param date - 日期對象
 * @param onDateChange - 日期更改時的回調函數
 * @param onLeftFocus - 左焦點
 * @param onRightFocus - 右焦點
 * @param ref - ref
 */
const TimePeriodSelect = React.forwardRef<HTMLButtonElement, PeriodSelectorProps>(
  ({ period, setPeriod, date, onDateChange, onLeftFocus, onRightFocus }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'ArrowRight') onRightFocus?.()
      if (e.key === 'ArrowLeft') onLeftFocus?.()
    }

    const handleValueChange = (value: Period) => {
      setPeriod?.(value)

      /**
       * 每當用戶在上午和下午之間切換時觸發更新；
       * 否則，用戶必須手動更改小時
       */
      if (date) {
        const tempDate = new Date(date)
        const hours = display12HourValue(date.getHours())
        onDateChange?.(setDateByType(tempDate, hours.toString(), '12hours', period === 'AM' ? 'PM' : 'AM'))
      }
    }

    return (
      <div className='flex h-10 items-center'>
        <Select defaultValue={period} onValueChange={(value: Period) => handleValueChange(value)}>
          <SelectTrigger
            ref={ref}
            className='w-[65px] focus:bg-accent focus:text-accent-foreground'
            onKeyDown={handleKeyDown}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='AM'>AM</SelectItem>
            <SelectItem value='PM'>PM</SelectItem>
          </SelectContent>
        </Select>
      </div>
    )
  }
)

TimePeriodSelect.displayName = 'TimePeriodSelect'

interface TimePickerInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  picker: TimePickerType
  date?: Date | null
  onDateChange?: (date: Date | undefined) => void
  period?: Period
  onRightFocus?: () => void
  onLeftFocus?: () => void
}

/**
 * 時間選擇器輸入框
 * @param picker - 時間選擇器類型 'minutes' | 'seconds' | 'hours' | '12hours'
 * @param date - 日期對象
 * @param onDateChange - 日期更改時的回調函數
 * @param period - 時間制 'AM' | 'PM'
 * @param onLeftFocus - 左焦點
 * @param onRightFocus - 右焦點
 * @param ref - ref
 * @param className - 額外的 CSS 類名
 * @param type - 輸入框類型
 * @param value - 輸入框值
 * @param id - 輸入框 ID
 * @param name - 輸入框名稱
 * @param onChange - 輸入框值更改時的回調函數
 * @param onKeyDown - 輸入框按鍵按下時的回調函數
 * @example <TimePickerInput picker='hours' date={date} onDateChange={setDate} period='AM' />
 *
 */
const TimePickerInput = React.forwardRef<HTMLInputElement, TimePickerInputProps>(
  (
    {
      className,
      type = 'tel',
      value,
      id,
      name,
      date = new Date(new Date().setHours(0, 0, 0, 0)),
      onDateChange,
      onChange,
      onKeyDown,
      picker,
      period,
      onLeftFocus,
      onRightFocus,
      ...props
    },
    ref
  ) => {
    const [flag, setFlag] = React.useState<boolean>(false)
    const [prevIntKey, setPrevIntKey] = React.useState<string>('0')

    /**
     * 允許用戶在2秒內輸入第二個數字
     * 否則重新開始輸入第一個數字
     */
    React.useEffect(() => {
      if (flag) {
        const timer = setTimeout(() => {
          setFlag(false)
        }, 2000)

        return () => clearTimeout(timer)
      }
    }, [flag])

    const calculatedValue = React.useMemo(() => {
      return getDateByType(date, picker)
    }, [date, picker])

    const calculateNewValue = (key: string) => {
      /*
       * 如果 picker 是 '12hours' 且第一個數字是 0，則第二個數字自動設為 1。
       * 第二個輸入的數字將打破條件，並將值設置為 10-12。
       */
      if (picker === '12hours') {
        if (flag && calculatedValue.slice(1, 2) === '1' && prevIntKey === '0') return '0' + key
      }

      return !flag ? '0' + key : calculatedValue.slice(1, 2) + key
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Tab') return

      e.preventDefault()
      if (e.key === 'ArrowRight') onRightFocus?.()

      if (e.key === 'ArrowLeft') onLeftFocus?.()

      if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
        const step = e.key === 'ArrowUp' ? 1 : -1
        const newValue = getArrowByType(calculatedValue, step, picker)

        if (flag) setFlag(false)

        const tempDate = date ? new Date(date) : new Date()

        onDateChange?.(setDateByType(tempDate, newValue, picker, period))
      }

      if (e.key >= '0' && e.key <= '9') {
        if (picker === '12hours') setPrevIntKey(e.key)

        const newValue = calculateNewValue(e.key)

        if (flag) onRightFocus?.()

        setFlag((prev) => !prev)

        const tempDate = date ? new Date(date) : new Date()

        onDateChange?.(setDateByType(tempDate, newValue, picker, period))
      }
    }

    return (
      <Input
        ref={ref}
        id={id || picker}
        name={name || picker}
        className={cn(
          'w-[48px] text-center font-mono text-base tabular-nums caret-transparent focus:bg-accent focus:text-accent-foreground [&::-webkit-inner-spin-button]:appearance-none',
          className
        )}
        value={value || calculatedValue}
        onChange={(e) => {
          e.preventDefault()
          onChange?.(e)
        }}
        type={type}
        inputMode='decimal'
        onKeyDown={(e) => {
          onKeyDown?.(e)
          handleKeyDown(e)
        }}
        {...props}
      />
    )
  }
)

TimePickerInput.displayName = 'TimePickerInput'

interface TimePickerProps {
  date?: Date | null
  onChange?: (date: Date | undefined) => void
  hourCycle?: 12 | 24
  /**
   * 確定在日期時間選擇器中顯示的最小單位。
   * 預設為 'second'。
   * */
  granularity?: Granularity
}

interface TimePickerRef {
  minuteRef: HTMLInputElement | null
  hourRef: HTMLInputElement | null
  secondRef: HTMLInputElement | null
}

/**
 * TimePicker 是一個時間選擇器，用於選擇時間。
 * @param date - 日期對象
 * @param onChange - 日期更改時的回調函數
 * @param hourCycle - 12 或 24 小時制
 * @param granularity - 選擇時間的範圍
 * @example <TimePicker date={date} onChange={setDate} hourCycle={24} granularity='second' />
 */
const TimePicker = React.forwardRef<TimePickerRef, TimePickerProps>(
  ({ date, onChange, hourCycle = 24, granularity = 'second' }, ref) => {
    const minuteRef = React.useRef<HTMLInputElement>(null)
    const hourRef = React.useRef<HTMLInputElement>(null)
    const secondRef = React.useRef<HTMLInputElement>(null)
    const periodRef = React.useRef<HTMLButtonElement>(null)
    const [period, setPeriod] = React.useState<Period>(date && date.getHours() >= 12 ? 'PM' : 'AM')

    useImperativeHandle(
      ref,
      () => ({
        minuteRef: minuteRef.current,
        hourRef: hourRef.current,
        secondRef: secondRef.current,
        periodRef: periodRef.current,
      }),
      [minuteRef, hourRef, secondRef]
    )

    return (
      <div className='flex items-center justify-center gap-2'>
        <label htmlFor='datetime-picker-hour-input' className='cursor-pointer'>
          <Clock className='mr-2 h-4 w-4' />
        </label>
        <TimePickerInput
          picker={hourCycle === 24 ? 'hours' : '12hours'}
          date={date}
          id='datetime-picker-hour-input'
          onDateChange={onChange}
          ref={hourRef}
          period={period}
          onRightFocus={() => minuteRef.current?.focus()}
        />
        {(granularity === 'minute' || granularity === 'second') && (
          <>
            :
            <TimePickerInput
              picker='minutes'
              date={date}
              onDateChange={onChange}
              ref={minuteRef}
              onLeftFocus={() => hourRef.current?.focus()}
              onRightFocus={() => secondRef.current?.focus()}
            />
          </>
        )}
        {granularity === 'second' && (
          <>
            :
            <TimePickerInput
              picker='seconds'
              date={date}
              onDateChange={onChange}
              ref={secondRef}
              onLeftFocus={() => minuteRef.current?.focus()}
              onRightFocus={() => periodRef.current?.focus()}
            />
          </>
        )}
        {hourCycle === 12 && (
          <div className='grid gap-1 text-center'>
            <TimePeriodSelect
              period={period}
              setPeriod={setPeriod}
              date={date}
              onDateChange={(date) => {
                onChange?.(date)
                if (date && date?.getHours() >= 12) {
                  setPeriod('PM')
                } else {
                  setPeriod('AM')
                }
              }}
              ref={periodRef}
              onLeftFocus={() => secondRef.current?.focus()}
            />
          </div>
        )}
      </div>
    )
  }
)
TimePicker.displayName = 'TimePicker'

type Granularity = 'day' | 'hour' | 'minute' | 'second'

type DateTimePickerProps = {
  value?: Date
  onChange?: (date: Date | undefined) => void
  disabled?: boolean
  /** 是否顯示 `AM/PM`。 */
  hourCycle?: 12 | 24
  placeholder?: string
  /**
   * 年份範圍為：`今年 + yearRange` 和 `今年 - yearRange`。
   * 預設為 50。
   * 例如：
   * 今年是 2024，年份下拉選單將為 1974 到 2024，這是由 `2024 - 50 = 1974` 和 `2024 + 50 = 2074` 生成的。
   * */
  yearRange?: number
  /**
   * 格式參考自 `date-fns` 文件。
   * @reference https://date-fns.org/v3.6.0/docs/format
   **/
  displayFormat?: { hour24?: string; hour12?: string }
  /**
   * granularity 屬性允許您控制 DateTimePicker 顯示的最小單位。
   * 預設值為 `second`，顯示所有時間輸入。
   **/
  granularity?: Granularity
} & Pick<CalendarProps, 'locale' | 'weekStartsOn' | 'showWeekNumber' | 'showOutsideDays'>

type DateTimePickerRef = {
  value?: Date
} & Omit<HTMLButtonElement, 'value'>

/**
 * DateTimePicker 是一個日期時間選擇器，用於選擇日期和時間。
 * 它包含一個日期選擇器和一個時間選擇器。
 * @param value - 日期對象
 * @param onChange - 日期更改時的回調函數
 * @param disabled - 是否禁用日期時間選擇器
 * @param hourCycle - 12 或 24 小時制
 * @param yearRange - 年份範圍
 * @param displayFormat - 日期時間格式
 * @param granularity - 選擇時間的範圍
 * @param placeholder - 日期時間選擇器的占位符
 * @param locale - 地區設置
 * @example <DateTimePicker value={date} onChange={setDate} placeholder='What‘s your birthday?' granularity='day' />
 */
const DateTimePicker = React.forwardRef<DateTimePickerRef, DateTimePickerProps>(
  (
    {
      locale = enUS,
      value,
      onChange,
      hourCycle = 24,
      yearRange = 50,
      disabled = false,
      displayFormat,
      granularity = 'second',
      placeholder = '選擇日期',
      ...props
    },
    ref
  ) => {
    const [month, setMonth] = React.useState<Date>(value ?? new Date())
    const buttonRef = useRef<HTMLButtonElement>(null)
    /**
     * 當用戶點擊新的日期時，保留當前時間
     * 而不是重置為 00:00
     */
    const handleSelect = (newDay: Date | undefined) => {
      if (!newDay) return
      if (!value) {
        onChange?.(newDay)
        setMonth(newDay)
        return
      }
      const diff = newDay.getTime() - value.getTime()
      const diffInDays = diff / (1000 * 60 * 60 * 24)
      const newDateFull = add(value, { days: Math.ceil(diffInDays) })
      onChange?.(newDateFull)
      setMonth(newDateFull)
    }

    useImperativeHandle(
      ref,
      () => ({
        ...buttonRef.current!,
        value,
      }),
      [value]
    )

    const initHourFormat = {
      hour24: displayFormat?.hour24 ?? 'PPP HH:mm:ss',
      hour12: displayFormat?.hour12 ?? 'PP hh:mm:ss b',
    }

    return (
      <Popover>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            variant='outline'
            className={cn('w-[280px] justify-start text-left font-normal', !value && 'text-muted-foreground')}
            ref={buttonRef}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {value ? (
              format(value, hourCycle === 24 ? initHourFormat.hour24 : initHourFormat.hour12, {
                locale,
              })
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
          <Calendar
            mode='single'
            selected={value}
            month={month}
            onSelect={(d) => handleSelect(d)}
            onMonthChange={handleSelect}
            initialFocus
            yearRange={yearRange}
            locale={locale}
            {...props}
          />
          {granularity !== 'day' && (
            <div className='border-t border-border p-3'>
              <TimePicker onChange={onChange} date={value} hourCycle={hourCycle} granularity={granularity} />
            </div>
          )}
        </PopoverContent>
      </Popover>
    )
  }
)

DateTimePicker.displayName = 'DateTimePicker'

export { DateTimePicker, TimePickerInput, TimePicker }
export type { TimePickerType, DateTimePickerProps, DateTimePickerRef }
