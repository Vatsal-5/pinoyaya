import { EditIcon, SmsTrackingIcon } from "@/assets/icons/notification-management";
import { CheckCircle } from "@/assets/icons/user-management";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { useNavigate, useSearch } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useStep } from "usehooks-ts";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";

const AddUpdateNotification = ({ state, data, setData }) => {
  const search = useSearch({ strict: false })
  const navigate = useNavigate()

  const [currentStep, helpers] = useStep(3)

  const [formData, setFormData] = useState({ step1: null, step2: null, step3: null });

  const isUpdateForm = useMemo(() => Boolean(data?.step1 && data?.step2), [state.value])

  useEffect(() => {
    if (!state.value || !data) return
    setFormData(data)
  }, [state.value]);

  useEffect(() => {
    if (isNaN(search?.step)) return
    helpers.setStep(Number(search.step))
  }, [search?.step]);

  const onClose = () => {
    state.setFalse()
    setData(null)
    setFormData({ step1: null, step2: null, step3: null })
    navigate({ search: { page: search.page, limit: search.limit } })
  }

  const StepTransitionWrapper = ({ stepKey, children }) => (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepKey}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.3 }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
  return (
    <Drawer modal={false} open={state.value} direction="right" dismissible={false} onOpenChange={state.setValue}>
      {state.value && <div className="fixed inset-0 z-[52] bg-text-1 opacity-10" />}
      <DrawerContent className="!max-w-[512px] pt-8 gap-y-8 border-none">
        <DrawerHeader className="py-0 px-8">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-xl text-text-1">{isUpdateForm ? "Edit" : "Add"} Notification</DrawerTitle>
            <Button type="button" variant="outlined" className="p-0" onClick={onClose}>
              <X className="size-5 text-text-4" />
            </Button>
          </div>
          <VisuallyHidden.Root>
            <DrawerDescription>add or update notification</DrawerDescription>
          </VisuallyHidden.Root>
        </DrawerHeader>
        <div className="h-full flex flex-col overflow-hidden">
          <div className="px-8 flex justify-between items-center gap-x-2">
            <div className={cn("size-10 min-w-10 aspect-square flex items-center justify-center rounded-full", currentStep >= 1 ? "bg-text-7" : "bg-text-19")}>
              <EditIcon className={cn("size-5", currentStep >= 1 ? "stroke-white" : "stroke-text-2")} />
            </div>
            <div className={cn("w-full h-[1px]", currentStep >= 1 ? "bg-text-7" : "bg-text-5")} />
            <div className={cn("size-10 min-w-10 aspect-square flex items-center justify-center rounded-full", currentStep > 1 ? "bg-text-7" : "bg-text-19")}>
              <SmsTrackingIcon className={cn("size-5", currentStep > 1 ? "stroke-white" : "stroke-text-2")} />
            </div>
            <div className="w-full h-[1px] bg-text-5" />
            <div className={cn("size-10 min-w-10 aspect-square flex items-center justify-center rounded-full", currentStep === 3 ? "bg-text-7" : "bg-text-19")}>
              <CheckCircle className={cn("size-5", currentStep === 3 ? "stroke-white" : "stroke-text-2")} />
            </div>
          </div>
          <div className="h-full pl-8 pr-2 pb-4 mt-8 overflow-hidden">
            <ScrollArea className="h-full pr-6" viewPortClassName="[&>div]:!flex [&>div]:flex-col [&>div]:h-full">
              <StepTransitionWrapper stepKey={currentStep}>
                {currentStep === 1 && <Step1 helpers={helpers} formData={formData} setFormData={setFormData} />}
                {currentStep === 2 && <Step2 helpers={helpers} formData={formData} setFormData={setFormData} />}
                {currentStep === 3 && <Step3 helpers={helpers} formData={formData} setFormData={setFormData} onClose={onClose} />}
              </StepTransitionWrapper>
            </ScrollArea>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default AddUpdateNotification