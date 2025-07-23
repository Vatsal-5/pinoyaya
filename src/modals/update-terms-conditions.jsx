import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

const UpdateTermsConditions = ({ state }) => {

  const handleModalClose = () => {
    state.setFalse()
  }

  const updateTermsForm = useForm();

  const onSubmit = () => {
    handleModalClose()
  }
  return (
    <Dialog open={state.value} onOpenChange={state.setValue}>
      <DialogContent showCloseButton={false} className="py-5 px-7 pb-8 gap-y-4">
        <DialogHeader className="relative">
          <DialogTitle className="text-2xl text-text-1 text-center">Hey! 🧐</DialogTitle>
          <Button type="button" variant="outlined" className="p-0 absolute right-0 top-1/2 -translate-y-1/2" onClick={handleModalClose}>
            <X className="size-5 text-text-4" />
          </Button>
          <VisuallyHidden.Root>
            <DialogDescription>
              update confirmation of terms and conditions
            </DialogDescription>
          </VisuallyHidden.Root>
        </DialogHeader>
        <Form {...updateTermsForm}>
          <form noValidate onSubmit={updateTermsForm.handleSubmit(onSubmit)}>
            <p className="w-full max-w-[344px] mx-auto text-lg text-text-9 text-center">
              Are you sure you want to update
              the Terms & Conditions?
            </p>
            <div className="mt-8 flex gap-x-4">
              <DialogClose type="button" className="w-full p-2.5 rounded-xl bg-transparent text-text-2 border border-text-2 hover:bg-transparent cursor-pointer" onClick={handleModalClose}>
                Cancel
              </DialogClose>
              <Button type="submit" className="w-full p-2.5 rounded-xl bg-text-7 hover:bg-text-7">
                Yes
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateTermsConditions