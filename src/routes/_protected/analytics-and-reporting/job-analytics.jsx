import { ClipBoardCheckIcon } from '@/assets/icons/analytics-reporting';
import { ClipboardIcon } from '@/assets/icons/dashboard';
import { CheckCircle } from '@/assets/icons/user-management';
import AreaChart from '@/components/common/charts/area';
import PieChart from '@/components/common/charts/pie';
import DateFilter from '@/components/common/filters/date';
import Img from '@/components/common/Img';
import Select from '@/components/common/inputs/select';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { H3 } from "@/components/ui/Typography";
import { JOB_DIS_MAP } from '@/constants/images';
import { formatNumber, kFormatter } from '@/lib/utils';
import { faker } from '@faker-js/faker';
import { createFileRoute } from '@tanstack/react-router';
import { CircleX, Clock, MinusIcon } from 'lucide-react';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { jobStatusOption, jobTypeOption } from '../job-post-management';
import { ROLES } from '@/constants/common';

export const Route = createFileRoute(
  '/_protected/analytics-and-reporting/job-analytics',
)({
  component: RouteComponent,
})

function RouteComponent() {

  const filterForm = useForm();

  const onSubmit = (e) => {
    console.log(e);
  };

  const jonAnalyticsCards = [
    {
      name: "Total Job Posts",
      value: 12452,
      color: "#E1E8FF",
      icon: <ClipboardIcon className="size-5 stroke-text-2" />,
    },
    {
      name: "Active Job Posts",
      value: 872,
      color: "#E1E8FF",
      icon: <ClipBoardCheckIcon className="size-5 stroke-text-2" />,
    },
    {
      name: "Boosted Jobs",
      value: 134,
      color: "#E1E8FF",
      icon: "🔥",
    },
    {
      name: "Completed Jobs",
      value: 7304,
      color: "#F0FAEA",
      icon: <CheckCircle className="size-5 stroke-text-20" />,
    },
    {
      name: "Cancelled Jobs",
      value: 1093,
      color: "#FFE4E8",
      icon: <CircleX className="size-5 stroke-text-7" />,
    },
    {
      name: "Avg. Time to Fill a Job",
      value: "1.8 days",
      color: "#E1E8FF",
      icon: <Clock className="size-5 stroke-text-2" />,
    },
  ];

  const postedJobsData = useMemo(() => (
    Array.from({ length: 7 }).map(() => {
      return {
        date: faker.date
          .between({ from: '2025-08-01', to: '2025-08-31' })
          .toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        jobs: faker.number.int({ min: 100, max: 2000 })
      }
    })
  ), [])

  const ratingData = useMemo(() => (
    [
      ...Array.from({ length: 5 }).map((_, i) => {
        return { rating: `${i + 1} star`, stars: faker.number.int({ min: 51, max: 511 }) }
      }),
      ...[{ rating: "Unrated", stars: faker.number.int({ min: 51, max: 511 }) }]
    ]
  ), [])

  const insightData = useMemo(() => [
    { key: "Jobs Posted", value: faker.number.int({ min: 51, max: 511 }), icon: "📝" },
    { key: "Jobs Cancelled by Families", value: faker.number.int({ min: 7, max: 21 }), icon: "❌" },
    { key: "Jobs Marked “No Show” by Caregivers", value: faker.number.int({ min: 4, max: 14 }), icon: "🚫" },
    { key: "Most Common Job Type", value: "Babysitter", icon: "💼" },
    { key: "Top Locations by Volume", value: "Manila, Cebu, Davao", icon: "📍" },
    { key: "Total Boost Purchases", value: faker.number.int({ min: 31, max: 99 }), icon: "🧾" },
    { key: "Disputes Opened This Week", value: faker.number.int({ min: 0, max: 11 }), icon: "🚩" },
  ])

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
              <Select name="job_type" placeholder="Job Type" options={jobTypeOption} className="w-full py-[9px]" />
              <Select name="user_type" placeholder="User Type" options={ROLES.map(role => ({ value: role, label: role }))} className="w-full py-[9px]" />
              <Select name="job_status" placeholder="Status" options={jobStatusOption} className="w-full py-[9px]" />
              <div className='flex items-center justify-center gap-x-2'>
                <Label htmlFor="boosted" className="text-text-1 text-sm font-normal">Boosted Only</Label>
                <Switch id="boosted" />
              </div>
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
        <div className="mt-5 mb-4 grid grid-cols-6 gap-4">
          {jonAnalyticsCards.map((data, index) => {
            return (
              <div key={index} className="p-3 bg-white rounded-xl">
                <div
                  style={{ backgroundColor: data.color }}
                  className="size-10 min-w-10 aspect-square flex items-center justify-center rounded-full"
                >
                  {data.icon}
                </div>
                <p className="mt-2 mb-1 font-medium text-sm text-text-1 opacity-60">{data.name}</p>
                <H3 text={isNaN(data.value) ? data.value : formatNumber(data.value).replace(",", " ")} className="font-bold" />
              </div>
            );
          })}
        </div>
        <div className="mt-5 mb-4 grid grid-cols-2 gap-4">
          <div className="p-3 space-y-3.5 bg-white rounded-xl">
            <div className="flex items-start justify-between gap-x-2">
              <div className="flex flex-col gap-y-1">
                <p className="text-xs text-text-1 opacity-60">Job Posts Over Time</p>
                <H3 text={formatNumber(3045).replace(",", " ")} className="font-bold" />
              </div>
            </div>
            <AreaChart className="w-full h-full max-h-[340px] min-h-[340px]" data={postedJobsData} YAxisFormatter={kFormatter} dataKeys={["jobs"]} />
          </div>
          <div className="p-3 flex flex-col gap-y-3.5 bg-white rounded-xl">
            <p className="text-xs text-text-1 opacity-60">Job Distribution by Location</p>
            <div className='h-full flex gap-x-5'>
              <div className='py-2 flex flex-col justify-between gap-y-4'>
                <div className='flex flex-col items-center gap-y-2'>
                  <div className='size-[9px] min-w-[9px] bg-text-7 rounded-full' />
                  <p className='text-xs text-text-9 text-center whitespace-nowrap opacity-70'>10K+</p>
                </div>
                <div className='flex flex-col items-center gap-y-2'>
                  <div className='size-[9px] min-w-[9px] bg-text-12 rounded-full' />
                  <p className='text-xs text-text-9 text-center whitespace-nowrap opacity-70'>7K-10K</p>
                </div>
                <div className='flex flex-col items-center gap-y-2'>
                  <div className='size-[9px] min-w-[9px] bg-text-25 rounded-full' />
                  <p className='text-xs text-text-9 text-center whitespace-nowrap opacity-70'>5K-7K</p>
                </div>
                <div className='flex flex-col items-center gap-y-2'>
                  <div className='size-[9px] min-w-[9px] bg-text-11 rounded-full' />
                  <p className='text-xs text-text-9 text-center whitespace-nowrap opacity-70'>1K-5K</p>
                </div>
                <div className='flex flex-col items-center gap-y-2'>
                  <div className='size-[9px] min-w-[9px] bg-text-2 rounded-full' />
                  <p className='text-xs text-text-9 text-center whitespace-nowrap opacity-70'>0-1K</p>
                </div>
              </div>
              <div className='w-full h-full'>
                <Img src={JOB_DIS_MAP} className="h-full object-cover rounded-xl" alt="job-distribution" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 mb-4 grid grid-cols-2 gap-4">
          <div className="p-3 space-y-3.5 bg-white rounded-xl">
            <p className="text-xs text-text-1 text-center opacity-60">Ratings Breakdown:</p>
            <PieChart className="w-full h-full max-h-[340px] min-h-[340px]" data={ratingData} dataKeys="stars" nameKey="rating" />
          </div>
          <div className="p-3 flex flex-col gap-y-3.5 bg-white rounded-xl">
            <p className="text-xs text-text-1 opacity-60">Insight</p>
            <ul className='h-full flex flex-col justify-between gap-y-4'>
              {insightData.map((data, index) => {
                return (
                  <li key={index} className='p-2 flex items-center justify-between gap-x-2 bg-text-13 rounded-lg'>
                    <div className='flex gap-x-3 items-center'>
                      <div className='size-7 min-w-7 p-[5px] rounded-md flex items-center justify-center aspect-square bg-text-24'>
                        {data.icon}
                      </div>
                      <p className='text-sm text-text-1 font-medium'>{data.key}</p>
                    </div>
                    <p className='text-sm text-text-1 font-medium'>{data.value}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
