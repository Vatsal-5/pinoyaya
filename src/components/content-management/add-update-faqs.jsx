import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import Select from "../common/inputs/select";
import { categoryOption } from "@/routes/_protected/content-management/faqs";
import Input from "../common/inputs/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";

const faqSchema = z.object({
  question: z.string().min(1, "Text is required"),
  category: z.string().min(1, "Category is required"),
  answer: z.string().min(1, "Answer is required"),
});

const AddUpdateFaqs = ({ open, data, onClose }) => {
  const faqForm = useForm({
    resolver: zodResolver(faqSchema),
    defaultValues: { question: "", category: "", answer: "" },
  });

  const isUpdateModal = useMemo(() => Boolean(data), [open])

  useEffect(() => {
    if (!open || !data) return
    faqForm.reset(data)
  }, [open]);

  const onSubmit = (e) => {
    console.log(e);
    handleClose()
  };

  const handleClose = () => {
    onClose();
    faqForm.reset();
  };
  return (
    <Drawer
      modal={false}
      open={open}
      direction="right"
      dismissible={false}
    >
      {open && (
        <div className="fixed inset-0 z-[52] bg-text-1 opacity-10" />
      )}
      <DrawerContent className="!max-w-[512px] pt-8 gap-y-8 border-none">
        <DrawerHeader className="py-0 px-8">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-xl text-text-1">{isUpdateModal ? "Edit" : "Add"} FAQ</DrawerTitle>
            <Button
              type="button"
              variant="outlined"
              className="p-0"
              onClick={handleClose}
            >
              <X className="size-5 text-text-4" />
            </Button>
          </div>
          <VisuallyHidden.Root>
            <DrawerDescription>add or update faq</DrawerDescription>
          </VisuallyHidden.Root>
        </DrawerHeader>
        <Form {...faqForm}>
          <form
            noValidate
            onSubmit={faqForm.handleSubmit(onSubmit)}
            className='px-8 space-y-4'
          >
            <Input
              name="question"
              label="Question"
              placeholder="Question"
            />
            <Select
              name="category"
              placeholder="Category"
              options={categoryOption}
              className="w-full py-[9px]"
              label="Category"
            />
            <Input
              name="answer"
              placeholder="Answer"
              label="Answer"
              textarea
              className="h-[120px] resize-none"
            />
            <Button type="submit" className="w-full mt-4 py-2.5 text-base rounded-xl">
              {isUpdateModal ? "Update" : "Save"}
            </Button>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  )
}

export default AddUpdateFaqs