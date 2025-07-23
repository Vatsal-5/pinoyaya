import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import React from 'react'
import { useFormContext } from 'react-hook-form'

const Radio = ({ name, options, containerClassName }) => {
  const { control } = useFormContext()
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, formState: { errors } }) => (
        <div className={cn('space-y-1', containerClassName)}>
          <FormItem className="relative space-y-0">
            <FormControl className="gap-2">
              <RadioGroup value={field.value} onValueChange={field.onChange}>
                {options.map((option, index) => {
                  return (
                    <div key={index} className={cn("px-4 flex items-center gap-x-3 bg-text-23 rounded-xl border",
                      errors?.[name]?.message ? 'border-red-500 text-red-500' : 'border-transparent',
                    )}>
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="w-full py-3.5 text-text-1 text-sm">{option.label}</Label>
                    </div>
                  )
                })}
              </RadioGroup>
            </FormControl>
          </FormItem>
        </div>
      )}
    />
  )
}

export default Radio