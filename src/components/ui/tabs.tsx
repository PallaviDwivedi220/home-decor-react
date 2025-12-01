import * as React from 'react'
import { cn } from '@/lib/utils'

type TabsContextValue = {
  value: string
  setValue: (v: string) => void
}

const TabsContext = React.createContext<TabsContextValue | null>(null)

export type TabsProps = React.HTMLAttributes<HTMLDivElement> & {
  defaultValue?: string
  value?: string
  onValueChange?: (v: string) => void
}

export function Tabs({ className, defaultValue, value: valueProp, onValueChange, ...props }: TabsProps) {
  const isControlled = valueProp !== undefined
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue || '')
  const value = isControlled ? (valueProp as string) : uncontrolled

  const setValue = React.useCallback((v: string) => {
    if (!isControlled) setUncontrolled(v)
    onValueChange?.(v)
  }, [isControlled, onValueChange])

  const ctx = React.useMemo(() => ({ value, setValue }), [value, setValue])

  return (
    <TabsContext.Provider value={ctx}>
      <div className={cn('w-full', className)} {...props} />
    </TabsContext.Provider>
  )
}

export function TabsList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div role="tablist" className={cn('inline-flex items-center gap-1 rounded-md bg-gray-100 p-1', className)} {...props} />
  )
}

export type TabsTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string
}

export function TabsTrigger({ className, value, ...props }: TabsTriggerProps) {
  const ctx = React.useContext(TabsContext)
  if (!ctx) throw new Error('TabsTrigger must be used within Tabs')
  const selected = ctx.value === value

  return (
    <button
      role="tab"
      aria-selected={selected}
      onClick={(e) => {
        props.onClick?.(e)
        ctx.setValue(value)
      }}
      className={cn(
        'px-3 py-1.5 text-sm rounded-md transition',
        selected ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-700 hover:text-gray-900',
        className
      )}
      {...props}
    />
  )
}

export type TabsContentProps = React.HTMLAttributes<HTMLDivElement> & {
  value: string
}

export function TabsContent({ className, value, ...props }: TabsContentProps) {
  const ctx = React.useContext(TabsContext)
  if (!ctx) throw new Error('TabsContent must be used within Tabs')
  const hidden = ctx.value !== value
  return (
    <div role="tabpanel" hidden={hidden} className={cn('mt-3', className)} {...props} />
  )
}
