import DayFilter from "@/components/common/filters/day";
import Select from "@/components/common/inputs/select";
import { adminRoleOptions } from "@/components/settings/add-update-admin";
import { Form } from "@/components/ui/form";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { adminStatusOption } from "./admin-roles";
import DateFilter from "@/components/common/filters/date";
import { MinusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMemo } from "react";
import { faker } from "@faker-js/faker";
import UserAvtar from "@/components/common/user-avtar";
import RoleStatus from "@/components/settings/role-status";
import moment from "moment";
import AdminStatus from "@/components/settings/admin-status";
import DataTable from "@/components/common/datatable";
import Pagination from "@/components/common/datatable/pagination";


export const Route = createFileRoute("/_protected/settings/admin-activity")({
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate();

  const filterForm = useForm();

  const onSubmit = (e) => {
    console.log(e);
  };

  const tabs = [
    { label: "Activity", value: "activity" },
    { label: "Login History", value: "login-history" },
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
    [search?.tab]
  );

  const notesData = useMemo(() =>
    Array.from({ length: faker.number.int({ min: 10, max: 80 }) }).map(() => {
      return {
        id: faker.database.mongodbObjectId(),
        fname: faker.person.firstName(),
        lname: faker.person.lastName(),
        createdAt: faker.date.recent({ days: 30 }),
        message: faker.lorem.sentences(faker.number.int({ min: 1, max: 3 }))
      };
    }), []);

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
      cell: ({ row }) => <RoleStatus status={row.original.admin_role} className="justify-start" />,
    },
    {
      id: "last_login-align-start",
      accessorKey: "last_login",
      header: () => "Login Date / Time",
      cell: ({ row }) => (
        <p className="text-start">
          {moment(row.original.last_login).format("DD MMM YYYY HH:mmA")}
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
  ];
  return (
    <>
      <div className="w-full pt-4 pb-2">
        <Form {...filterForm}>
          <form
            noValidate
            onSubmit={filterForm.handleSubmit(onSubmit)}
            className="flex justify-between gap-x-4"
          >
            <div className="w-full flex gap-x-2">
              <DayFilter
                name="day"
                className="w-full py-[9px]"
                placeholder="Select Day"
                containerClassName="w-full"
              />
              <Select
                name="role"
                placeholder="Role"
                options={adminRoleOptions}
                className="w-full py-[9px]"
                containerClassName="w-full"
              />
              <Select
                name="status"
                placeholder="Status"
                options={adminStatusOption}
                className="w-full py-[9px]"
                containerClassName="w-full"
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
        <Tabs
          className="h-full gap-y-4 overflow-hidden"
          defaultValue={tabs.at(0).value}
          onValueChange={(tab) => navigate({ search: { ...search, page: 1, limit: 10, tab } })}
        >
          <TabsList className="py-0 mt-6 bg-transparent gap-x-7">
            {tabs.map((data, index) => {
              return (
                <TabsTrigger
                  key={index}
                  value={data.value}
                  className="p-0 bg-transparent text-text-1 opacity-40 cursor-pointer data-[state=active]:bg-transparent data-[state=active]:opacity-100 data-[state=active]:shadow-none transition-opacity"
                >
                  {data.label}
                </TabsTrigger>
              );
            })}
          </TabsList>
          {tabs.map((data, index) => {
            return (
              <TabsContent key={index} value={data.value}>
                {tabs.at(0).value === data.value
                  ? <div className='flex flex-col gap-y-4'>
                    {notesData.slice((search?.page - 1) * search?.limit, search?.page * search?.limit).map((data) => {
                      return (
                        <div key={data.id} className='p-4 bg-white rounded-xl'>
                          <div className='flex items-center gap-x-2'>
                            <div className="bg-text-5 size-5 rounded-full flex items-center justify-center">
                              <span className="text-[10px] text-text-1">{data.fname.at(0)}{data.lname.at(0)}</span>
                            </div>
                            <p className='text-sm text-text-1 font-medium'>{data.fname} {data.lname}</p>
                          </div>
                          <p className="my-3 text-text-2 text-sm font-medium">{moment(data.createdAt).format("DD MMM YYYY H:mmA")}</p>
                          <p className="text-text-1 text-xs">{data.message}</p>
                        </div>
                      )
                    })}
                    <Pagination totalRecords={notesData.length} />
                  </div>
                  : <DataTable
                    data={adminData}
                    columns={columns}
                    totalItems={adminData.length}
                  />}

              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </>
  );
}
