import { SmallCapsIcon } from '@/assets/icons/content-management'
import { ExportIcon } from '@/assets/icons/job-post-management'
import TextEditorLink from '@/components/common/text-editor/link'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Toggle } from '@/components/ui/toggle'
import { createFileRoute } from '@tanstack/react-router'
import Link from '@tiptap/extension-link'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Bold, Italic, Type, UnderlineIcon } from 'lucide-react'
import Underline from '@tiptap/extension-underline'
import { SmallCaps } from '@/components/common/text-editor/small-caps'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import Select from '@/components/common/inputs/select'
import { useBoolean } from 'usehooks-ts'
import UpdateTermsConditions from '@/modals/update-terms-conditions'

export const Route = createFileRoute(
  '/_protected/content-management/privacy-policy',
)({
  component: RouteComponent,
})

const versionsOption = [
  { value: "last-updated", label: "Last Updated Version" },
  { value: "2-day-ago", label: "2 Day Ago Version" },
  { value: "1-month-ago", label: "1 Month Ago Version" },
]

function RouteComponent() {
  const confirmUpdateModal = useBoolean()

  const editor = useEditor({
    extensions: [StarterKit, Link.configure({ openOnClick: true }), Underline, SmallCaps],
    content: `<h2>Privacy Policy.</h2><p><br><br>Fringilla elit venenatis condimentum ac tortor urna vitae sit viverra. Faucibus est magna vel phasellus vulputate odio et in. Dignissim vivamus ac neque convallis sit tortor quis donec. Et massa neque pellentesque vulputate quisque senectus diam turpis erat. Commodo imperdiet tempus sit adipiscing adipiscing non hendrerit tellus auctor. Consequat habitasse praesent mi proin netus turpis vestibulum. <br><br>Ut ultrices sagittis nisl justo mattis at eget adipiscing. Dapibus nisi libero mauris urna feugiat vitae arcu gravida aliquam.<br><br>Pharetra lectus et dignissim cum lacus quis nulla diam. Lacus porta convallis varius volutpat sit quam eu. Tristique nisl aenean lectus et condimentum augue nibh suspendisse. Lectus in feugiat mauris pharetra. Diam dolor ultrices libero sed habitant quam. Fermentum neque sit lorem nunc sagittis pellentesque. Cursus pellentesque sed sem risus fames tincidunt tortor. Quis lorem eget congue eu gravida. Purus nisi ut ac ullamcorper duis. Ut nisl amet velit sodales urna varius. Enim facilisis consequat sed quam rhoncus purus. Aliquet hac pharetra duis massa vestibulum. Maecenas blandit egestas nec vehicula lorem lobortis laoreet.<br>Neque mi justo sit amet sit in purus velit sagittis. Nulla diam blandit viverra sit. Quis commodo mauris fermentum tristique. Mi elit cursus leo amet gravida neque nibh augue. Vulputate suspendisse sit lectus luctus mauris viverra. Scelerisque urna sem nullam ut pellentesque facilisis duis diam sit. Ullamcorper sagittis massa tincidunt sollicitudin. Odio sed etiam quis tristique aliquet sed. At tristique vulputate consectetur lobortis nibh cursus ornare mauris. Non et consectetur tellus morbi enim nunc vel. Auctor faucibus sed sed non sit senectus lobortis in aliquet. Feugiat at et in sollicitudin scelerisque tristique. Mattis nunc libero aenean blandit integer. Eget arcu a feugiat a. Scelerisque urna sit aliquam nulla nibh id.<br><br>Commodo donec lobortis egestas elementum. Integer egestas mauris amet imperdiet lacus velit. Ultricies mattis suscipit nulla sapien cursus faucibus eros. Pulvinar eget cras vitae montes. Dolor facilisis ut nec vestibulum massa viverra orci egestas. Sagittis aliquam hendrerit adipiscing ornare venenatis mauris. Nunc aliquet nibh neque et. Vel fringilla volutpat nunc imperdiet phasellus porta id gravida. Amet volutpat ornare maecenas faucibus sit faucibus massa. Nulla morbi amet sit commodo gravida leo. Sed diam orci sit id porttitor metus cras lorem arcu. Metus ornare laoreet lectus sagittis sagittis fusce sagittis.<br>Sagittis lorem vulputate gravida diam nisl. Suspendisse commodo elementum volutpat quam. Elementum nibh accumsan blandit dignissim nibh. Nibh ut tincidunt pulvinar viverra nunc mauris molestie. Augue in magna lacus molestie vitae consequat quam.<br><br>Suspendisse posuere sem lacus lectus massa in erat in. Pulvinar eu volutpat ut nulla id bibendum ultricies. Est ornare cum ut eu ipsum nisl bibendum habitant. Eleifend phasellus ut tortor suscipit ultrices lacinia. Nisl sit sed pulvinar sed proin ipsum. Lectus semper mattis id duis. Sit gravida neque sagittis lectus semper malesuada ultrices in curabitur. Id elementum vulputate diam egestas sit. Lectus lorem nunc elementum tincidunt. Adipiscing pretium sit egestas massa iaculis vitae ut sit. Id cras vitae accumsan mauris.</p>`,
  })

  const filterForm = useForm({
    defaultValues: { version: versionsOption.at(0).value }
  });

  const onSubmit = (e) => {
    console.log(e);
    confirmUpdateModal.setTrue()
  };
  return (
    <>
      <div className='w-full h-full py-5 flex flex-col gap-y-8'>
        <Form {...filterForm}>
          <form
            noValidate
            onSubmit={filterForm.handleSubmit(onSubmit)}
            className='w-full flex justify-between'
          >
            <div className='w-full max-w-[257px] flex items-center gap-x-2'>
              <Button type="submit" className="w-full max-w-[116px] py-2.5 text-sm rounded-xl">
                Update
              </Button>
              <Button type="button" className="w-full px-4 py-[9px] rounded-full text-sm text-text-2 bg-transparent border border-text-2 hover:bg-transparent">
                Export PDF
                <ExportIcon className="size-5 min-w-5 stroke-text-2" />
              </Button>
            </div>
            <div className='w-full flex items-center justify-end gap-x-3'>
              <div className='w-full max-w-[320px] flex items-center'>
                <TextEditorLink editor={editor} />
                <Toggle size="lg" className="w-full p-0 rounded-none bg-text-19 hover:bg-text-19"
                  pressed={editor.isActive('bold')}
                  onPressedChange={() => editor.chain().focus().toggleBold().run()}
                >
                  <Bold className='size-5 min-w-5 text-text-1' />
                </Toggle>
                <Toggle size="lg" className="w-full p-0 rounded-none bg-text-19 hover:bg-text-19"
                  pressed={editor.isActive('italic')}
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                  <Italic className='size-5 min-w-5 text-text-1' />
                </Toggle>
                <Toggle size="lg" className="w-full p-0 rounded-none bg-text-19 hover:bg-text-19"
                  pressed={editor?.isActive('smallcaps')}
                  onPressedChange={() => editor?.chain().focus().toggleSmallCaps().run()}
                >
                  <SmallCapsIcon className='size-5 min-w-5 stroke-text-1' />
                </Toggle>
                <Button type="button" className="w-full p-0 py-2.5 rounded-none bg-text-19 hover:bg-text-19 shadow-none"
                  onClick={() => editor?.chain().focus().unsetAllMarks().clearNodes().run()}
                >
                  <Type className='size-5 min-w-5 text-text-1' />
                </Button>
                <Toggle size="lg" className="w-full p-0 rounded-none rounded-r-xl bg-text-19 hover:bg-text-19"
                  pressed={editor.isActive('underline')}
                  onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
                >
                  <UnderlineIcon className='size-5 min-w-5 text-text-1' />
                </Toggle>
              </div>
              <Select
                name="version"
                placeholder="Version"
                options={versionsOption}
                className="w-full py-[9px]"
                containerClassName="w-full max-w-[216px]"
              />
            </div>
          </form>
        </Form>
        <ScrollArea className="h-[574px] p-4 border border-text-5 rounded-md overflow-hidden">
          <EditorContent editor={editor} />
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
        <p className='text-sm text-text-4'>last updated today 8:30AM</p>
      </div>

      <UpdateTermsConditions state={confirmUpdateModal} />
    </>
  )
}
