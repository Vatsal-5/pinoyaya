import { ReceiptTicketIcon } from '@/assets/icons/dashboard';
import { ExportIcon } from '@/assets/icons/job-post-management';
import { WalletMoneyIcon } from '@/assets/icons/payment-management';
import DataTable from '@/components/common/datatable';
import DateFilter from '@/components/common/filters/date';
import Limit from '@/components/common/filters/limit';
import Select from '@/components/common/inputs/select';
import UserAvtar from '@/components/common/user-avtar';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { H3 } from '@/components/ui/Typography';
import { ROLES } from '@/constants/common';
import { PaginationSchema } from '@/lib/schema';
import { formatNumber } from '@/lib/utils';
import { faker } from '@faker-js/faker';
import { createFileRoute } from '@tanstack/react-router';
import { ChevronDown, MinusIcon } from 'lucide-react';
import moment from 'moment';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import ExpiryUsageStatus from '@/components/payment-management/expiry-usage-status'

export const Route = createFileRoute('/_protected/payment-management')({
  component: RouteComponent,
  validateSearch: search => PaginationSchema.parse(search),
})

const subscriptionOption = [
  { value: "one-time", label: "One Time" },
  { value: "life-time", label: "Life Time" },
]

export const paymentTypeOption = [
  { value: "subscription", label: "Subscription" },
  { value: "chat-credits", label: "Chat Credits" },
  { value: "boost-purchase", label: "Boost Purchase" },
]

export const paymentPlatformOption = [
  { value: "apple", label: "🍏 Apple" },
  { value: "google", label: "▶️ Google" },
]

function RouteComponent() {
  const { limit } = Route.useSearch()

  const filterForm = useForm({
    defaultValues: { limit }
  });

  const paymentCards = [
    {
      name: "Total revenue",
      value: 12430,
      color: "#E1E8FF",
      prefix: "₱",
      formate: false,
      icon: <WalletMoneyIcon className="size-5 stroke-text-2" />,
    },
    {
      name: "Number of transactions",
      value: 22,
      color: "#E1E8FF",
      formate: true,
      icon: <ReceiptTicketIcon className="size-5 stroke-text-2" />,
    },
  ]

  const jobPostData = useMemo(
    () =>
      new Array(69).fill().map(() => ({
        id: faker.database.mongodbObjectId(),
        user_img: faker.image.avatar(),
        fname: faker.person.firstName(),
        lname: faker.person.lastName(),
        receipt_number: `№${faker.number.int({ min: 1000000, max: 9999999 })}`,
        email: faker.internet.email(),
        payment_type: faker.helpers.arrayElement(paymentTypeOption.map(option => option.label)),
        payment_plan: faker.helpers.arrayElement(["Plan: Monthly (₱487)", ...paymentTypeOption.map(option => option.label)]),
        payment_platform: faker.helpers.arrayElement(paymentPlatformOption.map(option => option.label)),
        purchase_date: faker.date.recent({ days: 30 }),
        expire_date: faker.date.future({ days: 90 }),
        status: faker.helpers.arrayElement([0, 1, 2, 3]),
      })),
    [])

  const columns = [
    {
      id: 'user_img-align-start',
      accessorKey: 'user_img',
      header: () => 'User Name',
      cell: ({ row }) => (
        <UserAvtar
          img={row.original.user_img}
          fullname={`${row.original.fname} ${row.original.lname}`}
        />
      )
    },
    {
      accessorKey: 'receipt_number',
      header: () => 'Receipt ID',
    },
    {
      accessorKey: 'email',
      header: () => 'Email',
    },
    {
      accessorKey: 'payment_type',
      header: () => 'Payment Type',
    },
    {
      accessorKey: 'payment_plan',
      header: () => 'Details',
    },
    {
      accessorKey: 'payment_platform',
      header: () => 'Platform',
    },
    {
      accessorKey: 'purchase_date',
      header: () => (
        <div className='flex justify-center items-center gap-x-1'>
          <span>Purchase Date</span>
          <ChevronDown className='size-3.5' />
        </div>
      ),
      cell: ({ row }) => moment(row.original.purchase_date).format("DD MMM YYYY")
    },
    {
      accessorKey: 'expire_date',
      header: () => (
        <div className='flex justify-center items-center gap-x-1'>
          <span>Expiry/Usage</span>
          <ChevronDown className='size-3.5' />
        </div>
      ),
      cell: ({ row }) => moment(row.original.expire_date).format("DD MMM YYYY")
    },
    {
      accessorKey: 'status',
      header: () => (
        <div className='flex justify-center items-center gap-x-1'>
          <span>Status</span>
          <ChevronDown className='size-3.5' />
        </div>
      ),
      cell: ({ row }) => <ExpiryUsageStatus status={row.original.status} />
    },
    {
      id: "action",
      cell: () => {
        return (
          <Button type="button" className="px-4 py-2 rounded-2xl text-sm bg-transparent text-text-2 border border-text-2 hover:bg-transparent">
            View
          </Button>
        )
      }
    },
  ]

  const onSubmit = (e) => {
    console.log(e);
  };

  return (
    <>
      <div className="w-full pt-4 pb-2">
        <Form {...filterForm}>
          <form
            noValidate
            onSubmit={filterForm.handleSubmit(onSubmit)}
            className="w-full flex gap-x-6"
          >
            <div className="w-full grid grid-cols-5 gap-x-2">
              <Limit name="limit" placeholder="Select limit" className="w-full py-[9px]" />
              <Select name="user_type" placeholder="User Type" options={ROLES.map(role => ({ value: role, label: role }))} className="w-full py-[9px]" />
              <Select name="subscription" placeholder="Subscription" options={subscriptionOption} className="w-full py-[9px]" />
              <Select name="payment_type" placeholder="Payment Type" options={paymentTypeOption} className="w-full py-[9px]" />
              <Select name="payment_platform" placeholder="Payment Platform" options={paymentPlatformOption} className="w-full py-[9px]" />
            </div>
            <div className="flex justify-end items-center gap-x-1">
              <DateFilter
                name="start_date"
                containerClassName="w-full min-w-[142px]"
                placeholder="Start Date"
              />
              <MinusIcon className="min-w-2 size-2 text-text-1 rounded-lg" />
              <DateFilter
                name="end_date"
                containerClassName="w-full min-w-[142px]"
                placeholder="End Date"
              />
              <Button
                type="submit"
                className="w-full max-w-[76px] ml-1 py-2.5 text-sm rounded-xl"
              >
                Search
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-8 mb-5 grid grid-cols-2 gap-4">
          {paymentCards.map((data, index) => {
            return (
              <div key={index} className="p-3 flex items-start gap-x-3 bg-white rounded-xl">
                <div
                  style={{ backgroundColor: data.color }}
                  className="w-max p-2.5 rounded-full"
                >
                  {data.icon}
                </div>
                <div className='flex flex-col gap-y-0.5'>
                  <p className="font-medium text-sm text-text-1 opacity-60">{data.name}</p>
                  <H3 text={(data.prefix ?? "") + " " + formatNumber(data.value).replace(",", data.formate ? " " : ",")} className="font-bold" />
                </div>
              </div>
            );
          })}
        </div>
        <div className='flex flex-col gap-y-4'>
          <div className='flex justify-end items-center gap-x-2'>
            <Button type="button" className="w-full max-w-[134px] px-4 py-1.5 rounded-full text-sm text-text-2 bg-transparent border border-text-2 hover:bg-transparent">
              Export CSV
              <ExportIcon className="size-5 min-w-5 stroke-text-2" />
            </Button>
            <Button type="button" className="w-full max-w-[134px] px-4 py-1.5 rounded-full text-sm text-text-2 bg-transparent border border-text-2 hover:bg-transparent">
              Export PDF
              <ExportIcon className="size-5 min-w-5 stroke-text-2" />
            </Button>
          </div>
          <DataTable data={jobPostData} columns={columns} totalItems={jobPostData.length} enableRowSelection={true} />
        </div>
      </div>
    </>

  )
}
