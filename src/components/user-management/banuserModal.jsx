import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import Radio from "../common/inputs/radio";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Select from "../common/inputs/select";
import Input from "../common/inputs/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { BanUserSchema } from "@/lib/schema";

export const banReasonOption = [
  { label: "Abusive Behavior", value: "abuse" },
  { label: "Spamming or Phishing", value: "spam" },
  { label: "Multiple Failed Login Attempts", value: "login-fail" },
  { label: "Violation of Terms of Service", value: "terms-violation" },
  { label: "Inappropriate Content", value: "inappropriate-content" },
  { label: "Request by User", value: "user-request" },
];

const BanuserModal = ({ state }) => {
  const banForm = useForm({
    defaultValues: { type: "", reason: "", note: "" },
    resolver: zodResolver(BanUserSchema),
  });

  const onSubmit = (e) => {
    console.log(e);
    state.setFalse()
    banForm.reset()
  };

  const handleModalClose = () => {
    state.setFalse()
    banForm.reset()
  }

  const banType = [
    { label: "Suspend User", value: "suspend" },
    { label: "Reset Password", value: "reset-password" },
    { label: "Send Reminder Email", value: "reminder-email" }
  ]
  return (
    <Dialog open={state.value} onOpenChange={state.setValue}>
      <DialogContent showCloseButton={false} className="py-5 px-7 pb-8 gap-y-4">
        <DialogHeader className="relative">
          <DialogTitle className="text-2xl text-text-1 text-center">
            Ban
          </DialogTitle>
          <Button
            type="button"
            variant="outlined"
            className="p-0 absolute right-0 top-1/2 -translate-y-1/2"
            onClick={handleModalClose}
          >
            <X className="size-5 text-text-4" />
          </Button>
          <VisuallyHidden.Root>
            <DialogDescription>ban user from accessing app</DialogDescription>
          </VisuallyHidden.Root>
        </DialogHeader>
        <Form {...banForm}>
          <form noValidate onSubmit={banForm.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-4">
              <Radio name="type" options={banType} />
              <Select
                name="reason"
                placeholder="Choose Reason"
                options={banReasonOption}
                className="w-full py-[9px]"
                label="Reason"
              />
              <Input
                name="note"
                placeholder="Your Note"
                label="Note"
                textarea
                className="h-[100px] resize-none"
              />
            </div>
            <Button
              type="submit"
              className="w-full mt-8 p-2.5 rounded-xl bg-text-7 hover:bg-text-7"
            >
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default BanuserModal