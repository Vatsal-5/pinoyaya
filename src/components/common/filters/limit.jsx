import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LIMIT } from '@/constants/common';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';

const Limit = ({
  name,
  placeholder,
  containerClassName,
  className,
}) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, formState: { errors } }) => (
        <div className={cn("space-y-1 rounded-md", containerClassName)}>
          <FormItem>
            <FormControl>
              <Select value={field.value} onValueChange={e => field.onChange(Number(e))}>
                <SelectTrigger
                  className={cn(
                    "py-[7px] text-sm text-text-1 border-border-5 rounded-md data-[placeholder]:text-text-1 data-[placeholder]:opacity-70",
                    className,
                    errors?.[name]?.message ? "border-red-500 text-red-500" : ""
                  )}
                  iconClassName="text-text-1"

                >
                  <div>
                    <SelectValue placeholder={placeholder} />
                    {field.value
                      ? <>
                        &nbsp;
                        <span>rows/page</span>
                      </>
                      : null}
                  </div>
                </SelectTrigger>
                <SelectContent className="border-border-5">
                  {LIMIT.map((option, index) => (
                    <SelectItem
                      key={index}
                      value={option}
                      className="text-sm text-text-1 focus:text-text-1"
                    >
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage className="pl-3 text-xs font-medium text-red-500 sm:text-sm" />
          </FormItem>
        </div>
      )}
    />
  )
}

export default Limit