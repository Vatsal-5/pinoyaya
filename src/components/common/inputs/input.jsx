import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input as InputComponent } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { useEventListener } from 'usehooks-ts'

const Input = ({ name, placeholder, textarea = false, label, containerClassName, className, prefix, prefixContainerClassName, type = 'text', ...other }) => {
    const { control } = useFormContext()
    const inputRef = useRef(document)

    const handleKeyPress = (e) => {
        if (type !== 'number') return
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault()
        }
    }

    useEventListener('wheel', (e) => type === 'number' ? e.preventDefault() : e, inputRef)

    return (
        <FormField
            control={control}
            name={name}
            render={({ field, formState: { errors } }) => (
                <div className={cn('space-y-1', containerClassName)}>
                    {label ? <Label className="text-text-1 text-base font-normal">{label}</Label> : null}
                    <FormItem className="relative space-y-0">
                        <FormControl>
                            {textarea ? (
                                <Textarea
                                    {...field}
                                    {...other}
                                    autoComplete="off"
                                    id={name}
                                    required
                                    placeholder={placeholder}
                                    className={cn(
                                        'bg-white px-3 py-[9px] rounded-md text-sm placeholder:text-sm placeholder:text-text-1 placeholder:font-light focus-visible:ring-offset-0 sm:text-sm',
                                        errors?.[name]?.message ? 'border border-red-500 text-red-500' : 'text-text-1 border-border-1 border',
                                        prefix ? 'pl-[46px] sm:pl-[60px]' : '',
                                        className
                                    )}
                                />
                            ) : (
                                <InputComponent
                                    ref={inputRef}
                                    {...field}
                                    {...other}
                                    id={name}
                                    onKeyPress={handleKeyPress}
                                    autoComplete="off"
                                    required
                                    placeholder={placeholder}
                                    className={cn(
                                        'bg-white px-3 py-[9px] rounded-md text-sm placeholder:text-sm placeholder:text-text-1 placeholder:font-light focus-visible:ring-offset-0 sm:text-sm',
                                        errors?.[name]?.message ? 'border border-red-500 text-red-500' : 'text-text-1 border-border-1 border',
                                        prefix ? 'pl-[46px] sm:pl-[60px]' : '',
                                        className
                                    )}
                                />
                            )}
                        </FormControl>
                        {prefix && (
                            <div
                                className={cn(
                                    'absolute flex size-5 items-center sm:size-6',
                                    textarea ? 'top-3.5 left-4 sm:top-4 sm:left-[22px]' : 'top-1/2 left-4 -translate-y-1/2 sm:left-[22px]',
                                    prefixContainerClassName
                                )}
                            >
                                {prefix}
                            </div>
                        )}
                    </FormItem>
                    <FormMessage className="pl-3 text-xs font-medium text-red-500 sm:text-sm" />
                </div>
            )}
        />
    )
}

export default Input