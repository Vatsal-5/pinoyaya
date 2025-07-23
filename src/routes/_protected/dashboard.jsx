import { ClipboardIcon, ReceiptTicketIcon, SecurityUserIcon, UserCheckIcon } from "@/assets/icons/dashboard";
import { UsersIcon } from "@/assets/icons/sidebar";
import AreaChart from "@/components/common/charts/area";
import DateFilter from "@/components/common/filters/date";
import DayFilter from "@/components/common/filters/day";
import Img from "@/components/common/Img";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { H3 } from "@/components/ui/Typography";
import DisputeStatus from "@/components/user-management/dispute-status";
import UserType from "@/components/user-management/user-type";
import VerificationStatus from '@/components/user-management/verification-status';
import { ROLES } from "@/constants/common";
import { cn, formatNumber, kFormatter } from "@/lib/utils";
import { faker } from '@faker-js/faker';
import { createFileRoute, Link } from "@tanstack/react-router";
import { MinusIcon } from "lucide-react";
import moment from "moment";
import { Fragment } from "react";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/_protected/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const dashboardCards = [
    {
      name: "Pending Verifications",
      value: 90876,
      color: "#FFF7EB",
      icon: <SecurityUserIcon className="size-5 stroke-text-12" />,
    },
    {
      name: "Support Tickets",
      value: 125200,
      color: "#E1E8FF",
      icon: <ReceiptTicketIcon className="size-5 stroke-text-2" />,
    },
    {
      name: "Active Job Posts",
      value: 1200,
      color: "#E1E8FF",
      icon: <ClipboardIcon className="size-5 stroke-text-2" />,
    },
    {
      name: "Total users",
      value: 234034,
      color: "#E1E8FF",
      icon: <UsersIcon className="size-5 stroke-text-2" />,
    },
    {
      name: "Families",
      value: 125200,
      color: "#E56A7C",
      icon: <UserCheckIcon className="size-5 stroke-white" />,
    },
    {
      name: "Caregivers",
      value: 103200,
      color: "#7486C3",
      icon: <UserCheckIcon className="size-5 stroke-white" />,
    },
  ];

  const totalUserData = Array.from({ length: 7 }).map(() => {
    return {
      date: faker.date
        .between({ from: '2025-08-01', to: '2025-08-31' })
        .toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      user: faker.number.int({ min: 100, max: 2000 })
    }
  })

  const totalRevenueData = Array.from({ length: 7 }).map(() => {
    return {
      date: faker.date
        .between({ from: '2025-08-01', to: '2025-08-31' })
        .toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      revenue: faker.number.int({ min: 10000, max: 50000 })
    }
  })

  const userData = Array.from({ length: 14 }).map(() => {
    return {
      name: faker.person.fullName(),
      avatar: faker.image.avatar(),
      role: faker.helpers.arrayElement(ROLES),
      date: faker.date.recent(),
      status: faker.helpers.arrayElement([0, 1]),
    }
  })

  const disputeData = Array.from({ length: 20 }).map(() => {
    return {
      number: "№4568389",
      reason: "Caregiver didn’t show up",
      date: faker.date.recent(),
      status: faker.helpers.arrayElement([0, 1]),
    }
  })

  const filterForm = useForm();

  const onSubmit = (e) => {
    console.log(e);
  };
  return (
    <div className="w-full pt-4 pb-2">
      <Form {...filterForm}>
        <form
          noValidate
          onSubmit={filterForm.handleSubmit(onSubmit)}
          className="flex justify-between gap-x-4"
        >
          <DayFilter
            name="day"
            containerClassName="w-full max-w-[216px]"
            className="w-full"
            placeholder="Select Day"
          />
          <div className="w-full flex gap-x-2">
            <div className="w-full flex justify-end items-center gap-x-1">
              <DateFilter
                name="start_date"
                containerClassName="w-full max-w-[142px]"
                placeholder="Start Date"
              />
              <MinusIcon className="size-2 text-text-1 rounded-lg" />
              <DateFilter
                name="end_date"
                containerClassName="w-full max-w-[142px]"
                placeholder="End Date"
              />
            </div>
            <Button
              type="submit"
              className="w-full max-w-[76px] ml-1 py-2.5 text-sm rounded-xl"
            >
              Search
            </Button>
          </div>
        </form>
      </Form>
      <div className="mt-5 mb-4 grid grid-cols-6 gap-4">
        {dashboardCards.map((data, index) => {
          return (
            <div key={index} className="p-3 bg-white rounded-xl">
              <div
                style={{ backgroundColor: data.color }}
                className="w-max p-2.5 rounded-full"
              >
                {data.icon}
              </div>
              <p className="mt-2 mb-1 font-medium text-sm text-text-1 opacity-60">{data.name}</p>
              <H3 text={formatNumber(data.value).replace(",", " ")} className="font-bold" />
            </div>
          );
        })}
      </div>
      <div className="mt-5 mb-4 grid grid-cols-2 gap-4">
        <div className="p-3 space-y-3.5 bg-white rounded-xl">
          <div className="flex items-start justify-between gap-x-2">
            <div className="flex flex-col gap-y-1">
              <p className="text-xs text-text-1 opacity-60">Total Users</p>
              <H3 text={formatNumber(dashboardCards[3].value).replace(",", " ")} className="font-bold" />
            </div>
            <DayFilter
              containerClassName="w-full max-w-[151px] rounded-sm bg-text-13"
              className="w-full border-none rounded-sm"
              placeholder="Select Day"
              controlled={false}
            />
          </div>
          <AreaChart className="w-full h-full max-h-[340px]" data={totalUserData} YAxisFormatter={kFormatter} />
        </div>
        <div className="p-3 space-y-3.5 bg-white rounded-xl">
          <div className="flex items-start justify-between gap-x-2">
            <div className="flex flex-col gap-y-1">
              <p className="text-xs text-text-1 opacity-60">Total Revenue</p>
              <H3 text={`₱ ${formatNumber(243000).replace(",", " ")}`} className="font-bold" />
            </div>
            <DayFilter
              containerClassName="w-full max-w-[151px] rounded-sm bg-text-13"
              className="w-full border-none rounded-sm"
              placeholder="Select Day"
              controlled={false}
            />
          </div>
          <AreaChart className="w-full h-[340px]" data={totalRevenueData} YAxisFormatter={kFormatter} dataKeys={["revenue"]} />
        </div>
      </div>
      <div className="mt-5 mb-4 grid grid-cols-2 gap-4">
        <div className="p-3 flex flex-col gap-y-3.5 bg-white rounded-xl">
          <div className="flex justify-between">
            <p className="font-medium text-sm text-text-1">New Users</p>
            <Link className="text-text-7 text-sm font-medium">See All</Link>
          </div>
          <ScrollArea type="always" className="h-full max-h-[420px] pr-4" viewPortClassName="!overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-2">
              <tbody>
                {userData.map((data, index) => {
                  return (
                    <Fragment key={index}>
                      <tr className="bg-text-13 text-center [&>td]:px-4">
                        <td className="rounded-l-xl">
                          <Img src={data.avatar} className="min-w-5 min-h-5 size-5 rounded-full" />
                        </td>
                        <td className="text-xs text-text-1 font-medium">{data.name}</td>
                        <td>
                          <UserType role={data.role} />
                        </td>
                        <td className="text-xs text-text-1 font-medium">
                          {moment(data.date).format("DD MMM YYYY")}
                        </td>
                        <td className="text-xs text-text-1 font-medium">
                          <VerificationStatus status={data.status} />
                        </td>
                        <td className="py-2 rounded-r-xl">
                          <Link className={cn(buttonVariants(), "px-4 py-2 rounded-xl text-sm bg-transparent text-text-2 border border-text-2 hover:bg-transparent")}>
                            View
                          </Link>
                        </td>
                      </tr>
                    </Fragment>
                  )
                })}
              </tbody>
            </table>
          </ScrollArea>
        </div>
        <div className="p-3 flex flex-col gap-y-3.5 bg-white rounded-xl">
          <div className="flex justify-between">
            <p className="font-medium text-sm text-text-1">New Disputes</p>
            <Link className="text-text-7 text-sm font-medium">See All</Link>
          </div>
          <ScrollArea type="always" className="h-full max-h-[420px] pr-4">
            <table className="w-full border-separate border-spacing-y-2">
              <tbody>
                {disputeData.map((data, index) => {
                  return (
                    <Fragment key={index}>
                      <tr className="bg-text-13 text-center [&>td]:px-4">
                        <td className="text-xs text-text-1 font-medium rounded-l-xl">{data.number}</td>
                        <td className="text-xs text-text-1 font-medium">
                          {moment(data.date).format("DD MMM YYYY")}
                        </td>
                        <td className="text-xs text-text-1 font-medium">
                          {data.reason}
                        </td>
                        <td className="text-xs text-text-1 font-medium">
                          <DisputeStatus status={data.status} icon={false} />
                        </td>
                        <td className="py-2 rounded-r-xl">
                          <Link className={cn(buttonVariants(), "px-4 py-2 rounded-xl text-sm bg-transparent text-text-2 border border-text-2 hover:bg-transparent")}>
                            Details
                          </Link>
                        </td>
                      </tr>
                    </Fragment>
                  )
                })}
              </tbody>
            </table>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
