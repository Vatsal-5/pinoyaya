import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Link2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useBoolean } from "usehooks-ts";
import { z } from "zod";
import Input from "../inputs/input";
import { cn } from "@/lib/utils";

const linkSchema = z.object({
  text: z.string().min(1, "Text is required"),
  href: z.string().url("Enter a valid URL"),
});

const Link = ({ editor, className, iconClassName }) => {
  const linkDialog = useBoolean(false)

  const linkForm = useForm({
    resolver: zodResolver(linkSchema),
    defaultValues: { text: "", href: "" },
  });

  const unsetLink = () => {
    if (editor && editor.isActive('link')) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
    }
  }

  const onDialogOpen = (open) => {
    linkDialog.setValue(open);

    if (open) {
      if (editor && editor.isActive('link')) {
        editor.chain().extendMarkRange('link').run();
        const { href } = editor.getAttributes('link');
        const { from, to } = editor.state.selection;
        const text = editor.state.doc.textBetween(from, to, ' ');

        linkForm.reset({ text, href });
      } else {
        linkForm.reset({ text: "", href: "" });
        unsetLink();
      }
    }
  };

  const handleModalClose = () => {
    linkDialog.setFalse()
    linkForm.reset({ href: '', text: '' })
  }

  const addLink = ({ text, href }) => {
    if (!editor?.isFocused) {
      editor
        .chain()
        .focus()
        .setTextSelection(editor.state.doc.content.size - 1)
        .insertContent(`&nbsp;<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-text-7 font-semibold cursor-pointer">${text}</a>&nbsp;`)
        .setTextSelection(editor.state.doc.content.size)
        .run()
    } else {
      editor
        .chain()
        .focus()
        .insertContent(`&nbsp;<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-text-7 font-semibold cursor-pointer">${text}</a>&nbsp;`)
        .setTextSelection(editor.state.doc.content.size)
        .run()
    }
  }

  const updateLink = ({ text, href }) => {
    editor
      .chain()
      .extendMarkRange('link')
      .insertContent(`<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-text-7 font-semibold cursor-pointer">${text}</a>`)
      .setTextSelection(editor.state.doc.content.size)
      .run();
  }

  const onSubmit = ({ text, href }) => {
    const { state } = editor;
    const { empty } = state.selection;

    if (!empty || editor.isActive('link')) {
      updateLink({ text, href })
    } else {
      addLink({ text, href })
    }
    handleModalClose()
  };

  if (!editor) return

  return (
    <Dialog open={linkDialog.value} onOpenChange={onDialogOpen}>
      <DialogTrigger asChild>
        <Button className={
          cn("w-full p-0 py-2.5 rounded-none rounded-l-xl shadow-none",
            editor.isActive('link') ? "bg-accent hover:bg-accent" : "bg-text-19 hover:bg-text-19",
            className)}>
          <Link2 className={cn('size-5 min-w-5 text-text-1', iconClassName)} />
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="py-5 px-7 pb-8 gap-y-4">
        <DialogHeader className="relative">
          <DialogTitle className="text-2xl text-text-1 text-center">Link</DialogTitle>
          <Button type="button" variant="outlined" className="p-0 absolute right-0 top-1/2 -translate-y-1/2" onClick={handleModalClose}>
            <X className="size-5 text-text-4" />
          </Button>
          <VisuallyHidden.Root>
            <DialogDescription>
              insert a link in the text editor
            </DialogDescription>
          </VisuallyHidden.Root>
        </DialogHeader>
        <Form {...linkForm}>
          <form noValidate onSubmit={e => {
            e.preventDefault()
            e.stopPropagation()
            linkForm.handleSubmit(onSubmit)()
          }}>
            <div className="flex flex-col gap-y-4">
              <Input
                name="text"
                placeholder="Enter link text"
                label="Text"
              />
              <Input
                name="href"
                placeholder="Enter link"
                label="Link"
              />
            </div>
            <div className="mt-8 flex gap-x-4">
              <DialogClose type="button" className="w-full p-2.5 rounded-xl bg-transparent text-text-2 border border-text-2 hover:bg-transparent cursor-pointer" onClick={handleModalClose}>
                Cancel
              </DialogClose>
              <Button type="submit" className="w-full p-2.5 rounded-xl bg-text-7 hover:bg-text-7">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default Link