import { DeleteIcon, EditIcon } from "@/assets/icons/notification-management";
import DataTable from "@/components/common/datatable";
import DateFilter from "@/components/common/filters/date";
import Select from "@/components/common/inputs/select";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { faker } from "@faker-js/faker";
import { createFileRoute } from "@tanstack/react-router";
import { MinusIcon, PlusIcon } from "lucide-react";
import moment from "moment";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { notificationTypeOption, userTargetOption } from "./notifications";
import { PaginationSchema } from "@/lib/schema";

export const Route = createFileRoute(
  "/_protected/notification-management/templates"
)({
  component: RouteComponent,
  validateSearch: (search) => PaginationSchema.parse(search),
});

function RouteComponent() {
  const filterForm = useForm();

  const onSubmit = (e) => {
    console.log(e);
  };

  const notificationData = useMemo(
    () =>
      new Array(69).fill().map(() => ({
        id: faker.database.mongodbObjectId(),
        title: faker.helpers.arrayElement([
          "Verify Your ID",
          "New Feature Alert",
        ]),
        // type: faker.helpers.arrayElement(["In-App", "Push"]),
        type: faker.helpers.arrayElement(["Email", "Push"]),
        createdAt: faker.date.recent({ days: 30 }),
        target_user: faker.helpers.arrayElement(["🆕 New Users", "👤 All Users"]),
        status: faker.helpers.arrayElement([0, 1]),
      })),
    []
  );

  const columns = useMemo(
    () => [
      {
        id: "title-align-start",
        accessorKey: "title",
        header: () => "Template Title",
        cell: ({ row }) => <p className="text-start">{row.original.title}</p>,
      },
      {
        accessorKey: "type",
        header: () => "Type",
        cell: ({ row }) => (
          <p
            className={cn(row.original.status ? "text-text-2" : "text-text-7")}
          >
            {row.original.type}
          </p>
        ),
        size: 300
      },
      {
        id: "createdAt-align-start",
        accessorKey: "createdAt",
        header: () => "Date",
        cell: ({ row }) => (
          <p className="text-start">
            {moment(row.original.createdAt).format("DD MMM YYYY")}
          </p>
        ),
        size: 200
      },
      {
        accessorKey: "target_user",
        header: () => "Target Users",
      },
      {
        id: "action",
        cell: () => {
          return (
            <div className="flex items-center justify-end gap-x-2">
              <Button
                type="button"
                className="px-4 py-2 rounded-full text-sm bg-transparent text-text-2 border border-text-2 hover:bg-transparent"
              >
                <EditIcon className="size-5 min-w-5 stroke-text-2" />
                Edit
              </Button>
              <Button
                type="button"
                className="px-4 py-2 rounded-full text-sm bg-transparent text-text-2 border border-text-2 hover:bg-transparent"
              >
                <DeleteIcon className="size-5 min-w-5 stroke-text-2" />
                Delete
              </Button>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <div className="w-full pt-4 pb-2 space-y-5">
        <div className="w-full flex gap-x-6">
          <Button
            type="button"
            className="w-full max-w-[92px] py-2.5 text-sm rounded-xl"
          >
            <PlusIcon className="size-5" />
            Add
          </Button>
          <Form {...filterForm}>
            <form
              noValidate
              onSubmit={filterForm.handleSubmit(onSubmit)}
              className="w-full flex justify-between gap-x-2"
            >
              <div className="w-full flex gap-x-2">
                <Select
                  name="notification_type"
                  placeholder="Notification Type"
                  options={notificationTypeOption}
                  className="w-full py-[9px]"
                  containerClassName="w-full max-w-[280px]"
                />
                <Select
                  name="user_target"
                  placeholder="User Target"
                  options={userTargetOption}
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
          data={notificationData}
          columns={columns}
          totalItems={notificationData.length}
        />
      </div>
    </>
  );
}
