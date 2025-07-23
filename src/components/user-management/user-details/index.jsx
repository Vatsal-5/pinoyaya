import Img from "@/components/common/Img";
import UserStatus from "@/components/user-management/user-status";
import UserType from "@/components/user-management/user-type";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ROLES } from "@/constants/common";
import { cn } from "@/lib/utils";
import { faker } from '@faker-js/faker';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { useNavigate, useSearch } from "@tanstack/react-router";
import { X } from "lucide-react";
import moment from "moment";
import { useMemo } from "react";
import Info from "./info";
import { ScrollArea } from "@/components/ui/scroll-area";
import Jobs from "./jobs";
import Notes from "./notes";
import Chat from "./chat";
import Dispute from "./dispute";

const index = ({ state }) => {
  const search = useSearch({ strict: false })
  const navigate = useNavigate()

  const userData = useMemo(
    () =>
    ({
      id: faker.database.mongodbObjectId(),
      user_img: faker.image.avatar(),
      fname: faker.person.firstName(),
      lname: faker.person.lastName(),
      isactive: faker.datatype.boolean(),
      role: faker.helpers.arrayElement(ROLES),
      last_activity: faker.date.recent(),
      activity_status: faker.helpers.arrayElement([0, 1]),
    }),
    []
  )

  const jobsData = useMemo(() =>
    Array.from({ length: faker.number.int({ min: 6, max: 69 }) }).map(() => {
      const isHired = faker.datatype.boolean();
      const status = faker.helpers.arrayElement([0, 1]);
      return {
        id: faker.database.mongodbObjectId(),
        title: faker.helpers.arrayElement(['Babysitter Needed', 'House Cleaner', 'Car Cleaner']),
        status,
        rate: faker.number.int({ min: 20, max: 84 }),
        address: `${faker.location.city()}, ${faker.location.state()}, ${faker.location.zipCode()} (${faker.number.int({ min: 1, max: 10 })}km)`,
        start_date: faker.date.soon({ days: 10 }),
        hours_per_week: faker.number.int({ min: 4, max: 16 }),
        expiry_date: faker.date.future(),
        viewers: faker.number.int({ min: 50, max: 300 }),
        applicants: faker.number.int({ min: 1, max: 5 }),
        chosen_applicant_img: isHired ? faker.image.avatar() : null,
        chosen_applicant: isHired ? `${faker.person.firstName()} ${faker.person.lastName()}` : null,
        countdown: status ? faker.date.soon({ days: 1 }) : null,
        isPartTime: faker.datatype.boolean(),
      };
    }), [])

  const notesData = useMemo(() =>
    Array.from({ length: faker.number.int({ min: 5, max: 20 }) }).map(() => {
      return {
        id: faker.database.mongodbObjectId(),
        fname: faker.person.firstName(),
        lname: faker.person.lastName(),
        createdAt: faker.date.recent({ days: 30 }),
        message: faker.lorem.sentences(faker.number.int({ min: 1, max: 3 }))
      };
    }), []);

  const disputeData = useMemo(() =>
    Array.from({ length: faker.number.int({ min: 5, max: 20 }) }).map(() => {
      return {
        id: faker.database.mongodbObjectId(),
        ticket_number: `№${faker.number.int({ min: 1000000, max: 9999999 })}`,
        date: faker.date.recent({ days: 30 }),
        reason: faker.helpers.arrayElement(["No show", "Rude behavior", "Late arrival", "Unprofessional", "Incomplete task"]),
        status: faker.helpers.arrayElement([0, 1]),
      };
    }), [])

  const onClose = () => {
    state.setFalse()
    navigate({ search: { page: search.page, limit: search.limit } })
  }

  const tabs = [
    { label: "Info", value: "info", component: <Info onClose={onClose} /> },
    { label: `Jobs (${jobsData.length})`, value: "jobs", component: <Jobs onClose={onClose} data={jobsData} /> },
    { label: "Chat", value: "chat", component: <Chat onClose={onClose} /> },
    { label: `Disputes (${disputeData.length})`, value: "disputes", component: <Dispute onClose={onClose} data={disputeData} /> },
    { label: `Notes (${notesData.length})`, value: "notes", component: <Notes onClose={onClose} data={notesData} /> },
  ]

  return (
    <Drawer modal={false} open={state.value} direction="right" dismissible={false} onOpenChange={state.setValue}>
      {state.value && <div className="fixed inset-0 z-[52] bg-text-1 opacity-10" />}
      <DrawerContent className="!max-w-[512px] pt-8 gap-y-8 border-none">
        <DrawerHeader className="py-0 px-8">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-xl text-text-1">User Profile</DrawerTitle>
            <Button type="button" variant="outlined" className="p-0" onClick={onClose}>
              <X className="size-5 text-text-4" />
            </Button>
          </div>
          <VisuallyHidden.Root>
            <DrawerDescription>user profile details</DrawerDescription>
          </VisuallyHidden.Root>
        </DrawerHeader>
        <div className="h-full flex flex-col overflow-hidden">
          <div className="px-8 flex justify-between items-start">
            <div className="flex items-center gap-x-4">
              <div className="relative">
                <Img src={userData.user_img} className="min-w-11 min-h-11 size-10 rounded-full border-4 border-text-19" />
                <div
                  className={cn(
                    "absolute top-0 right-0 size-3 rounded-full border-2 border-text-19",
                    userData.isactive ? "bg-text-20" : "bg-text-5"
                  )}
                />
              </div>
              <div className="flex flex-col gap-y-0.5">
                <div className="flex items-center gap-x-2">
                  <p className="text-base text-text-1">{userData.fname} {userData.lname}</p>
                  <p className="text-text-1 opacity-50 text-xs">{moment(userData.last_activity).fromNow()}</p>
                </div>
                <UserType role={userData.role} />
              </div>
            </div>
            <UserStatus status={userData.activity_status} />
          </div>
          <Separator className="!w-[calc(100%-64px))] mx-auto my-6 bg-text-19" />
          <Tabs className="h-full gap-y-4 overflow-hidden" defaultValue={tabs.at(0).value} onValueChange={tab => navigate({ search: { ...search, tab } })}>
            <TabsList className="py-0 px-8 bg-transparent gap-x-7">
              {tabs.map((data, index) => {
                return (
                  <TabsTrigger
                    key={index}
                    value={data.value}
                    className="p-0 bg-transparent text-text-1 opacity-40 cursor-pointer data-[state=active]:opacity-100 data-[state=active]:shadow-none transition-opacity"
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
                  className="h-full pr-2 pl-8 overflow-hidden"
                >
                  <ScrollArea className="h-full pr-6 pb-2" viewPortClassName="[&>div]:!flex [&>div]:flex-col [&>div]:h-full">
                    {data.component}
                  </ScrollArea>
                </TabsContent>
              )
            })}
          </Tabs>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default index