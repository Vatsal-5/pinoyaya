import DateFilter from "@/components/common/filters/date";
import Radio from "@/components/common/inputs/radio";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const timeRegex = /^(0[1-9]|1[0-2]):[0-5][0-9]:(AM|PM)$/i;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const deliveryType = [
  { label: "Push Notification", value: "push-notification" },
  { label: "Email", value: "email" },
]

const step2Schema = z.object({
  delivery_type: z.string({ required_error: "Delivery Type is required" }).min(1, "Delivery Type is required"),
  delivery_time: z.string({ required_error: "Delivery Time is required" }).min(1, "Delivery Time is required"),
  date: z.string().optional(),
  time: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.delivery_time === "schedule_for_later") {
    if (!data.date || !dateRegex.test(data.date)) {
      ctx.addIssue({
        path: ["date"],
        code: z.ZodIssueCode.custom,
        message: "Date is required",
      });
    }

    if (!data.time || data.time.trim() === "" || data.time === "00:00AM") {
      ctx.addIssue({
        path: ["time"],
        code: z.ZodIssueCode.custom,
        message: "Time required",
      });
    } else if (!timeRegex.test(data.time)) {
      ctx.addIssue({
        path: ["time"],
        code: z.ZodIssueCode.custom,
        message: "Time required",
      });
    }
  }
});

const Step2 = ({ helpers, formData, setFormData }) => {
  const search = useSearch({ strict: false })
  const navigate = useNavigate()

  const step2Form = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues: formData.step2 || { delivery_type: "", delivery_time: "", date: "", time: "00:00:AM" },
  });

  const onStep2FormSubmit = (e) => {
    console.log(e)
    navigate({ search: { ...search, step: 3 } })
    setFormData(prev => ({ ...prev, step2: e }));
    helpers.setStep(3)
  }

  const handleTimeChange = (type, value) => {
    let [hour, minute, ampm] = step2Form.getValues("time").split(":")

    if (type === "hour") hour = value
    if (type === "minute") minute = value
    if (type === "ampm") ampm = value

    step2Form.setValue("time", `${hour}:${minute}:${ampm}`, { shouldDirty: true, shouldValidate: true })
  }

  return (
    <Form {...step2Form}>
      <form noValidate onSubmit={step2Form.handleSubmit(onStep2FormSubmit)} className="space-y-4">
        <div className="flex flex-col gap-y-1">
          <p className="text-text-1 text-base font-normal">Delivery Type:</p>
          <Radio name="delivery_type" options={deliveryType} />
        </div>
        <div className="flex flex-col gap-y-1">
          <p className="text-text-1 text-base font-normal">Delivery Time:</p>
          <FormField
            control={step2Form.control}
            name="delivery_time"
            render={({ field, formState: { errors } }) => (
              <div className='space-y-1'>
                <FormItem className="relative space-y-0">
                  <FormControl className="gap-2">
                    <RadioGroup value={field.value} onValueChange={field.onChange}>
                      <div className={cn("px-4 flex items-center gap-x-3 bg-text-23 rounded-xl border",
                        errors?.delivery_time?.message ? 'border-red-500 text-red-500' : 'border-transparent',
                      )}>
                        <RadioGroupItem value="send-now" id="send-now" />
                        <Label htmlFor="send-now" className="w-full py-3.5 text-text-1 text-sm">Send Now</Label>
                      </div>
                      <div className={cn("px-4 pb-4 flex flex-col items-center gap-x-3 bg-text-23 rounded-xl border",
                        errors?.delivery_time?.message ? 'border-red-500 text-red-500' : 'border-transparent',
                      )}>
                        <div className="w-full flex items-center gap-x-3">
                          <RadioGroupItem value="schedule_for_later" id="schedule-for-later" />
                          <Label htmlFor="schedule-for-later" className="w-full py-3.5 text-text-1 text-sm">Schedule for Later</Label>
                        </div>
                        <div className="w-full flex gap-x-2">
                          <DateFilter
                            name="date"
                            containerClassName="w-full"
                            placeholder="Date"
                          />
                          <FormField
                            control={step2Form.control}
                            name="time"
                            render={({ field, formState: { errors: timeError } }) => {
                              const [hour, minute, ampm] = field.value.split(":")
                              return (
                                <FormItem className="w-full">
                                  <FormControl>
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <Button
                                          variant="outline"
                                          className={cn(
                                            "w-full h-max pr-2 pl-3 py-[9px] bg-transparent text-sm border-border-5 rounded-md justify-between hover:text-text-1 hover:bg-transparent",
                                            (!field.value || field.value === "00:00:AM") && "opacity-70",
                                            timeError?.time?.message
                                              ? "border-red-500 text-red-500 hover:text-red-500 hover:border-red-500"
                                              : "text-text-1",
                                          )}
                                        >
                                          {hour}:{minute}
                                          <div className="flex items-center gap-x-1">
                                            <span className="text-text-1 text-sm font-medium">{ampm}</span>
                                            <ChevronDown className="size-4 min-w-4 text-text-2" />
                                          </div>
                                        </Button>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-1">
                                        <div className="w-full h-full max-h-[250px] flex overflow-hidden">
                                          <ScrollArea className="w-full max-h-[250px]">
                                            <div className="flex sm:flex-col p-2">
                                              {Array.from({ length: 12 }, (_, i) => i + 1)
                                                .reverse()
                                                .map((hour) => (
                                                  <Button
                                                    key={hour}
                                                    size="icon"
                                                    variant="ghost"
                                                    className="sm:w-full text-text-1 text-sm hover:text-text-1 hover:bg-transparent"
                                                    onClick={() =>
                                                      handleTimeChange("hour", hour.toString().padStart(2, "0"))
                                                    }
                                                  >
                                                    {hour.toString().padStart(2, "0")}
                                                  </Button>
                                                ))}
                                            </div>
                                            <ScrollBar
                                              orientation="horizontal"
                                              className="sm:hidden"
                                            />
                                          </ScrollArea>
                                          <ScrollArea className="w-full max-h-[250px]">
                                            <div className="flex sm:flex-col p-2">
                                              {Array.from({ length: 12 }, (_, i) => i * 5).map(
                                                (minute) => (
                                                  <Button
                                                    key={minute}
                                                    size="icon"
                                                    variant="ghost"
                                                    className="sm:w-full text-text-1 text-sm hover:text-text-1 hover:bg-transparent"
                                                    onClick={() =>
                                                      handleTimeChange("minute", minute.toString().padStart(2, "0"))
                                                    }
                                                  >
                                                    {minute.toString().padStart(2, "0")}
                                                  </Button>
                                                )
                                              )}
                                            </div>
                                            <ScrollBar
                                              orientation="horizontal"
                                              className="sm:hidden"
                                            />
                                          </ScrollArea>
                                          <ScrollArea className="w-full max-h-[250px]">
                                            <div className="flex sm:flex-col p-2">
                                              {["AM", "PM"].map((ampm) => (
                                                <Button
                                                  key={ampm}
                                                  size="icon"
                                                  variant="ghost"
                                                  className="sm:w-full text-text-1 text-sm hover:text-text-1 hover:bg-transparent"
                                                  onClick={() => handleTimeChange("ampm", ampm)}
                                                >
                                                  {ampm}
                                                </Button>
                                              ))}
                                            </div>
                                          </ScrollArea>
                                        </div>
                                      </PopoverContent>
                                    </Popover>
                                  </FormControl>
                                  <FormMessage className="pl-3 text-xs font-medium text-red-500 sm:text-sm" />
                                </FormItem>
                              )
                            }}
                          />
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              </div>
            )}
          />
        </div>
        <div className="mt-8 flex gap-x-11">
          <Button type="button" className="w-full p-2.5 rounded-xl text-text-1 bg-text-24 hover:text-text-1 hover:bg-text-24"
            onClick={() => {
              navigate({ search: { ...search, step: 1 } })
              helpers.setStep(1)
            }}>
            Back
          </Button>
          <Button type="submit" className="w-full p-2.5 rounded-xl bg-text-7 hover:bg-text-7">
            Next
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default Step2