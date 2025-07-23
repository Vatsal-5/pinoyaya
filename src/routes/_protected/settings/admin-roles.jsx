import { UserIcon } from "@/assets/icons/common";
import DataTable from "@/components/common/datatable";
import DateFilter from "@/components/common/filters/date";
import Select from "@/components/common/inputs/select";
import UserAvtar from "@/components/common/user-avtar";
import AddUpdateAdmin from "@/components/settings/add-update-admin";
import AdminStatus from "@/components/settings/admin-status";
import RoleStatus from "@/components/settings/role-status";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { H3 } from "@/components/ui/Typography";
import { ROLES } from "@/constants/common";
import { PaginationSchema } from "@/lib/schema";
import { formatNumber } from "@/lib/utils";
import { faker } from "@faker-js/faker";
import { createFileRoute } from "@tanstack/react-router";
import { CircleCheck, MinusIcon, PlusIcon } from "lucide-react";
import moment from "moment";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useBoolean } from "usehooks-ts";

export const Route = createFileRoute("/_protected/settings/admin-roles")({
  component: RouteComponent,
  validateSearch: (search) => PaginationSchema.parse(search),
});

export const adminStatusOption = [
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "deactivated", label: "Deactivated" },
];

function RouteComponent() {
  const [updateAdminData, setUpdateAdminData] = useState(null);

  const addUpdateAdmin = useBoolean(false);

  const notificationsCards = [
    {
      name: "Super Admin",
      value: 1,
      color: "#E56A7C",
      icon: <UserIcon className="size-5 stroke-[1.5px] stroke-white" />,
    },
    {
      name: "Support Managers",
      value: 5,
      color: "#7486C3",
      icon: <UserIcon className="size-5 stroke-[1.5px] stroke-white" />,
    },
  ];

  const adminData = useMemo(
    () =>
      new Array(69).fill().map(() => ({
        id: faker.database.mongodbObjectId(),
        user_img: faker.image.avatar(),
        fname: faker.person.firstName(),
        lname: faker.person.lastName(),
        email: faker.internet.email(),
        admin_role: faker.helpers.arrayElement([0, 1]),
        last_login: faker.date.recent({ days: 10 }),
        access_level: faker.helpers.arrayElement([
          "Full access",
          "Custom Access",
        ]),
        status: faker.helpers.arrayElement([0, 1, 2]),
      })),
    []
  );

  const filterForm = useForm();

  const columns = [
    {
      id: "user_img-align-start",
      accessorKey: "user_img",
      header: () => "User Name",
      cell: ({ row }) => (
        <UserAvtar
          img={row.original.user_img}
          fullname={`${row.original.fname} ${row.original.lname}`}
          isactive={row.original.isactive}
          isReported={row.original.isReported}
          isVerified={row.original.isVerified}
          showRoleIcon={row.original.showRoleIcon}
        />
      ),
    },
    {
      accessorKey: "email",
      header: () => "Email",
    },
    {
      id: "role-align-start",
      accessorKey: "role",
      header: () => "Role",
      cell: ({ row }) => (
        <RoleStatus
          status={row.original.admin_role}
          className="justify-start"
        />
      ),
    },
    {
      id: "last_login-align-start",
      accessorKey: "last_login",
      header: () => "Last Login",
      cell: ({ row }) => (
        <p className="text-start">
          {moment(row.original.last_login).format("DD MMM YYYY")}
        </p>
      ),
    },
    {
      accessorKey: "access_level",
      header: () => "Access Level",
    },
    {
      accessorKey: "status",
      header: () => "Status",
      cell: ({ row }) => <AdminStatus status={row.original.status} />,
    },
    {
      id: "action",
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-end gap-x-2">
            <Button
              type="button"
              className="px-4 py-2 rounded-full text-sm bg-transparent text-text-2 border border-text-2 hover:bg-transparent"
              onClick={() => {
                setUpdateAdminData({
                  full_name: "Jon Doe",
                  email: "jon@gmail.com",
                  role: "support-manager",
                  permissions: [
                    "View & manage job posts",
                    "Manage disputes & chat with both sides",
                  ],
                });
                addUpdateAdmin.setTrue();
              }}
            >
              Edit
            </Button>
            <Button
              type="button"
              className="w-full max-w-[126px] px-4 py-2 rounded-full text-sm bg-transparent text-text-2 border border-text-2 hover:bg-transparent"
            >
              {row.original.status === 0 && "Deactivated"}
              {row.original.status === 1 && "Pending"}
              {row.original.status === 2 && "Resend Invite"}
            </Button>
          </div>
        );
      },
    },
  ];

  const onSubmit = (e) => {
    console.log(e);
  };
  return (
    <>
      <div className="w-full pt-4 pb-2">
        <div className="grid grid-cols-3 gap-4">
          {notificationsCards.map((data, index) => {
            return (
              <div key={index} className="p-3 bg-white rounded-xl">
                <div
                  style={{ backgroundColor: data.color }}
                  className="w-max p-2.5 rounded-full"
                >
                  {data.icon}
                </div>
                <p className="mt-2 mb-1 font-medium text-sm text-text-1 opacity-60">
                  {data.name}
                </p>
                <H3
                  text={
                    isNaN(data.value)
                      ? data.value
                      : formatNumber(data.value).replace(",", " ")
                  }
                  className="font-bold"
                />
              </div>
            );
          })}
          <div className="p-3 bg-white rounded-xl">
            <div className="w-max p-2.5 rounded-full bg-text-22">
              <CircleCheck className="size-5 stroke-text-20" />
            </div>
            <p className="mt-2 mb-3 font-medium text-sm text-text-1 opacity-60">
              Last Activity
            </p>
            <p className="text-sm text-text-1 font-semibold">
              <span className="text-text-7">Linda Davis</span>
              &nbsp; last logged in 3h ago
            </p>
          </div>
        </div>
        <div className="w-full my-8 flex gap-x-6">
          <Button
            type="button"
            className="w-full max-w-[92px] py-2.5 text-sm rounded-xl"
            onClick={() => addUpdateAdmin.setTrue()}
          >
            <PlusIcon className="size-5" />
            Add
          </Button>
          <Form {...filterForm}>
            <form
              noValidate
              onSubmit={filterForm.handleSubmit(onSubmit)}
              className="w-full flex gap-x-2"
            >
              <div className="w-full flex gap-x-2">
                <Select
                  name="role"
                  placeholder="Role"
                  options={ROLES.map((e) => ({
                    value: e.toLowerCase(),
                    label: e,
                  }))}
                  className="w-full py-[9px]"
                  containerClassName="w-full max-w-[280px]"
                />
                <Select
                  name="status"
                  placeholder="Status"
                  options={adminStatusOption}
                  className="w-full py-[9px]"
                  containerClassName="w-full max-w-[280px]"
                />
              </div>
              <div className="flex gap-x-2">
                <div className="w-full flex justify-end items-center gap-x-1">
                  <DateFilter
                    name="start_date"
                    containerClassName="w-full min-w-[142px]"
                    placeholder="Start Date"
                  />
                  <MinusIcon className="size-2 min-w-2 text-text-1 rounded-lg" />
                  <DateFilter
                    name="end_date"
                    containerClassName="w-full min-w-[142px]"
                    placeholder="End Date"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full min-w-[76px] ml-1 py-2.5 text-sm rounded-xl"
                >
                  Search
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <DataTable
          data={adminData}
          columns={columns}
          totalItems={adminData.length}
        />
      </div>
      <AddUpdateAdmin
        state={addUpdateAdmin}
        data={updateAdminData}
        setUpdateAdminData={setUpdateAdminData}
        onClose={() => {
          addUpdateAdmin.setFalse();
          setUpdateAdminData(null);
        }}
      />
    </>
  );
}
