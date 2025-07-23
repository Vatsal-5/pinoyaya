import { UserCheckIcon } from "@/assets/icons/dashboard";
import { DeleteIcon, EditIcon } from "@/assets/icons/notification-management";
import { ClockIcon, EmailIcon } from "@/assets/icons/user-management";
import DataTable from "@/components/common/datatable";
import DateFilter from "@/components/common/filters/date";
import Select from "@/components/common/inputs/select";
import AddUpdateNotification from "@/components/notification-management/add-update-notification";
import NotificationDetails from "@/components/notification-management/details";
import NotificationStatus from "@/components/notification-management/notification-status";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { H3 } from "@/components/ui/Typography";
import { PaginationSchema } from "@/lib/schema";
import { cn, formatNumber } from "@/lib/utils";
import { faker } from "@faker-js/faker";
import { createFileRoute } from "@tanstack/react-router";
import { MinusIcon, PlusIcon, TriangleAlert } from "lucide-react";
import moment from "moment";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useBoolean } from "usehooks-ts";

export const Route = createFileRoute(
  "/_protected/notification-management/notifications"
)({
  component: RouteComponent,
  validateSearch: (search) => PaginationSchema.parse(search),
});

export const notificationTypeOption = [
  // { value: "in-app-aotification", label: "In-App Notification" },
  { value: "push-notification", label: "Push Notification" },
  { value: "email", label: "Email" },
];

export const userTargetOption = [
  { value: "new-users", label: "🆕 New Users" },
  { value: "caregivers", label: "🧍‍♀️ Caregivers" },
  { value: "all-users", label: "👤 All Users" },
  { value: "unverified-caregivers", label: "❌ Unverified Caregivers" },
];

const statusOption = [
  { value: "sent", label: "Sent" },
  { value: "scheduled", label: "Scheduled" },
];

function RouteComponent() {
  const notificationDrawer = useBoolean(false);
  const notificationDetails = useBoolean(false);

  const [updateNotificationData, setUpdateNotificationData] = useState(null);
  const [notificationDetailsData, setNotificationDetailsData] = useState(null);

  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const filterForm = useForm();

  const notificationsCards = [
    {
      name: "Total Notifications Sent",
      value: 134,
      color: "#E1E8FF",
      icon: <EmailIcon className="size-5 stroke-text-2" />,
    },
    {
      name: "Average Daily Reach",
      value: 1340,
      color: "#E1E8FF",
      icon: <UserCheckIcon className="size-5 stroke-text-2" />,
    },
    {
      name: "Scheduled",
      value: 134,
      color: "#FFF7EB",
      icon: <ClockIcon className="size-5 stroke-[1.5px] stroke-text-12" />,
    },
    {
      name: "Failed to Deliver",
      value: 7304,
      color: "#FFE4E8",
      icon: <TriangleAlert className="size-5 stroke-text-7" />,
    },
  ];

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
        target_user: faker.helpers.arrayElement(
          userTargetOption.map((a) => a.label)
        ),
        recipients: formatNumber(
          faker.number.int({ min: 1089, max: 4569 })
        ).replace(",", " "),
        delivered: formatNumber(
          faker.number.int({ min: 1089, max: 4569 })
        ).replace(",", " "),
        failed: formatNumber(faker.number.int({ min: 0, max: 51 })).replace(
          ",",
          " "
        ),
        status: faker.helpers.arrayElement([0, 1]),
      })),
    []
  );

  const columns = useMemo(
    () => [
      {
        id: "title-align-start",
        accessorKey: "title",
        header: () => "Title",
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
      },
      {
        accessorKey: "target_user",
        header: () => "Target Users",
      },
      {
        accessorKey: "recipients",
        header: () => "Recipients",
      },
      {
        accessorKey: "delivered",
        header: () => "Delivered",
      },
      {
        accessorKey: "failed",
        header: () => "Failed",
      },
      {
        accessorKey: "status",
        header: () => "Status",
        cell: ({ row }) => <NotificationStatus status={row.original.status} />,
      },
      {
        id: "action",
        cell: ({ row }) => {
          return (
            <div className="flex items-center justify-end gap-x-2">
              {row.original.status === 0 ? (
                <>
                  <Button
                    type="button"
                    className="px-4 py-2 rounded-full text-sm bg-transparent text-text-2 border border-text-2 hover:bg-transparent"
                    onClick={() => {
                      notificationDrawer.setTrue();
                      navigate({ search: { ...search, step: 1 } });
                      setUpdateNotificationData({
                        step1: {
                          title: "Verify account",
                          message: "<p>You need to verify your account</p>",
                          audience_selection: ["all_user"],
                          status: "",
                        },
                        step2: {
                          delivery_type: "push-notification",
                          delivery_time: "send-now",
                          date: "",
                          time: "00:00:AM",
                        },
                        step3: null,
                      });
                    }}
                  >
                    <EditIcon className="size-5 min-w-5 stroke-text-2" />
                    Edit
                  </Button>
                  <Button
                    type="button"
                    className="px-4 py-2 rounded-full text-sm bg-transparent text-text-2 border border-text-2 hover:bg-transparent"
                  >
                    Unschedule
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="button"
                    className="px-4 py-2 rounded-full text-sm bg-transparent text-text-2 border border-text-2 hover:bg-transparent"
                  >
                    Duplicate
                  </Button>
                  <Button
                    type="button"
                    className="px-4 py-2 rounded-full text-sm bg-transparent text-text-2 border border-text-2 hover:bg-transparent"
                    onClick={() => {
                      setNotificationDetailsData(row.original);
                      notificationDetails.setTrue();
                    }}
                  >
                    Preview
                  </Button>
                  <Button
                    type="button"
                    className="px-4 py-2 rounded-full text-sm bg-transparent text-text-2 border border-text-2 hover:bg-transparent"
                  >
                    <DeleteIcon className="size-5 min-w-5 stroke-text-2" />
                    Delete
                  </Button>
                </>
              )}
            </div>
          );
        },
      },
    ],
    []
  );

  const onSubmit = (e) => {
    console.log(e);
  };
  return (
    <>
      <div className="w-full pt-4 pb-2">
        <div className="grid grid-cols-4 gap-4">
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
        </div>
        <div className="w-full my-8 flex gap-x-6">
          <Button
            type="button"
            className="w-full max-w-[92px] py-2.5 text-sm rounded-xl"
            onClick={() => {
              notificationDrawer.setTrue();
              navigate({ search: { ...search, step: 1 } });
            }}
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
              <Select
                name="notification_type"
                placeholder="Notification Type"
                options={notificationTypeOption}
                className="w-full py-[9px]"
                containerClassName="w-full"
              />
              <Select
                name="user_target"
                placeholder="User Target"
                options={userTargetOption}
                className="w-full py-[9px]"
                containerClassName="w-full"
              />
              <Select
                name="status"
                placeholder="Status"
                options={statusOption}
                className="w-full py-[9px]"
                containerClassName="w-full"
              />
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

      <AddUpdateNotification
        state={notificationDrawer}
        data={updateNotificationData}
        setData={setUpdateNotificationData}
      />
      <NotificationDetails
        state={notificationDetails}
        data={notificationDetailsData}
        setData={setNotificationDetailsData}
      />
    </>
  );
}
