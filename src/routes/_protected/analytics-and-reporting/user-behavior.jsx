import { ExportIcon } from '@/assets/icons/job-post-management';
import AreaChart from '@/components/common/charts/area';
import BarChart from '@/components/common/charts/bar';
import HorizontalBarChart from '@/components/common/charts/horizontal-bar';
import DateFilter from '@/components/common/filters/date';
import DayFilter from '@/components/common/filters/day';
import Select from '@/components/common/inputs/select';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { H3 } from '@/components/ui/Typography';
import { ROLES } from '@/constants/common';
import { cn, formatNumber, kFormatter } from '@/lib/utils';
import { faker } from '@faker-js/faker';
import { createFileRoute } from '@tanstack/react-router';
import { MinusIcon } from 'lucide-react';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { locationOption } from '../job-post-management';
import { accountStatusOption } from '../user-management';

export const Route = createFileRoute(
  '/_protected/analytics-and-reporting/user-behavior',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const search = Route.useSearch({ strict: false })
  const navigate = Route.useNavigate()

  const filterForm = useForm();

  const platformData = useMemo(() => (
    Array.from({ length: 7 }).map(() => {
      return {
        date: faker.date
          .between({ from: '2025-08-01', to: '2025-08-31' })
          .toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        platform: faker.number.int({ min: 100, max: 2000 })
      }
    })
  ), [search.tab])

  const tabs = [
    { label: "Daily Logins", value: "daily-logins", labelHeader: "Users" },
    { label: "Job Posts", value: "job-posts", labelHeader: "Job Posts" },
    { label: "Job Applications", value: "job-applications", labelHeader: "Job Applications" },
  ]

  const ageAndGenderData = useMemo(() => [
    { age: "18-24", male: faker.number.int({ min: 10000, max: 50000 }), female: faker.number.int({ min: 10000, max: 50000 }) },
    { age: "25-34", male: faker.number.int({ min: 10000, max: 50000 }), female: faker.number.int({ min: 10000, max: 50000 }) },
    { age: "35-44", male: faker.number.int({ min: 10000, max: 50000 }), female: faker.number.int({ min: 10000, max: 50000 }) },
    { age: "45-54", male: faker.number.int({ min: 10000, max: 50000 }), female: faker.number.int({ min: 10000, max: 50000 }) },
    { age: "55+", male: faker.number.int({ min: 10000, max: 50000 }), female: faker.number.int({ min: 10000, max: 50000 }) },
  ], [])

  const locationData = useMemo(() => [
    { location: "Quezon", value: faker.number.int({ min: 13000, max: 14000 }) },
    { location: "Manila", value: faker.number.int({ min: 12000, max: 13000 }) },
    { location: "Caloocan", value: faker.number.int({ min: 10000, max: 12000 }) },
    { location: "Davao", value: faker.number.int({ min: 7000, max: 10000 }) },
    { location: "Cebu", value: faker.number.int({ min: 5000, max: 7000 }) },
    { location: "Antipolo", value: faker.number.int({ min: 3000, max: 5000 }) },
    { location: "Pasig", value: faker.number.int({ min: 1000, max: 2000 }) },
  ], [])

  const verificationData = useMemo(() => [
    { location: "Total Caregivers", value: faker.number.int({ min: 12000, max: 14000 }) },
    { location: "Submitted Veriff", value: faker.number.int({ min: 11000, max: 12000 }) },
    { location: "Uploaded Required Docs", value: faker.number.int({ min: 6000, max: 10000 }) },
    { location: "Admin Approved", value: faker.number.int({ min: 1000, max: 5000 }) },
  ], [])

  const onSubmit = (e) => {
    console.log(e);
  };

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
              <DayFilter name="day" className="w-full" placeholder="Select Day" />
              <Select name="user_type" placeholder="User Type" options={ROLES.map(role => ({ value: role, label: role }))} className="w-full py-[9px]" />
              <Select name="location" placeholder="Location" options={locationOption} className="w-full py-[9px]" />
              <Select name="status" placeholder="Status" options={accountStatusOption} className="w-full py-[9px]" />
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
        <div className='mt-8 flex flex-col gap-y-5'>
          <div className='w-full max-w-[430px] flex items-center gap-x-2'>
            <Button type="button" className="w-full px-4 py-2 rounded-xl text-sm text-text-2 bg-transparent border border-text-2 hover:bg-transparent">
              Export CSV
              <ExportIcon className="size-5 min-w-5 stroke-text-2" />
            </Button>
            <Button type="button" className="w-full px-4 py-2 rounded-xl text-sm text-text-2 bg-transparent border border-text-2 hover:bg-transparent">
              Send Reminder to Unverified Caregivers
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 space-y-3.5 bg-white rounded-xl">
              <Tabs className="h-full gap-y-3.5 overflow-hidden" defaultValue={search.tab ?? tabs.at(0).value} onValueChange={tab => navigate({ search: { ...search, tab } })}>
                <TabsList className="w-full h-max p-1.5 bg-text-13 gap-x-7 rounded-sm">
                  {tabs.map((data, index) => {
                    return (
                      <TabsTrigger
                        key={index}
                        value={data.value}
                        className="p-0 bg-transparent text-text-1 font-semibold opacity-40 cursor-pointer data-[state=active]:bg-transparent data-[state=active]:opacity-100 data-[state=active]:shadow-none transition-opacity"
                      >
                        {data.label}
                      </TabsTrigger>
                    )
                  })}
                </TabsList>
                {tabs.map((data, index) => {
                  return (
                    <TabsContent
                      key={index}
                      value={data.value}
                      className="h-full flex flex-col gap-y-3.5 overflow-hidden"
                    >
                      <div className="flex items-start justify-between gap-x-2">
                        <div className="flex flex-col gap-y-1">
                          <p className="text-xs text-text-1 opacity-60">Platform usage</p>
                          <H3 text={formatNumber(3045).replace(",", " ")} className="font-bold" />
                        </div>
                      </div>
                      <AreaChart
                        data={platformData}
                        className="w-full h-full min-h-[200px] max-h-[200px]"
                        tooltipContentClassName={cn(index === 2 && "w-[11rem]")}
                        dataKeys={["platform"]}
                        labelName={data.labelHeader}
                        YAxisFormatter={kFormatter}
                      />
                    </TabsContent>
                  )
                })}
              </Tabs>
            </div>
            <div className="p-3 flex flex-col gap-y-8 bg-white rounded-xl">
              <div className="flex items-start justify-between gap-x-2">
                <p className="text-xs text-text-1 opacity-60">Age & Gender Breakdown</p>
                <div className='flex gap-x-10'>
                  <div className='flex items-center gap-x-2'>
                    <div className='bg-text-7 size-[9px] min-w-[9px] aspect-square rounded-full' />
                    <p className='text-xs text-text-9 opacity-70'>Female</p>
                  </div>
                  <div className='flex items-center gap-x-2'>
                    <div className='bg-text-2 size-[9px] min-w-[9px] aspect-square rounded-full' />
                    <p className='text-xs text-text-9 opacity-70'>Male</p>
                  </div>
                </div>
              </div>
              <BarChart className="w-full h-full min-h-[266px] max-h-[266px]" data={ageAndGenderData} YAxisFormatter={kFormatter} dataKeys="age" barKeys={["male", "female"]} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 flex flex-col gap-y-3.5 bg-white rounded-xl">
              <p className="text-xs text-text-1 opacity-60">Location Breakdown📍</p>
              <div className="w-full flex gap-x-4">
                <HorizontalBarChart className="w-full h-full min-h-[212px] max-h-[212px]" data={locationData} YAxisFormatter={kFormatter} dataKeys="location" />
                <div className="h-full flex flex-col justify-between">
                  {locationData.map((data, index) => {
                    return <p key={index} className="whitespace-nowrap text-text-1 opacity-40 text-xs">{formatNumber(data.value).replace(",", " ")}</p>
                  })}
                </div>
              </div>
            </div>
            <div className="p-3 flex flex-col gap-y-3.5 bg-white rounded-xl">
              <p className="text-xs text-text-1 opacity-60">Verification behavior</p>
              <div className="w-full flex gap-x-4">
                <HorizontalBarChart className="w-full h-full min-h-[170px] max-h-[170px]" data={verificationData} YAxisFormatter={kFormatter} dataKeys="location" />
                <div className="h-full max-h-[150px] mt-2.5 flex flex-col justify-between">
                  {verificationData.map((data, index) => {
                    return <p key={index} className="whitespace-nowrap text-text-1 opacity-40 text-xs">{formatNumber(data.value).replace(",", " ")}</p>
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
