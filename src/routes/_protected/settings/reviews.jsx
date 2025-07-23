import { LikeTagIcon } from "@/assets/icons/settings";
import { Flag } from "@/assets/icons/user-management";
import Select from "@/components/common/inputs/select";
import { Form } from "@/components/ui/form";
import { H3 } from "@/components/ui/Typography";
import { ROLES } from "@/constants/common";
import { cn, formatNumber, kFormatter } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import { MinusIcon, Star } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { jobTypeOption } from "../job-post-management";
import DateFilter from "@/components/common/filters/date";
import { Button } from "@/components/ui/button";
import AreaChart from "@/components/common/charts/area";
import { useMemo, useState } from "react";
import { faker } from "@faker-js/faker";
import BarChart from "@/components/common/charts/bar";
import Input from "@/components/common/inputs/input";
import { SearchIcon } from "@/assets/icons/common";
import { ExportIcon } from "@/assets/icons/job-post-management";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAvtar from "@/components/common/user-avtar";
import { Separator } from "@/components/ui/separator";
import moment from "moment";
import ReviewStatus from "@/components/settings/review-status";
import { useBoolean } from "usehooks-ts";
import ReviewDetails from "@/components/settings/review-details";
import DeleteReview from "@/modals/delete-review";

export const Route = createFileRoute("/_protected/settings/reviews")({
  component: RouteComponent,
});

export const ratingOption = [
  { value: "1", label: "1 star" },
  { value: "2", label: "2 star" },
  { value: "3", label: "3 star" },
  { value: "4", label: "4 star" },
  { value: "5", label: "5 star" },
];

export const reviewStatusOption = [
  { value: "approved", label: "Approved" },
  { value: "pending", label: "Pending" },
  { value: "rejected", label: "Rejected" },
];

function RouteComponent() {
  const reviewDetials = useBoolean();
  const deleteReview = useBoolean();
  const [reviewDetailsData, setReviewDetailsData] = useState(null)

  const reviewCards = [
    {
      name: "Avg. Rating Platform-Wide",
      value: 4.3,
      color: "#FFF7EB",
      icon: <Star className="size-5 stroke-[2px] stroke-text-12" />,
    },
    {
      name: "Reviews This Week",
      value: formatNumber(142).replace(",", " "),
      color: "#E1E8FF",
      icon: <LikeTagIcon className="size-5 stroke-[1.5px] stroke-text-2" />,
    },
    {
      name: "Flagged for Review",
      value: formatNumber(12).replace(",", " "),
      color: "#FFE4E8",
      icon: <Flag className="size-5 stroke-[1.5px] stroke-text-7" />,
    },
  ];

  const filterForm = useForm();
  const methods = useForm({ defaultValues: { search: "" } });

  const totalUserData = useMemo(
    () =>
      Array.from({ length: 7 }).map((_, index) => {
        return {
          date: `${index + 1} Aug`,
          user: faker.number.int({ min: 1, max: 5 }),
        };
      }),
    []
  );

  const ageAndGenderData = useMemo(
    () => [
      {
        label: "1 star",
        star: faker.number.int({ min: 50, max: 100 }),
      },
      {
        label: "2 star",
        star: faker.number.int({ min: 100, max: 300 }),
      },
      {
        label: "3 star",
        star: faker.number.int({ min: 400, max: 800 }),
      },
      {
        label: "4 star",
        star: faker.number.int({ min: 900, max: 1100 }),
      },
      {
        label: "5 star",
        star: faker.number.int({ min: 1200, max: 1600 }),
      },
    ],
    []
  );

  const reviewData = useMemo(
    () =>
      new Array(faker.number.int({ min: 69, max: 400 })).fill().map(() => ({
        id: faker.database.mongodbObjectId(),
        user_img: faker.image.avatar(),
        name: `${faker.person.firstName()} ${faker.person.lastName().charAt(0)}.`,
        isactive: faker.datatype.boolean(),
        role: faker.helpers.arrayElement(ROLES),
        activity_status: faker.helpers.arrayElement([0, 1]),
        last_activity: faker.date.recent(),
        message: faker.lorem.sentences({ min: 1, max: 6 }),
        job: "Babysitter Job",
        date: faker.date.past(),
        status: faker.helpers.arrayElement([0, 1, 2]),
        rating: faker.number.int({ min: 1, max: 5 }),
      })),
    []
  );

  const onSubmit = (e) => {
    console.log(e);
  };
  return (
    <>
      <div className="w-full pt-4 pb-2">
        <div className="grid grid-cols-3 gap-4">
          {reviewCards.map((data, index) => {
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
                <H3 text={data.value} className="font-bold" />
              </div>
            );
          })}
        </div>
        <div className="w-full my-8 flex gap-x-6">
          <Form {...filterForm}>
            <form
              noValidate
              onSubmit={filterForm.handleSubmit(onSubmit)}
              className="w-full flex gap-x-2"
            >
              <div className="w-full grid grid-cols-4 gap-x-2">
                <Select
                  name="user_type"
                  placeholder="User Type"
                  options={ROLES.map((role) => ({ value: role, label: role }))}
                  className="w-full py-[9px]"
                />
                <Select
                  name="job_type"
                  placeholder="Job Type"
                  options={jobTypeOption}
                  className="w-full py-[9px]"
                />
                <Select
                  name="rating"
                  placeholder="Rating Filter"
                  options={ratingOption}
                  className="w-full py-[9px]"
                />
                <Select
                  name="review_status"
                  placeholder="Review Status"
                  options={reviewStatusOption}
                  className="w-full py-[9px]"
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
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 space-y-3.5 bg-white rounded-xl">
            <div className="flex items-start justify-between gap-x-2">
              <div className="flex flex-col gap-y-1">
                <p className="text-xs text-text-1 opacity-60">Avg. Rating</p>
                <H3 text="4.3" className="font-bold" />
              </div>
            </div>
            <AreaChart
              className="w-full h-full max-h-[260px] min-h-[260px]"
              data={totalUserData}
              YAxisFormatter={(numb) => `${numb}.0`}
            />
          </div>
          <div className="p-3 flex flex-col gap-y-8 bg-white rounded-xl">
            <p className="text-xs text-text-1 opacity-60">
              App Rating Analytic
            </p>
            <BarChart
              className="w-full h-full min-h-[266px] max-h-[266px]"
              data={ageAndGenderData}
              YAxisFormatter={kFormatter}
              dataKeys="label"
              barKeys={["star"]}
              colors={[
                "var(--color-text-7)",
                "var(--color-text-12)",
                "var(--color-text-25)",
                "var(--color-text-11)",
                "var(--color-text-2)",
              ]}
            />
          </div>
        </div>
        <div className="mt-5 mb-6 flex items-center justify-between gap-x-2">
          <p className="whitespace-nowrap text-sm text-text-1 font-semibold">
            Reviews ({reviewData.length})
          </p>
          <div className="w-full flex items-center justify-end gap-x-2">
            <FormProvider {...methods}>
              <Input
                name="search"
                placeholder="Search by content, reviewer, or keyword"
                prefix={<SearchIcon className="size-[18px] stroke-text-1" />}
                containerClassName="w-full max-w-[334px]"
                className="w-full px-4 py-1.5 sm:pl-10 font-medium bg-transparent border-text-24 rounded-full text-base shadow-none placeholder:font-medium"
                prefixContainerClassName="sm:left-3"
              />
            </FormProvider>
            <Button
              type="button"
              className="w-full max-w-[136px] px-4 py-1.5 rounded-full text-sm text-text-2 bg-transparent border border-text-2 hover:bg-transparent"
            >
              Export CSV
              <ExportIcon className="size-5 min-w-5 stroke-text-2" />
            </Button>
            <Button
              type="button"
              className="w-full max-w-[136px] px-4 py-1.5 rounded-full text-sm text-text-1 bg-text-24 border border-text-24 hover:bg-text-24"
            >
              Approve All
            </Button>
          </div>
        </div>
        <ScrollArea className="h-[500px] pb-2 pr-6">
          <div className="flex flex-col gap-y-6">
            {reviewData.map((data) => {
              return (
                <div
                  key={data.id}
                  className="p-3 flex flex-col rounded-lg bg-white"
                >
                  <div className="flex justify-between">
                    <UserAvtar
                      img={data.user_img}
                      fullname={data.name}
                      nameClassName="text-sm"
                    />
                    <div className="flex items-center gap-x-2">
                      <div className="flex items-center gap-x-1">
                        {new Array(5).fill().map((_, i) => {
                          return (
                            <Star
                              className={cn(
                                "size-4",
                                i < data.rating
                                  ? "stroke-text-12 fill-text-12"
                                  : "stroke-text-15 fill-text-15"
                              )}
                            />
                          );
                        })}
                      </div>
                      <p className="text-sm text-text-1 font-semibold">
                        {data.rating}.0
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-text-1 opacity-70 line-clamp-1">
                    {data.message}
                  </p>
                  <Separator className="my-2 bg-text-19" />
                  <div className="flex justify-between items-end gap-x-2">
                    <div className="space-y-2">
                      <p className="text-xs text-text-9">
                        {data.job} |{" "}
                        <span className="text-text-4">
                          {moment(data.date).format("MMM DD, YYYY")}
                        </span>
                      </p>
                      <ReviewStatus status={data.status} />
                    </div>
                    <div className="flex items-center gap-x-2">
                      <Button
                        type="button"
                        className="px-4 py-1.5 rounded-xl text-sm bg-transparent text-text-2 border border-text-2 hover:bg-transparent"
                        onClick={() => {
                          reviewDetials.setTrue();
                          setReviewDetailsData(data);
                        }}
                      >
                        View Details
                      </Button>
                      <Button
                        type="button"
                        className="px-4 py-1.5 rounded-xl text-sm bg-transparent text-text-2 border border-text-2 hover:bg-transparent"
                      >
                        Flag
                      </Button>
                      <Button
                        type="button"
                        className="px-4 py-1.5 rounded-xl text-sm bg-transparent text-text-2 border border-text-2 hover:bg-transparent"
                        onClick={deleteReview.setTrue}
                      >
                        Delete
                      </Button>
                      <Button
                        type="button"
                        className="px-4 py-1.5 rounded-xl text-sm bg-text-24 text-text-1 border border-text-24 hover:bg-text-24"
                      >
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      <ReviewDetails
        state={reviewDetials}
        data={reviewDetailsData}
        onClose={() => {
          reviewDetials.setFalse();
          setReviewDetailsData(null);
        }}
      />
      <DeleteReview state={deleteReview} />
    </>
  );
}
