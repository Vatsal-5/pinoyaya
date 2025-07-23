import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Select as SelectComponent,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';

const Select = ({
  name,
  placeholder,
  containerClassName,
  className,
  options = [],
  label,
}) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, formState: { errors } }) => (
        <div className={cn("space-y-1 rounded-md", containerClassName)}>
          {label ? <Label className="text-text-1 text-base font-normal">{label}</Label> : null}
          <FormItem className="gap-1">
            <FormControl>
              <SelectComponent value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  className={cn(
                    "py-[7px] text-sm text-text-1 border-border-5 rounded-md data-[placeholder]:text-text-1 data-[placeholder]:opacity-70",
                    className,
                    errors?.[name]?.message ? "border-red-500 text-red-500" : ""
                  )}
                  iconClassName="text-text-1"
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className="border-border-5">
                  {options.map((option, index) => (
                    <SelectItem
                      key={index}
                      value={option.value}
                      className="text-sm text-text-1 focus:text-text-1"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectComponent>
            </FormControl>
            <FormMessage className="pl-3 text-xs font-medium text-red-500 sm:text-sm" />
          </FormItem>
        </div>
      )}
    />
  )
}

export default Select