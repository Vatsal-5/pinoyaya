import DataTable from '@/components/common/datatable';
import DateFilter from '@/components/common/filters/date';
import Limit from '@/components/common/filters/limit';
import Select from '@/components/common/inputs/select';
import UserAvtar from '@/components/common/user-avtar';
import UserStatus from '@/components/user-management/user-status';
import UserType from '@/components/user-management/user-type';
import VerificationStatus from '@/components/user-management/verification-status';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import BanuserModal from '@/components/user-management/banuserModal';
import UserDetails from '@/components/user-management/user-details';
import { ROLES } from '@/constants/common';
import { PaginationSchema } from '@/lib/schema';
import { faker } from '@faker-js/faker';
import { createFileRoute } from '@tanstack/react-router';
import { MinusIcon } from 'lucide-react';
import moment from 'moment';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'usehooks-ts';

export const Route = createFileRoute('/_protected/user-management')({
  component: RouteComponent,
  validateSearch: search => PaginationSchema.parse(search),
})

const locationOption = [
  { value: "america", label: "America" },
  { value: "philippines", label: "Philippines" },
  { value: "india", label: "India" },
]

const verificationStatusOption = [
  { value: "pending", label: "Pending" },
  { value: "verified", label: "Verified" },
  { value: "not-verified", label: "Not Verified" },
]

export const accountStatusOption = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" }
]

function RouteComponent() {
  const { page, limit } = Route.useSearch()
  const navigate = Route.useNavigate()

  const userDetail = useBoolean(false)
  const banUser = useBoolean(false)

  const filterForm = useForm({
    defaultValues: { limit }
  });

  const userData = useMemo(
    () =>
      new Array(69).fill().map(() => ({
        id: faker.database.mongodbObjectId(),
        user_img: faker.image.avatar(),
        fname: faker.person.firstName(),
        lname: faker.person.lastName(),
        isactive: faker.datatype.boolean(),
        isReported: faker.datatype.boolean(),
        isVerified: faker.datatype.boolean(),
        showRoleIcon: faker.datatype.boolean(),
        role: faker.helpers.arrayElement(ROLES),
        email: faker.internet.email().toLowerCase(),
        registration_date: faker.date.past(),
        last_activity: faker.date.recent(),
        status: faker.helpers.arrayElement([0, 1, 2]),
        activity_status: 0,
      })),
    []
  )

  const columns = [
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
      id: 'role-align-start',
      accessorKey: 'role',
      header: () => 'User Type',
      cell: ({ row }) => <UserType role={row.original.role} />
    },
    {
      accessorKey: 'email',
      header: () => 'Email',
    },
    {
      accessorKey: 'registration_date',
      header: () => 'Registration Date',
      cell: ({ row }) => moment(row.original.registration_date).format("DD MMM YYYY")
    },
    {
      accessorKey: 'last_activity',
      header: () => 'Last Activity',
      cell: ({ row }) => moment(row.original.last_activity).fromNow()
    },
    {
      accessorKey: 'status',
      header: () => 'Verification Status',
      cell: ({ row }) => <VerificationStatus status={row.original.status} />
    },
    {
      accessorKey: 'activity_status',
      header: () => 'Status',
      cell: ({ row }) => <UserStatus status={row.original.activity_status} />
    },
    {
      id: "action",
      cell: () => {
        return (
          <div className='flex items-center justify-end gap-x-2'>
            <Button type="button" className="px-4 py-2 rounded-xl text-sm bg-transparent text-text-2 border border-text-2 hover:bg-transparent" onClick={banUser.setTrue}>
              Ban
            </Button>
            <Button type="button" className="px-4 py-2 rounded-xl text-sm bg-transparent text-text-2 border border-text-2 hover:bg-transparent" onClick={userDetail.setTrue}>
              View
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
      <div className="w-full pt-4 pb-2 space-y-5 overflow-hidden">
        <Form {...filterForm}>
          <form
            noValidate
            onSubmit={filterForm.handleSubmit(onSubmit)}
            className="flex gap-x-6"
          >
            <div className="w-full grid grid-cols-5 gap-x-2">
              <Limit name="limit" placeholder="Select limit" className="w-full py-[9px]" />
              <Select name="location" placeholder="Location" options={locationOption} className="w-full py-[9px]" />
              <Select name="user_type" placeholder="User Type" options={ROLES.map(e => ({ value: e.toLowerCase(), label: e }))} className="w-full py-[9px]" />
              <Select name="verification_status" placeholder="Verification Status" options={verificationStatusOption} className="w-full py-[9px]" />
              <Select name="account_status" placeholder="Account Status" options={accountStatusOption} className="w-full py-[9px]" />
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
        <DataTable data={userData} columns={columns} totalItems={userData.length} />
      </div>
      <UserDetails state={userDetail} />
      <BanuserModal state={banUser} />
    </>
  )
}
