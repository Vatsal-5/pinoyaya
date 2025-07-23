import DateFilter from '@/components/common/filters/date';
import DisputeStatus from '@/components/user-management/dispute-status';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form'
import { ChevronRight, MinusIcon } from 'lucide-react';
import moment from 'moment';
import React, { Fragment } from 'react'
import { useForm } from 'react-hook-form';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const Dispute = ({ data }) => {
  const filterForm = useForm();

  const onSubmit = (e) => {
    console.log(e);
  };
  return (
    <div className='flex flex-col gap-y-6 overflow-hidden'>
      <Form {...filterForm}>
        <form
          noValidate
          onSubmit={filterForm.handleSubmit(onSubmit)}
          className="flex justify-between gap-x-2"
        >
          <div className="w-full flex justify-end items-center gap-x-1">
            <DateFilter
              name="start_date"
              containerClassName="w-full"
              placeholder="Start Date"
            />
            <MinusIcon className="size-2 text-text-1 rounded-lg" />
            <DateFilter
              name="end_date"
              containerClassName="w-full"
              placeholder="End Date"
            />
          </div>
          <Button
            type="submit"
            className="w-full max-w-[76px] py-2.5 text-sm rounded-xl"
          >
            Search
          </Button>
        </form>
      </Form>
      <div className='h-full overflow-hidden'>
        <ScrollArea className="h-full">
          <table className="w-full border-separate border-spacing-y-2">
            <tbody>
              {data.map((data, index) => {
                return (
                  <Fragment key={index}>
                    <tr className="h-11 bg-text-13 text-center [&>td]:px-4">
                      <td className="text-xs text-text-1 font-medium rounded-l-xl">{data.ticket_number}</td>
                      <td className="text-xs text-text-1 font-medium whitespace-nowrap">
                        {moment(data.date).format("DD MMM YYYY")}
                      </td>
                      <td className="text-xs text-text-1 font-medium whitespace-nowrap">
                        {data.reason}
                      </td>
                      <td>
                        <DisputeStatus status={data.status} />
                      </td>
                      <td className="!pr-2 py-2 rounded-r-xl">
                        <ChevronRight className='size-4 text-text-2' />
                      </td>
                    </tr>
                  </Fragment>
                )
              })}
            </tbody>
          </table>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </div>
    </div>
  )
}

export default Dispute