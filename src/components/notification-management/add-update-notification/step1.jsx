import Input from "@/components/common/inputs/input";
import Select from "@/components/common/inputs/select";
import TextEditorLink from '@/components/common/text-editor/link';
import { SmallCaps } from "@/components/common/text-editor/small-caps";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearch } from "@tanstack/react-router";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, UnderlineIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const step1Schema = z.object({
  title: z.string({ required_error: "Title is required" }).min(1, "Title is required"),
  message: z.string({ required_error: "Message is required" }).min(1, "Message is required"),
  audience_selection: z.array(z.string(), { required_error: "Audience selection is required" }).min(1, "Audience selection is required"),
  status: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.audience_selection.includes("target_by_user_status") && (!data.status || data.status.trim() === "")) {
    ctx.addIssue({
      path: ["status"],
      code: z.ZodIssueCode.custom,
      message: "Status is required",
    });
  }
});

const Step1 = ({ helpers, formData, setFormData }) => {
  const search = useSearch({ strict: false })
  const navigate = useNavigate()

  const step1Form = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: formData.step1 || { title: "", audience_selection: [], status: "" },
  });

  const onStep1FormSubmit = (e) => {
    console.log(e)
    helpers.setStep(2)
    setFormData(prev => ({ ...prev, step1: e }));
    navigate({ search: { ...search, step: 2 } })
  }

  const handleCheckBoxChange = (e, value) => {
    e
      ? step1Form.setValue("audience_selection", [...step1Form.getValues("audience_selection"), value], { shouldDirty: true, shouldValidate: true })
      : step1Form.setValue("audience_selection", step1Form.getValues("audience_selection").filter(e => e !== value), { shouldDirty: true, shouldValidate: true })
  }

  const editor = useEditor({
    extensions: [StarterKit, Link.configure({ openOnClick: true }), Placeholder.configure({ placeholder: 'Message Body' }), Underline, SmallCaps],
    content: step1Form.watch("message"),
    onUpdate: e => step1Form.setValue("message", e.editor.getHTML(), { shouldValidate: true, shouldDirty: true })
  })


  return (
    <Form {...step1Form}>
      <form noValidate onSubmit={step1Form.handleSubmit(onStep1FormSubmit)} className="space-y-4">
        <Input
          name="title"
          placeholder="Notification Title"
          label="Notification Title"
        />
        <div className="flex flex-col gap-y-1">
          <div className="flex justify-between items-center gap-x-2">
            <Label className="text-text-1 text-base font-normal">Message Body</Label>
            <div className='w-full max-w-[132px] flex items-center'>
              <TextEditorLink editor={editor} className="py-1 rounded-l-sm" iconClassName="size-3.5 min-w-3.5" />
              <Toggle size="lg" className="w-full min-w-auto h-[22px] p-0 rounded-none bg-text-19 hover:bg-text-19"
                pressed={editor.isActive('bold')}
                onPressedChange={() => editor.chain().focus().toggleBold().run()}
              >
                <Bold className='size-3.5 min-w-3.5 text-text-1' />
              </Toggle>
              <Toggle size="lg" className="w-full min-w-auto h-[22px] p-0 rounded-none bg-text-19 hover:bg-text-19"
                pressed={editor.isActive('italic')}
                onClick={() => editor.chain().focus().toggleItalic().run()}
              >
                <Italic className='size-3.5 min-w-3.5 text-text-1' />
              </Toggle>
              <Toggle size="lg" className="w-full min-w-auto h-[22px] p-0 rounded-none rounded-r-sm bg-text-19 hover:bg-text-19"
                pressed={editor.isActive('underline')}
                onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
              >
                <UnderlineIcon className='size-3.5 min-w-3.5 text-text-1' />
              </Toggle>
            </div>
          </div>
          <FormField
            control={step1Form.control}
            name="message"
            render={() => (
              <FormItem className="h-full relative gap-1">
                <ScrollArea className={cn("h-[165px] py-2 px-3 border rounded-md overflow-hidden", step1Form.formState.errors?.message ? "border-red-500" : "border-border-1")} viewPortClassName="[&>div]:h-full">
                  <EditorContent editor={editor} className="h-full [&>div]:h-full [&>div]:rounded-md [&>div]:outline-border" />
                  <ScrollBar orientation='horizontal' />
                </ScrollArea>
                <FormMessage className="pl-3 text-xs font-medium text-red-500 sm:text-sm" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <p className="text-text-1 text-base font-normal">Audience Selection:</p>
          <div className="flex flex-col gap-y-2">
            <div className={cn("px-4 flex items-center gap-x-3 rounded-lg bg-text-23 border transition-colors",
              step1Form.formState.errors?.audience_selection ? "border-red-500" : "border-transparent"
            )}>
              <Checkbox id="all-user" className="size-5" iconClassName="size-4" checked={step1Form.watch("audience_selection").includes("all_user")} onCheckedChange={(e) => handleCheckBoxChange(e, "all_user")} />
              <Label htmlFor="all-user" className="w-full py-3 text-text-1 text-sm">All Users</Label>
            </div>
            <div className={cn("px-4 flex items-center gap-x-3 rounded-lg bg-text-23 border transition-colors",
              step1Form.formState.errors?.audience_selection ? "border-red-500" : "border-transparent"
            )}>
              <Checkbox id="families-only" className="size-5" iconClassName="size-4" checked={step1Form.watch("audience_selection").includes("families_only")} onCheckedChange={(e) => handleCheckBoxChange(e, "families_only")} />
              <Label htmlFor="families-only" className="w-full py-3 text-text-1 text-sm">Families Only</Label>
            </div>
            <div className={cn("px-4 flex items-center gap-x-3 rounded-lg bg-text-23 border transition-colors",
              step1Form.formState.errors?.audience_selection ? "border-red-500" : "border-transparent"
            )}>
              <Checkbox id="caregivers-only" className="size-5" iconClassName="size-4" checked={step1Form.watch("audience_selection").includes("caregivers_only")} onCheckedChange={(e) => handleCheckBoxChange(e, "caregivers_only")} />
              <Label htmlFor="caregivers-only" className="w-full py-3 text-text-1 text-sm">Caregivers Only</Label>
            </div>
            <div className={cn("px-4 pb-4 flex flex-col items-center gap-y-1 rounded-lg bg-text-23 border transition-colors",
              step1Form.formState.errors?.audience_selection ? "border-red-500" : "border-transparent"
            )}>
              <div className="w-full flex items-center gap-x-3">
                <Checkbox id="target-by-user-status" className="size-5" iconClassName="size-4" checked={step1Form.watch("audience_selection").includes("target_by_user_status")} onCheckedChange={(e) => handleCheckBoxChange(e, "target_by_user_status")} />
                <Label htmlFor="target-by-user-status" className="w-full py-3 text-text-1 text-sm">Target by User Status</Label>
              </div>
              <Select
                name="status"
                placeholder="Status"
                options={[{ label: "Active", value: "active" }, { label: "Inactive", value: "inactive" }]}
                containerClassName="w-full"
                className="w-full"
              />
            </div>
          </div>
          <Button type="submit" className="w-full mt-8 p-2.5 rounded-xl bg-text-7 hover:bg-text-7">
            Next
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default Step1