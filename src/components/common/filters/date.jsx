import { CalendarIcon } from "@/assets/icons/dashboard";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import moment from "moment";

const DateFilter = ({
  name,
  label,
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
        <div className={cn("space-y-1", containerClassName)}>
          {label && (
            <Label className="text-text-1 text-base font-normal">{label}</Label>
          )}
          <FormItem>
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "pr-2 pl-3 py-[7px] bg-transparent text-sm border-border-5 rounded-md justify-between hover:bg-transparent hover:text-text-1",
                      !field.value && "opacity-70",
                      errors?.[name]?.message
                        ? "border-red-500 text-red-500 hover:text-red-500 hover:border-red-500"
                        : "text-text-1",
                      className
                    )}
                  >
                    {field.value ? (
                      moment(field.value).format("DD MMM YYYY")
                    ) : (
                      <span>{placeholder}</span>
                    )}
                    <CalendarIcon className="size-6 stroke-text-2 stroke-[1.5px]" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={e => field.onChange(moment(e).format("YYYY-MM-DD"))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage className="pl-3 text-xs font-medium text-red-500 sm:text-sm" />
          </FormItem>
        </div>
      )}
    />
  );
};

export default DateFilter;
