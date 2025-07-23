import { ClipboardTickIcon, ExportIcon, WarningIcon } from '@/assets/icons/job-post-management';
import { ClockIcon } from '@/assets/icons/user-management';
import DataTable from '@/components/common/datatable';
import DateFilter from '@/components/common/filters/date';
import Limit from '@/components/common/filters/limit';
import Select from '@/components/common/inputs/select';
import UserAvtar from '@/components/common/user-avtar';
import JobPostDetails from '@/components/job-post-management';
import JobPostStatus from '@/components/job-post-management/job-status';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form } from '@/components/ui/form';
import { H3 } from '@/components/ui/Typography';
import { PaginationSchema } from '@/lib/schema';
import { formatNumber } from '@/lib/utils';
import { faker } from '@faker-js/faker';
import { createFileRoute } from '@tanstack/react-router';
import { MinusIcon } from 'lucide-react';
import moment from 'moment';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'usehooks-ts';

export const Route = createFileRoute('/_protected/job-post-management')({
  component: RouteComponent,
  validateSearch: search => PaginationSchema.parse(search),
})

export const jobTypeOption = [
  { value: "full-time", label: "Full Time" },
  { value: "part-time", label: "Part Time" }
]

export const jobStatusOption = [
  { value: "active", label: "Active" },
  { value: "in-progress", label: "In Progress" },
  { value: "expired", label: "Expired" }
]

export const locationOption = [
  { value: "america", label: "America" },
  { value: "philippines", label: "Philippines" },
  { value: "india", label: "India" },
]

const boostStatusOption = [
  { value: "boosted", label: "🔥 Boosted" },
  { value: "not-boosted", label: "Not Boosted" }
]

function RouteComponent() {
  const { page, limit } = Route.useSearch()
  const navigate = Route.useNavigate()

  const jobPostDetail = useBoolean(false)

  const jobPostCards = [
    {
      name: "Active",
      value: 1204,
      color: "#E1E8FF",
      icon: <ClipboardTickIcon className="size-5 stroke-text-2" />,
    },
    {
      name: "Boosted",
      value: 104,
      color: "#E1E8FF",
      icon: "🔥",
    },
    {
      name: "In Progress",
      value: 22,
      color: "#FFF7EB",
      icon: <ClockIcon className="size-5 stroke-[1.5px] stroke-text-12" />,
    },
    {
      name: "Cancelled",
      value: 96,
      color: "#FFE4E8",
      icon: <WarningIcon className="size-5 stroke-text-7" />,
    }
  ];

  const filterForm = useForm({
    defaultValues: { limit }
  });

  const jobPostData = useMemo(
    () =>
      new Array(69).fill().map(() => ({
        id: faker.database.mongodbObjectId(),
        type: "Babysitter",
        user_img: faker.image.avatar(),
        fname: faker.person.firstName(),
        lname: faker.person.lastName(),
        createdAt: faker.date.recent({ days: 5 }),
        expiresdAt: faker.helpers.arrayElement([faker.date.future(), null]),
        status: faker.helpers.arrayElement([0, 1, 2, 3]),
        boost: faker.helpers.arrayElement(["1d", null])
      })),
    [])

  const columns = [
    {
      id: 'select-col',
      header: ({ table }) => (
        <div className='flex justify-center items-center'>
          <Checkbox
            checked={table.getIsSomeRowsSelected() ? "indeterminate" : table.getIsAllRowsSelected()}
            onCheckedChange={e => {
              const value = { target: { checked: e } }
              table.getToggleAllRowsSelectedHandler()(value)
            }}
            className="size-5"
            iconClassName="size-4"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className='flex justify-center items-center'>
          <Checkbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onCheckedChange={row.getToggleSelectedHandler()}
            className="size-5"
            iconClassName="size-4"
          />
        </div>
      ),
    },
    {
      id: 'type-align-start',
      accessorKey: 'type',
      header: () => 'Type',
      cell: ({ row }) => <p className='text-start'>{row.original.type}</p>
    },
    {
      id: 'user_img-align-start',
      accessorKey: 'user_img',
      header: () => 'User Name',
      cell: ({ row }) => (
        <UserAvtar
          img={row.original.user_img}
          fullname={`${row.original.fname} ${row.original.lname}`}
          isactive={row.original.isactive}
          isReported={row.original.isReported}
          isVerified={row.original.isVerified}
          showRoleIcon={row.original.showRoleIcon}
        />
      )
    },
    {
      accessorKey: 'createdAt',
      header: () => 'Posted',
      cell: ({ row }) => moment(row.original.createdAt).format("DD MMM YYYY")
    },
    {
      accessorKey: 'expiresdAt',
      header: () => 'Expiry',
      cell: ({ row }) => row.original.expiresdAt ? moment(row.original.expiresdAt).format("DD MMM YYYY") : "-"
    },
    {
      accessorKey: 'status',
      header: () => 'Status',
      cell: ({ row }) => <JobPostStatus status={row.original.status} />
    },
    {
      accessorKey: 'boost',
      header: () => 'Boost',
      cell: ({ row }) => row.original.boost ? `🔥 Boosted (Ends in ${row.original.boost})` : "-"
    },
    {
      id: "action",
      cell: () => {
        return (
          <div className='flex items-center justify-end gap-x-2'>
            <Button type="button" className="px-4 py-2 rounded-full text-sm bg-transparent text-text-2 border border-text-2 hover:bg-transparent" onClick={jobPostDetail.setTrue}>
              View Details
            </Button>
          </div>
        )
      }
    },
  ]

  const onSubmit = (e) => {
    console.log(e);
    navigate({ search: { page, limit: e.limit } })
  };

  return (
    <>
      <div className="w-full pt-4 pb-2">
        <div className="grid grid-cols-4 gap-4">
          {jobPostCards.map((data, index) => {
            return (
              <div key={index} className="p-3 bg-white rounded-xl">
                <div
                  style={{ backgroundColor: data.color }}
                  className="size-10 min-w-10 flex items-center justify-center rounded-full"
                >
                  {data.icon}
                </div>
                <p className="mt-2 mb-1 font-medium text-sm text-text-1 opacity-60">{data.name}</p>
                <H3 text={formatNumber(data.value).replace(",", " ")} className="font-bold" />
              </div>
            );
          })}
        </div>
        <Form {...filterForm}>
          <form
            noValidate
            onSubmit={filterForm.handleSubmit(onSubmit)}
            className="flex gap-x-6 my-8"
          >
            <div className="w-full grid grid-cols-5 gap-x-2">
              <Limit name="limit" placeholder="Select limit" className="w-full py-[9px]" />
              <Select name="job_type" placeholder="Job Type" options={jobTypeOption} className="w-full py-[9px]" />
              <Select name="job_status" placeholder="Job Status" options={jobStatusOption} className="w-full py-[9px]" />
              <Select name="location" placeholder="Location" options={locationOption} className="w-full py-[9px]" />
              <Select name="boost_status" placeholder="Boost Status" options={boostStatusOption} className="w-full py-[9px]" />
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
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-x-2'>
            <Button type="button" className="w-full px-4 py-1.5 rounded-full text-sm text-text-2 bg-transparent border border-text-2 hover:bg-transparent">
              Extend Expiry
            </Button>
            <Button type="button" className="w-full px-4 py-1.5 rounded-full text-sm text-text-2 bg-transparent border border-text-2 hover:bg-transparent">
              Repost
            </Button>
            <Button type="button" className="w-full px-4 py-1.5 rounded-full text-sm text-text-2 bg-transparent border border-text-2 hover:bg-transparent">
              Flag
            </Button>
            <Button type="button" className="w-full px-4 py-1.5 rounded-full text-sm text-white bg-text-7 border border-text-7 hover:bg-text-7">
              Cancel
            </Button>
          </div>
          <div className='flex items-center gap-x-2'>
            <Button type="button" className="w-full px-4 py-1.5 rounded-full text-sm text-text-2 bg-transparent border border-text-2 hover:bg-transparent">
              Export CSV
              <ExportIcon className="size-5 min-w-5 stroke-text-2" />
            </Button>
            <Button type="button" className="w-full px-4 py-1.5 rounded-full text-sm text-text-2 bg-transparent border border-text-2 hover:bg-transparent">
              Export PDF
              <ExportIcon className="size-5 min-w-5 stroke-text-2" />
            </Button>
          </div>
        </div>
        <DataTable data={jobPostData} columns={columns} totalItems={jobPostData.length} enableRowSelection={true} />
      </div>
      <JobPostDetails state={jobPostDetail} />
    </>
  )
}
