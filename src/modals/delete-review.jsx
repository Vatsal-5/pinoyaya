import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import Input from "@/components/common/inputs/input";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { banReasonOption } from "@/components/user-management/banuserModal";
import Select from "@/components/common/inputs/select";

const reviewSchema = z.object({
  reason: z
    .string({ required_error: "Reason is required" })
    .min(1, "Reason is required"),
  note: z
    .string({ required_error: "Note is required" })
    .min(1, "Note is required"),
});

const DeleteReview = ({ state }) => {
  const handleModalClose = () => {
    state.setFalse();
  };

  const deleteReviewForm = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: { reason: "", note: "" },
  });

  const onSubmit = () => {
    handleModalClose();
  };
  return (
    <Dialog open={state.value} onOpenChange={state.setValue}>
      <DialogContent showCloseButton={false} className="py-5 px-7 pb-8 gap-y-4">
        <DialogHeader className="relative">
          <DialogTitle className="text-2xl text-text-1 text-center">
            Delete
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
            <DialogDescription>delete reviews</DialogDescription>
          </VisuallyHidden.Root>
        </DialogHeader>
        <Form {...deleteReviewForm}>
          <form
            noValidate
            onSubmit={deleteReviewForm.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="flex flex-col gap-y-4">
              <Select
                name="reason"
                placeholder="Choose Reason"
                options={banReasonOption}
                className="w-full py-[9px]"
                label="Reason"
              />
              <Input
                name="note"
                placeholder="Note"
                textarea
                className="h-[120px] resize-none"
                label="Note"
              />
            </div>
            <Button
              type="submit"
              className="w-full p-2.5 rounded-xl bg-text-7 hover:bg-text-7"
            >
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteReview;
