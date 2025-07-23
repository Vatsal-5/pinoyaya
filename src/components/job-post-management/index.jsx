import { EyeOn } from '@/assets/icons/common';
import { CalendarIcon } from '@/assets/icons/dashboard';
import { ClockIcon, EmailIcon, LocationIcon } from '@/assets/icons/user-management';
import JobPostStatus from '@/components/job-post-management/job-status';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ROLES } from '@/constants/common';
import { cn } from '@/lib/utils';
import { faker } from '@faker-js/faker';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Star, X } from 'lucide-react';
import moment from 'moment';
import { useMemo } from 'react';
import Img from '../common/Img';
import UserStatus from '../user-management/user-status';
import UserType from '../user-management/user-type';

const JobPostDetails = ({ state }) => {
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
      post_date: faker.date.recent({ days: 3 }),
      expire_date: faker.date.future(),
      status: faker.helpers.arrayElement([0, 1, 2, 3]),
      boost: faker.helpers.arrayElement(["1d", "2d", "3d"]),
      job_title: "Babysitter Needed",
      rate: "₱" + faker.number.int({ min: 100, max: 200 }) + "/hr",
      address: `${faker.location.city()}, ${faker.location.state()}, ${faker.location.zipCode()} (${faker.number.int({ min: 1, max: 10 })}km)`,
      isPartTime: faker.datatype.boolean(),
      start_date: faker.date.soon({ days: 10 }),
      end_date: faker.date.future(),
      hours_per_week: faker.number.int({ min: 4, max: 16 }),
      viewers: faker.number.int({ min: 50, max: 300 }),
      job_dtl: [{ "👶 Number of Kids": "1" }, { "🎂 Kids' Ages": "0-1 year" }, { "🍽️ Special Dietary Needs": "Yes" }, { "🐱 Pets at Home": "Cats" }, { "🍳 Additional Tasks": "Cooking" }],
      applicants: Array.from({ length: faker.number.int({ min: 2, max: 11 }) }).map(() => ({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        age: faker.number.int({ min: 18, max: 60 }),
        avatar: faker.image.avatar(),
        rating: parseFloat(faker.number.float({ min: 3.5, max: 5, precision: 0.1 }).toFixed(1)),
        reviewCount: faker.number.int({ min: 5, max: 150 }),
      }))
    }),
    []
  )

  const onClose = () => {
    state.setFalse()
  }

  return (
    <Drawer
      modal={false}
      open={state.value}
      direction="right"
      dismissible={false}
      onOpenChange={state.setValue}
    >
      {state.value && (
        <div className="fixed inset-0 z-[52] bg-text-1 opacity-10" />
      )}
      <DrawerContent className="!max-w-[512px] pt-8 gap-y-8 border-none">
        <DrawerHeader className="py-0 px-8">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-xl text-text-1">
              Job Post Details
            </DrawerTitle>
            <Button
              type="button"
              variant="outlined"
              className="p-0"
              onClick={onClose}
            >
              <X className="size-5 text-text-4" />
            </Button>
          </div>
          <VisuallyHidden.Root>
            <DrawerDescription>job post details</DrawerDescription>
          </VisuallyHidden.Root>
        </DrawerHeader>
        <div className="h-full flex flex-col overflow-hidden">
          <div className="px-8 flex justify-between items-start">
            <div className="flex items-center gap-x-4">
              <div className="relative">
                <Img
                  src={userData.user_img}
                  className="min-w-11 min-h-11 size-10 rounded-full border-4 border-text-19"
                />
                <div
                  className={cn(
                    "absolute top-0 right-0 size-3 rounded-full border-2 border-text-19",
                    userData.isactive ? "bg-text-20" : "bg-text-5"
                  )}
                />
              </div>
              <div className="flex flex-col gap-y-0.5">
                <p className="text-base text-text-1">
                  {userData.fname} {userData.lname}
                </p>
                <UserType role={userData.role} />
              </div>
            </div>
            <UserStatus status={userData.activity_status} />
          </div>
          <div className="px-8 mt-4 flex items-center gap-x-2">
            <Button
              type="button"
              className="w-full px-4 py-1.5 rounded-full text-sm text-text-2 bg-transparent border border-text-2 hover:bg-transparent"
            >
              Message
              <EmailIcon className="size-5 min-w-5 stroke-text-2" />
            </Button>
            <Button
              type="button"
              className="w-full px-4 py-1.5 rounded-full text-sm text-text-2 bg-transparent border border-text-2 hover:bg-transparent"
            >
              Extend Boost 🔥
            </Button>
          </div>
          <Separator className="!w-[calc(100%-64px))] mx-auto my-3.5 bg-text-19" />
          <div className="h-full flex flex-col overflow-hidden">
            <ScrollArea
              className="h-full px-8 pb-2"
              viewPortClassName="[&>div]:!flex [&>div]:flex-col [&>div]:h-full"
            >
              <ul className="flex flex-col gap-y-1.5">
                <li className="flex items-center justify-between gap-x-1.5">
                  <div className="flex items-center gap-x-1.5">
                    <CalendarIcon className="size-[18px] stroke-text-1 stroke-[2px]" />
                    <span className="text-text-1 text-xs opacity-70">
                      {moment(userData.post_date).format("MMM DD, YYYY")}
                    </span>
                  </div>
                  <p className="text-text-1 opacity-70 text-xs">Post Date</p>
                </li>
                <li className="flex items-center justify-between gap-x-1.5">
                  <div className="flex items-center gap-x-1.5">
                    <CalendarIcon className="size-[18px] stroke-text-1 stroke-[2px]" />
                    <span className="text-text-1 text-xs opacity-70">
                      {moment(userData.expire_date).format("MMM DD, YYYY")}
                    </span>
                  </div>
                  <p className="text-text-1 opacity-70 text-xs">Expires On</p>
                </li>
              </ul>
              <Separator className="my-3.5 bg-text-19" />
              <ul className="flex flex-col gap-y-1.5">
                <li className="flex items-center justify-between gap-x-1.5">
                  <p className="text-text-1 opacity-70 text-xs">Status</p>
                  <JobPostStatus status={userData.status} />
                </li>
                <li className="flex items-center justify-between gap-x-1.5">
                  <p className="text-text-1 opacity-70 text-xs">Boost</p>
                  <p className="text-text-1 opacity-70 text-xs">
                    🔥 Boosted (Ends in {userData.boost})
                  </p>
                </li>
              </ul>
              <Separator className="my-3.5 bg-text-19" />
              <div className="flex justify-between">
                <p className="text-sm text-text-1 font-bold">
                  {userData.job_title}
                </p>
                <p className="text-sm text-text-2 font-semibold">{userData.rate}</p>
              </div>
              <ul className="mt-3 flex flex-col gap-y-1.5">
                <li className="flex items-center gap-x-1.5">
                  <LocationIcon className="size-[18px] min-w-[18px] stroke-text-1 stroke-[1.5px]" />
                  <span className="text-text-1 text-xs opacity-70">
                    {userData.address}
                  </span>
                </li>
                <li className="flex items-center justify-between gap-x-1.5">
                  <div className="flex items-center gap-x-1.5">
                    <CalendarIcon className="size-[18px] min-w-[18px] stroke-text-1 stroke-[2px]" />
                    <div className="w-full flex items-center justify-between">
                      <span className="text-text-1 text-xs opacity-70">
                        From:{" "}
                        {moment(userData.start_date).format("MMM DD, YYYY")}{" "}
                        {userData.isPartTime && "| Part Time"}
                      </span>
                    </div>
                  </div>
                  <span className="text-text-1 text-xs opacity-70">
                    To: {moment(userData.end_date).format("MMM DD, YYYY")}
                  </span>
                </li>
                <li className="flex items-center gap-x-1.5">
                  <ClockIcon className="size-[18px] min-w-[18px] stroke-text-1 stroke-[1.5px]" />
                  <div className="w-full flex items-center justify-between">
                    <span className="text-text-1 text-xs opacity-70">
                      {userData.hours_per_week} Hours per week
                    </span>
                    <span className="text-text-1 text-xs opacity-70">
                      Mon, Tue, Fri
                    </span>
                  </div>
                </li>
                <li className="flex items-center gap-x-1.5">
                  <EyeOn className="size-[18px] min-w-[18px] stroke-text-1 stroke-[2px]" />
                  <div className="w-full flex items-center justify-between">
                    <span className="text-text-1 text-xs opacity-70">
                      {userData.viewers} Viewers
                    </span>
                  </div>
                </li>
              </ul>
              <Separator className="my-3.5 bg-text-19" />
              <div className="space-y-3.5">
                <div className="space-y-2">
                  <p className="text-text-9 text-xs">Job Details:</p>
                  <div className="flex flex-wrap gap-1">
                    {userData.job_dtl.map((data, index) => {
                      const [[key, value]] = Object.entries(data);
                      return (
                        <Badge
                          key={index}
                          className="px-2 bg-transparent text-text-1 opacity-70 text-xs border-text-15 rounded-full"
                        >
                          {key}: {value}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-text-9 text-xs">
                    Family's approximate location
                  </p>
                  <iframe
                    className="w-full h-full max-h-[120px] rounded-xl"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.1902565388104!2d72.75495037584358!3d21.144825483780956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04ddd12bcd12b%3A0x2038ff3f44cfd4d5!2sVR%20Mall!5e0!3m2!1sen!2sin!4v1749124684695!5m2!1sen!2sin"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-text-9 text-xs">
                    Applicants ({userData.applicants.length})
                  </p>
                  <div className="flex flex-col">
                    {userData.applicants.map((data) => {
                      return (
                        <div
                          key={data.id}
                          className="py-3 flex justify-between items-center"
                        >
                          <div className="flex items-center gap-x-2">
                            <Img
                              src={data.avatar}
                              className="min-w-7 min-h-7 size-7 rounded-full border-2 border-white"
                            />
                            <div className="flex flex-col">
                              <p className="text-sm text-text-1 font-semibold">
                                {data.name}, {data.age}
                              </p>
                              <div className="flex items-center gap-x-1">
                                <Star className="size-3.5 fill-text-12 stroke-text-12" />
                                <p className="text-xs text-text-1 opacity-70">
                                  {data.rating} ({data.reviewCount} reviews)
                                </p>
                              </div>
                            </div>
                          </div>
                          <Button
                            type="submit"
                            className="py-1 text-sm rounded-full"
                          >
                            View Profile
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex gap-x-2">
                  <Button
                    type="button"
                    className="w-full py-2 rounded-xl text-base text-text-2 bg-transparent border border-text-2 hover:bg-transparent"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    className="w-full py-2 rounded-xl text-base text-text-2 bg-transparent border border-text-2 hover:bg-transparent"
                  >
                    Repost
                  </Button>
                  <Button
                    type="button"
                    className="w-full py-2 rounded-xl text-base"
                  >
                    Mark as Completed
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default JobPostDetails