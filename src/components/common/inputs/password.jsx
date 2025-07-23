import { EyeOff, EyeOn } from '@/assets/icons/common'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

const Password = ({ name, placeholder = '', label = '', className = '', prefix, ...other }) => {
    const [showPassword, setShowPassword] = useState(false)
    const { control } = useFormContext()

    return (
        <FormField
            control={control}
            name={name}
            render={({ field, formState: { errors } }) => (
                <div className='space-y-1'>
                    {label ? <Label className="text-text-1 text-base font-normal">{label}</Label> : null}
                    <FormItem className="relative space-y-0">
                        <FormControl>
                            <Input
                                {...field}
                                {...other}
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="off"
                                id={name}
                                required
                                placeholder={placeholder}
                                className={cn(
                                    'bg-white px-3 py-[9px] rounded-md text-sm placeholder:text-sm placeholder:text-text-1 placeholder:font-light focus-visible:ring-offset-0 sm:text-sm',
                                    'pr-10',
                                    errors?.[name]?.message ? 'border border-red-500 text-red-500' : 'text-text-1 border-border-1 border',
                                    prefix ? 'pl-[46px] sm:pl-[60px]' : '',
                                    className
                                )}
                            />
                        </FormControl>
                        {prefix ? <div className="absolute top-1/2 left-4 flex size-5 -translate-y-1/2 items-center sm:left-[22px] sm:size-6">{prefix}</div> : null}

                        <Button
                            type="button"
                            className="h-full !p-0 absolute top-1/2 right-0 aspect-square -translate-y-1/2 rounded-l-none rounded-r-2xl bg-transparent shadow-none cursor-pointer hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOn className="size-5 min-h-5 min-w-5 stroke-text-2 stroke-[1.5px]" />
                            ) : (
                                <EyeOff className="size-5 min-h-5 min-w-5 stroke-text-2" />
                            )}
                        </Button>
                    </FormItem>
                    <FormMessage className="pl-3 text-xs font-medium text-red-500 sm:text-sm" />
                </div>
            )}
        ></FormField>
    )
}

export default Password