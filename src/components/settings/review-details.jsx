import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Star, X } from "lucide-react";
import { Button } from "../ui/button";
import UserStatus from "../user-management/user-status";
import UserType from "../user-management/user-type";
import { cn } from "@/lib/utils";
import Img from "../common/Img";
import moment from "moment";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { FormProvider, useForm } from "react-hook-form";
import Select from "../common/inputs/select";
import { useBoolean } from "usehooks-ts";
import DeleteReview from "@/modals/delete-review";

const reviewOption = [
  { label: "Approved", value: "approved" },
  { label: "Pending", value: "pending" },
  { label: "Rejected", value: "rejected" },
];

const ReviewDetails = ({ state, data, onClose }) => {
  const deleteReview = useBoolean();
  const methods = useForm({ defaultValues: { status: "" } });

  return (
    <>
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
                Review Details
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
              <DrawerDescription>review details</DrawerDescription>
            </VisuallyHidden.Root>
          </DrawerHeader>
          <div className="h-full flex flex-col overflow-hidden">
            <div className="px-8 flex justify-between items-start">
              <div className="flex items-center gap-x-4">
                <div className="relative">
                  <Img
                    src={data?.user_img}
                    className="min-w-11 min-h-11 size-10 rounded-full border-4 border-text-19"
                  />
                  <div
                    className={cn(
                      "absolute top-0 right-0 size-3 rounded-full border-2 border-text-19",
                      data?.isactive ? "bg-text-20" : "bg-text-5"
                    )}
                  />
                </div>
                <div className="flex flex-col gap-y-0.5">
                  <div className="flex items-center gap-x-2">
                    <p className="text-base text-text-1">{data?.name}</p>
                    <p className="text-xs text-text-1 opacity-50">
                      {moment(data?.last_activity).fromNow()}
                    </p>
                  </div>
                  <UserType role={data?.role} />
                </div>
              </div>
              <UserStatus status={data?.activity_status} />
            </div>
            <Separator className="!w-[calc(100%-64px))] mx-auto my-4 bg-text-19" />
            <div className="h-full flex flex-col overflow-hidden">
              <ScrollArea
                className="h-full px-8 pb-2"
                viewPortClassName="[&>div]:!flex [&>div]:flex-col [&>div]:h-full"
              >
                <div className="flex items-center gap-x-2">
                  <div className="flex items-center gap-x-1">
                    {new Array(5).fill().map((_, i) => {
                      return (
                        <Star
                          className={cn(
                            "size-4",
                            i < data?.rating
                              ? "stroke-text-12 fill-text-12"
                              : "stroke-text-15 fill-text-15"
                          )}
                        />
                      );
                    })}
                  </div>
                  <p className="text-sm text-text-1 font-semibold">
                    {data?.rating}.0
                  </p>
                </div>
                <p className="mt-4 mb-8 text-sm text-text-1 opacity-70">
                  {data?.message}
                </p>
                <div className="flex items-center justify-between gap-x-2">
                  <p className="text-xs text-text-9">{data?.job}</p>
                  <p className="text-xs text-text-4">
                    {moment(data?.date).format("MMM DD, YYYY")}
                  </p>
                </div>
                <Separator className="my-4 bg-text-19" />
                <FormProvider {...methods}>
                  <Select
                    name="status"
                    placeholder="Choose Status"
                    options={reviewOption}
                    className="w-full py-[9px]"
                    label="Status"
                  />
                </FormProvider>
                <div className="mt-8 flex items-center gap-x-2">
                  <Button
                    type="button"
                    className="w-full px-4 py-1.5 rounded-full text-base bg-transparent text-text-2 border border-text-2 hover:bg-transparent"
                  >
                    Flag
                  </Button>
                  <Button
                    type="button"
                    className="w-full px-4 py-1.5 rounded-full text-base bg-transparent text-text-2 border border-text-2 hover:bg-transparent"
                    onClick={deleteReview.setTrue}
                  >
                    Delete
                  </Button>
                  <Button
                    type="button"
                    className="w-full px-4 py-1.5 rounded-full text-base bg-text-24 text-text-1 border border-text-24 hover:bg-text-24"
                  >
                    Reply
                  </Button>
                </div>
              </ScrollArea>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
      <DeleteReview state={deleteReview} />
    </>
  );
};

export default ReviewDetails;
