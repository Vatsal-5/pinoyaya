import DataTable from "@/components/common/datatable";
import DateFilter from "@/components/common/filters/date";
import Limit from "@/components/common/filters/limit";
import Select from "@/components/common/inputs/select";
import UserAvtar from "@/components/common/user-avtar";
import DisputeDetails from "@/components/dispute-resolution/details";
import { DisputeInfo } from "@/components/dispute-resolution/info";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import DisputeStatus from "@/components/user-management/dispute-status";
import { ROLES } from "@/constants/common";
import { PaginationSchema } from "@/lib/schema";
import { faker } from "@faker-js/faker";
import { createFileRoute } from "@tanstack/react-router";
import { MinusIcon } from "lucide-react";
import moment from "moment";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useBoolean } from "usehooks-ts";

export const Route = createFileRoute("/_protected/dispute-resolution")({
  component: RouteComponent,
  validateSearch: (search) => PaginationSchema.parse(search),
});

export const issueTypeOption = [
  { value: "job-not-completed", label: "Job not completed" },
  { value: "no-show", label: "No show" },
  { value: "rude-behavior", label: "Rude behavior" },
  { value: "app-error", label: "App error" },
];

const statusOption = [
  { value: "pending", label: "Pending" },
  { value: "resolved", label: "Resolved" },
];

function RouteComponent() {
  const { limit } = Route.useSearch();

  const [selectedDisputeDetails, setSelectedDisputeDetails] = useState();
  const disputeDetail = useBoolean(false);

  const [selectedDisputeInfo, setSelectedDisputeInfo] = useState();
  const disputeInfo = useBoolean(false);

  const filterForm = useForm({
    defaultValues: { limit },
  });

  const disputeData = useMemo(() => {
    const self = faker.database.mongodbObjectId();
    const messages = Array.from({
      length: faker.number.int({ min: 11, max: 69 }),
    }).map(() => {
      const sender = faker.database.mongodbObjectId();
      return {
        id: faker.helpers.arrayElement([self, sender]),
        message: faker.lorem.sentence(),
        message_time: faker.date.recent({ days: 3 }),
      };
    });
    return new Array(69).fill().map(() => ({
      id: self,
      user_img: faker.image.avatar(),
      fname: faker.person.firstName(),
      lname: faker.person.lastName(),
      receipt_number: `№${faker.number.int({ min: 1000000, max: 9999999 })}`,
      date: faker.date.recent({ days: 30 }),
      issue_type: faker.helpers.arrayElement(
        issueTypeOption.map((option) => option.label)
      ),
      status: faker.helpers.arrayElement([0, 1]),
      isactive: faker.datatype.boolean(),
      isVerified: faker.datatype.boolean(),
      role: faker.helpers.arrayElement(ROLES),
      showRoleIcon: faker.datatype.boolean(),
      messages: faker.helpers.arrayElement([messages, []]),
      job_title: "Babysitter Needed",
      start_date: faker.date.soon({ days: 10 }),
      job_status: faker.helpers.arrayElement([0, 1, 2, 3]),
      rate: "₱" + faker.number.int({ min: 100, max: 200 }) + "/hr",
    }));
  }, []);

  const columns = [
    {
      id: "receipt_number-align-start",
      accessorKey: "receipt_number",
      header: () => "Ticket ID",
      cell: ({ row }) => (
        <p className="text-start">{row.original.receipt_number}</p>
      ),
    },
    {
      id: "date-align-start",
      accessorKey: "date",
      header: () => "Date",
      cell: ({ row }) => (
        <p className="text-start">
          {moment(row.original.date).format("DD MMM YYYY")}
        </p>
      ),
    },
    {
      id: "user_img-align-start",
      accessorKey: "user_img",
      header: () => "User Name",
      cell: ({ row }) => (
        <UserAvtar
          img={row.original.user_img}
          fullname={`${row.original.fname} ${row.original.lname}`}
        />
      ),
    },
    {
      accessorKey: "issue_type",
      header: () => "Issue Type",
    },
    {
      accessorKey: "status",
      header: () => "Status",
      cell: ({ row }) => <DisputeStatus status={row.original.status} />,
    },
    {
      id: "action",
      cell: ({ row }) => {
        return (
          <div className="flex justify-end gap-x-2">
            <Button
              type="button"
              className="w-full max-w-[120px] px-4 py-0 rounded-2xl text-sm bg-transparent text-text-2 border border-text-2 hover:bg-transparent"
              onClick={() => {
                disputeDetail.setTrue();
                setSelectedDisputeDetails(row.original);
              }}
            >
              Chat
              {row.original.messages.length ? (
                <p className="size-7 flex justify-center items-center text-text-1 text-xs bg-text-24 rounded-full">
                  +{row.original.messages.length}
                </p>
              ) : null}
            </Button>
            <Button
              type="button"
              className="px-4 py-2 rounded-2xl text-sm bg-transparent text-text-2 border border-text-2 hover:bg-transparent"
              onClick={() => {
                disputeInfo.setTrue();
                setSelectedDisputeInfo(row.original);
              }}
            >
              Details
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
      <div className="w-full pt-4 pb-2 space-y-5">
        <Form {...filterForm}>
          <form
            noValidate
            onSubmit={filterForm.handleSubmit(onSubmit)}
            className="w-full flex gap-x-6"
          >
            <div className="w-full grid grid-cols-4 gap-x-2">
              <Limit
                name="limit"
                placeholder="Select limit"
                className="w-full py-[9px]"
              />
              <Select
                name="user_type"
                placeholder="User Type"
                options={ROLES.map((role) => ({ value: role, label: role }))}
                className="w-full py-[9px]"
              />
              <Select
                name="issue_type"
                placeholder="Issue Type"
                options={issueTypeOption}
                className="w-full py-[9px]"
              />
              <Select
                name="status"
                placeholder="Status"
                options={statusOption}
                className="w-full py-[9px]"
              />
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
        <DataTable
          data={disputeData}
          columns={columns}
          totalItems={disputeData.length}
        />
      </div>
      <DisputeDetails
        state={disputeDetail}
        data={selectedDisputeDetails}
        onClose={() => setSelectedDisputeDetails(null)}
      />
      <DisputeInfo
        state={disputeInfo}
        data={selectedDisputeInfo}
        onClose={() => setSelectedDisputeInfo(null)}
      />
    </>
  );
}
