import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { DAY_FILTER } from "@/constants/common";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { useState } from "react";

const DayFilter = ({
  name,
  label,
  placeholder,
  containerClassName,
  className,
  controlled = true
}) => {
  const [value, setValue] = useState("");

  if (!controlled) {
    return (
      <div className={cn("space-y-1 rounded-md", containerClassName)}>
        {label && (
          <Label className="text-text-1 text-base font-normal">{label}</Label>
        )}
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger
            className={cn(
              "py-[7px] text-sm text-text-1 border-border-5 rounded-md data-[placeholder]:text-text-1 data-[placeholder]:opacity-70",
              className
            )}
            iconClassName="text-text-1"
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="border-border-5">
            {DAY_FILTER.map((option, index) => (
              <SelectItem
                key={index}
                value={option.value.start ?? option.value}
                className="text-sm text-text-1 focus:text-text-1"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  const { control } = useFormContext();
  
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, formState: { errors } }) => (
        <div className={cn("space-y-1 rounded-md", containerClassName)}>
          {label && (
            <Label className="text-text-1 text-base font-normal">{label}</Label>
          )}
          <FormItem>
            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
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
                  {DAY_FILTER.map((option, index) => (
                    <SelectItem
                      key={index}
                      value={option.value.start ?? option.value}
                      className="text-sm text-text-1 focus:text-text-1"
                    >
                      {option.label}
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
  );
};

export default DayFilter;
