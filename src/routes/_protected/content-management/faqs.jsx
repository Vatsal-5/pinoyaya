import Select from '@/components/common/inputs/select';
import AddUpdateFaqs from '@/components/content-management/add-update-faqs';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { faker } from '@faker-js/faker';
import { createFileRoute } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'usehooks-ts';

export const Route = createFileRoute('/_protected/content-management/faqs')({
  component: RouteComponent,
})

export const categoryOption = [
  { value: "General", label: "General" },
  { value: "Billing", label: "Billing" },
  { value: "Technical", label: "Technical" },
  { value: "Account", label: "Account" },
  { value: "Security", label: "Security" },
]

function RouteComponent() {
  const filterForm = useForm();

  const faqs = useMemo(() => (
    Array.from({ length: faker.number.int({ min: 5, max: 20 }) }).map(() => ({
      id: faker.database.mongodbObjectId(),
      question: faker.lorem.sentence(8),
      category: faker.helpers.arrayElement(categoryOption.map(a => a.label)),
      answer: faker.lorem.paragraphs(5),
    }))
  ), [])

  const [showMore, setShowMore] = useState(new Map(faqs.map(a => [a.id, false])));
  const faqsDrawer = useBoolean(false)
  const [selectedFaq, setSelectedFaq] = useState(null);

  const getPreviewText = (text, isExpanded) => {
    const previewLimit = 400;
    if (isExpanded || text.length <= previewLimit) return text;
    return text.slice(0, previewLimit) + '…';
  };

  const onSubmit = (e) => {
    console.log(e);
  };
  return (
    <>
      <div className='w-full h-full py-5 flex flex-col gap-y-8'>
        <div className='w-full flex justify-between'>
          <Button type="button" className="w-full max-w-[116px] py-2.5 text-sm rounded-xl" onClick={faqsDrawer.setTrue}>
            <PlusIcon className='size-5' />
            Add
          </Button>
          <Form {...filterForm}>
            <form
              noValidate
              onSubmit={filterForm.handleSubmit(onSubmit)}
              className='w-full max-w-[216px]'
            >
              <Select
                name="category"
                placeholder="Category"
                options={categoryOption}
                className="w-full py-[9px]"
              />
            </form>
          </Form>
        </div>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="px-4 py-2 flex items-end gap-x-11 bg-white rounded-xl">
              <div className='flex flex-col gap-y-2'>
                <p className="text-sm font-semibold text-text-1">{faq.question}</p>
                <p className="text-xs text-text-4">{faq.category}</p>
                <p className="text-sm text-text-1 break-words">
                  {getPreviewText(faq.answer, showMore.get(faq.id))}
                  {faq.answer.length > 200 && (
                    <button
                      type="button"
                      className="ml-1 text-text-7 text-sm font-semibold inline cursor-pointer"
                      onClick={() => {
                        setShowMore(prev => {
                          const newMap = new Map(prev);
                          newMap.set(faq.id, !prev.get(faq.id));
                          return newMap;
                        });
                      }}
                    >
                      {showMore.get(faq.id) ? " show less" : " more"}
                    </button>
                  )}
                </p>
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <Button
                  type="button"
                  className="w-full py-1.5 rounded-xl text-sm text-text-2 bg-transparent border border-text-2 hover:bg-transparent"
                  onClick={() => {
                    faqsDrawer.setTrue()
                    setSelectedFaq(faq)
                  }}
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  className="w-full py-1.5 rounded-xl text-sm text-text-2 bg-transparent border border-text-2 hover:bg-transparent"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddUpdateFaqs
        data={selectedFaq}
        open={faqsDrawer.value}
        onClose={() => {
          faqsDrawer.setFalse()
          setSelectedFaq(null)
        }}
      />
    </>
  )
}
