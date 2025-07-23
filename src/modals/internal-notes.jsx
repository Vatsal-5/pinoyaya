import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import Input from "@/components/common/inputs/input";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const noteSchema = z.object({
  note: z.string({ required_error: "Note is required" }).min(1, "Note is required"),
});

const InternalNotes = ({ state }) => {

  const handleModalClose = () => {
    state.setFalse()
  }

  const internalNotesForm = useForm({
    resolver: zodResolver(noteSchema),
    defaultValues: { note: "" },
  });

  const onSubmit = () => {
    handleModalClose()
  }
  return (
    <Dialog open={state.value} onOpenChange={state.setValue}>
      <DialogContent showCloseButton={false} className="py-5 px-7 pb-8 gap-y-4">
        <DialogHeader className="relative">
          <DialogTitle className="text-2xl text-text-1 text-center">Add Internal Note</DialogTitle>
          <Button type="button" variant="outlined" className="p-0 absolute right-0 top-1/2 -translate-y-1/2" onClick={handleModalClose}>
            <X className="size-5 text-text-4" />
          </Button>
          <VisuallyHidden.Root>
            <DialogDescription>
              add notes related to the disputes
            </DialogDescription>
          </VisuallyHidden.Root>
        </DialogHeader>
        <Form {...internalNotesForm}>
          <form noValidate onSubmit={internalNotesForm.handleSubmit(onSubmit)} className="space-y-8">
            <Input
              name="note"
              placeholder="Note"
              textarea
              className="h-[160px] resize-none"
            />
            <Button type="submit" className="w-full p-2.5 rounded-xl bg-text-7 hover:bg-text-7">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default InternalNotes