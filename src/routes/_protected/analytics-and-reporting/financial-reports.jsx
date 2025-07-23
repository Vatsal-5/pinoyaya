import { MessageIcon } from "@/assets/icons/analytics-reporting";
import { UserIcon } from "@/assets/icons/common";
import { ExportIcon } from "@/assets/icons/job-post-management";
import { WalletMoneyIcon } from "@/assets/icons/payment-management";
import AreaChart from "@/components/common/charts/area";
import PieChart from "@/components/common/charts/pie";
import DataTable from "@/components/common/datatable";
import DateFilter from "@/components/common/filters/date";
import DayFilter from "@/components/common/filters/day";
import Select from "@/components/common/inputs/select";
import UserAvtar from "@/components/common/user-avtar";
import FinancialStatus from "@/components/financial-report/financial-status";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { H3 } from "@/components/ui/Typography";
import { ROLES } from "@/constants/common";
import { formatNumber, kFormatter } from "@/lib/utils";
import { faker } from "@faker-js/faker";
import { createFileRoute } from "@tanstack/react-router";
import { MinusIcon } from "lucide-react";
import moment from "moment";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  paymentPlatformOption,
  paymentTypeOption,
} from "../payment-management";

export const Route = createFileRoute(
  "/_protected/analytics-and-reporting/financial-reports"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch({ strict: false });
  const navigate = Route.useNavigate();

  const filterForm = useForm({
    defaultValues: { day: "Today" },
  });

  const onSubmit = (e) => {
    console.log(e);
  };

  const financialReportCards = [
    {
      name: "Total Revenue ",
      value: 243000,
      color: "#E1E8FF",
      icon: <WalletMoneyIcon className="size-5 stroke-text-2" />,
      prefix: "₱",
    },
    {
      name: "Subscription Revenue",
      value: 173000,
      color: "#FFF7EB",
      icon: <WalletMoneyIcon className="size-5 stroke-text-12" />,
      prefix: "₱",
    },
    {
      name: "Chat Credits Revenue",
      value: 40000,
      color: "#E1E8FF",
      icon: <MessageIcon className="size-5 stroke-text-2" />,
      prefix: "₱",
    },
    {
      name: "Boost Purchases",
      value: 30000,
      color: "#E1E8FF",
      icon: "🔥",
      prefix: "₱",
    },
    {
      name: "No. of Paid Users",
      value: 1087,
      color: "#E1E8FF",
      icon: <UserIcon className="size-5 stroke-[2.5px] stroke-text-2" />,
    },
    {
      name: "Avg. Revenue per User",
      value: 223.49,
      color: "#FFE4E8",
      icon: <WalletMoneyIcon className="size-5 stroke-text-7" />,
      prefix: "₱",
    },
  ];

  const revenueTabs = [
    { label: "Payment Type", value: "payment-type" },
    { label: "Platform", value: "platform" },
    { label: "Subscription Plan Split", value: "subscription-plan-split" },
  ];

  const revenue2Tabs = [
    { label: "Total", value: "total" },
    { label: "Subscriptions", value: "subscriptions" },
    { label: "Credits", value: "credits" },
    { label: "Boosts", value: "boosts" },
  ];

  const revenueData = useMemo(
    () => [
      { key: "Subscription", value: faker.number.int({ min: 499, max: 8000 }) },
      { key: "Credit", value: faker.number.int({ min: 499, max: 8000 }) },
      { key: "Boost", value: faker.number.int({ min: 499, max: 8000 }) },
    ],
    [search["revenue-by-tab"]]
  );

  const totalRevenueData = useMemo(
    () =>
      Array.from({ length: 7 }).map(() => {
        return {
          date: faker.date
            .between({ from: "2025-08-01", to: "2025-08-31" })
            .toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
          revenue: faker.number.int({ min: 100, max: 2000 }),
        };
      }),
    [search["revenue-tab"]]
  );

  const userData = useMemo(
    () =>
      new Array(69).fill().map(() => ({
        id: faker.database.mongodbObjectId(),
        user_img: faker.image.avatar(),
        fname: faker.person.firstName(),
        lname: faker.person.lastName(),
        isactive: faker.datatype.boolean(),
        email: faker.internet.email().toLowerCase(),
        plan_type: faker.helpers.arrayElement([
          "Premium",
          "Gold",
          "Silver",
          "Bronze",
        ]),
        payment_type: faker.helpers.arrayElement([
          "Subscription",
          "Credit",
          "Boost",
        ]),
        platform: faker.helpers.arrayElement(
          paymentPlatformOption.map((d) => d.value)
        ),
        registration_date: faker.date.past(),
        amount: faker.number.int({ min: 99, max: 999 }),
        status: faker.helpers.arrayElement([0, 1, 2]),
      })),
    []
  );

  const columns = useMemo(
    () => [
      {
        id: "user_img-align-start",
        accessorKey: "user_img",
        header: () => "User Name",
        cell: ({ row }) => (
          <UserAvtar
            img={row.original.user_img}
            fullname={`${row.original.fname} ${row.original.lname}`}
            isactive={row.original.isactive}
          />
        ),
      },
      {
        accessorKey: "email",
        header: () => "Email",
      },
      {
        accessorKey: "plan_type",
        header: () => "Plan Type",
      },
      {
        accessorKey: "payment_type",
        header: () => "Payment Type",
      },
      {
        accessorKey: "platform",
        header: "Platform",
        cell: ({ row }) => (
          <p className="capitalize">{row.original.platform}</p>
        ),
      },
      {
        accessorKey: "registration_date",
        header: () => "Date",
        cell: ({ row }) =>
          moment(row.original.registration_date).format("DD MMM YYYY"),
      },
      {
        accessorKey: "amount",
        header: () => "Amount",
        cell: ({ row }) => <p>₱{row.original.amount}</p>,
      },
      {
        accessorKey: "status",
        header: () => "Status",
        cell: ({ row }) => (
          <div className="py-2">
            <FinancialStatus status={row.original.status} />
          </div>
        ),
      },
    ],
    []
  );

  return (
    <>
      <div className="w-full pt-4 pb-2">
        <Form {...filterForm}>
          <form
            noValidate
            onSubmit={filterForm.handleSubmit(onSubmit)}
            className="flex justify-between gap-x-4"
          >
            <div className="w-full grid grid-cols-4 gap-x-2">
              <DayFilter
                name="day"
                className="w-full"
                placeholder="Select Day"
              />
              <Select
                name="user_type"
                placeholder="User Type"
                options={ROLES.map((role) => ({ value: role, label: role }))}
                className="w-full py-[9px]"
              />
              <Select
                name="payment_type"
                placeholder="Payment Type"
                options={paymentTypeOption}
                className="w-full py-[9px]"
              />
              <Select
                name="payment_platform"
                placeholder="Platform"
                options={paymentPlatformOption}
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
        <div className="my-8 flex flex-col gap-y-5">
          <div className="w-full max-w-[280px] flex items-center gap-x-2">
            <Button
              type="button"
              className="w-full px-4 py-2 rounded-xl text-sm text-text-2 bg-transparent border border-text-2 hover:bg-transparent"
            >
              Export CSV
              <ExportIcon className="size-5 min-w-5 stroke-text-2" />
            </Button>
            <Button
              type="button"
              className="w-full px-4 py-2 rounded-xl text-sm text-text-2 bg-transparent border border-text-2 hover:bg-transparent"
            >
              Export PDF
              <ExportIcon className="size-5 min-w-5 stroke-text-2" />
            </Button>
          </div>
          <div className="grid grid-cols-6 gap-4">
            {financialReportCards.map((data, index) => {
              return (
                <div key={index} className="p-3 bg-white rounded-xl">
                  <div
                    style={{ backgroundColor: data.color }}
                    className="size-10 min-w-10 aspect-square flex items-center justify-center rounded-full"
                  >
                    {data.icon}
                  </div>
                  <p className="mt-2 mb-1 font-medium text-sm text-text-1 opacity-60">
                    {data.name}
                  </p>
                  <H3
                    text={
                      data.prefix
                        ? `${data.prefix}${formatNumber(data.value).replace(",", " ")}`
                        : formatNumber(data.value).replace(",", " ")
                    }
                    className="font-bold"
                  />
                </div>
              );
            })}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <div className="p-3 bg-white rounded-xl">
              <Tabs
                className="h-full gap-y-8 overflow-hidden"
                defaultValue={
                  search["revenue-by-tab"] ?? revenueTabs.at(0).value
                }
                onValueChange={(tab) =>
                  navigate({ search: { ...search, "revenue-by-tab": tab } })
                }
              >
                <TabsList className="w-full h-max p-1.5 bg-text-13 gap-x-7 rounded-sm">
                  {revenueTabs.map((data, index) => {
                    return (
                      <TabsTrigger
                        key={index}
                        value={data.value}
                        className="p-0 bg-transparent text-text-1 font-semibold opacity-40 cursor-pointer data-[state=active]:bg-transparent data-[state=active]:opacity-100 data-[state=active]:shadow-none transition-opacity"
                      >
                        {data.label}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
                {revenueTabs.map((data, index) => {
                  return (
                    <TabsContent
                      key={index}
                      value={data.value}
                      className="h-full flex flex-col overflow-hidden"
                    >
                      <p className="text-xs text-text-1 text-center opacity-60">
                        Revenue by
                      </p>
                      <PieChart
                        className="w-full h-full max-h-[300px] min-h-[300px]"
                        data={revenueData}
                        dataKeys="value"
                        nameKey="key"
                        colors={[
                          "var(--color-text-7)",
                          "var(--color-text-12)",
                          "var(--color-text-2)",
                        ]}
                      />
                    </TabsContent>
                  );
                })}
              </Tabs>
            </div>
            <div className="p-3 bg-white rounded-xl">
              <Tabs
                className="h-full gap-y-3.5 overflow-hidden"
                defaultValue={search["revenue-tab"] ?? revenue2Tabs.at(0).value}
                onValueChange={(tab) =>
                  navigate({ search: { ...search, "revenue-tab": tab } })
                }
              >
                <TabsList className="w-full h-max p-1.5 bg-text-13 gap-x-7 rounded-sm">
                  {revenue2Tabs.map((data, index) => {
                    return (
                      <TabsTrigger
                        key={index}
                        value={data.value}
                        className="p-0 bg-transparent text-text-1 font-semibold opacity-40 cursor-pointer data-[state=active]:bg-transparent data-[state=active]:opacity-100 data-[state=active]:shadow-none transition-opacity"
                      >
                        {data.label}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
                {revenue2Tabs.map((data, index) => {
                  return (
                    <TabsContent
                      key={index}
                      value={data.value}
                      className="h-full flex flex-col gap-y-3.5 overflow-hidden"
                    >
                      <div className="flex items-start justify-between gap-x-2">
                        <div className="flex flex-col gap-y-1">
                          <p className="text-xs text-text-1 opacity-60">
                            Revenue
                          </p>
                          <H3
                            text={`₱ ${formatNumber(243000).replace(",", " ")}`}
                            className="font-bold"
                          />
                        </div>
                      </div>
                      <AreaChart
                        className="w-full h-full min-h-[250px] max-h-[250px]"
                        data={totalRevenueData}
                        YAxisFormatter={kFormatter}
                        dataKeys={["revenue"]}
                      />
                    </TabsContent>
                  );
                })}
              </Tabs>
            </div>
          </div>
        </div>
        <DataTable
          data={userData}
          columns={columns}
          totalItems={userData.length}
          pagination={false}
        />
      </div>
    </>
  );
}
