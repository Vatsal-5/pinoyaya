import { CalendarIcon, ReceiptTicketIcon } from "@/assets/icons/dashboard";
import { SendIcon } from "@/assets/icons/dispute-resolution";
import { CheckCircle, User } from "@/assets/icons/user-management";
import Img from "@/components/common/Img";
import JobPostStatus from "@/components/job-post-management/job-status";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import UserStatus from "@/components/user-management/user-status";
import UserType from "@/components/user-management/user-type";
import { cn } from "@/lib/utils";
import InternalNotes from "@/modals/internal-notes";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { InfoIcon, X } from "lucide-react";
import moment from "moment";
import { useBoolean } from "usehooks-ts";

const DisputeDetails = ({ state, data, onClose }) => {
  const internalNoteModal = useBoolean(false)

  const handleClose = () => {
    onClose();
    state.setFalse();
  };

  return (
    <>
      <Drawer
        modal={false}
        open={state.value}
        direction="right"
        dismissible={false}
      >
        {state.value && (
          <div className="fixed inset-0 z-[52] bg-text-1 opacity-10" />
        )}
        <DrawerContent className="!max-w-[512px] pt-8 gap-y-8 border-none">
          <DrawerHeader className="py-0 px-8">
            <div className="flex items-center justify-between">
              <DrawerTitle className="text-xl text-text-1">Chat</DrawerTitle>
              <Button
                type="button"
                variant="outlined"
                className="p-0"
                onClick={handleClose}
              >
                <X className="size-5 text-text-4" />
              </Button>
            </div>
            <VisuallyHidden.Root>
              <DrawerDescription>dispute details details</DrawerDescription>
            </VisuallyHidden.Root>
          </DrawerHeader>
          <div className="h-full flex flex-col overflow-hidden">
            <div className="px-8 flex flex-col items-start gap-y-4">
              <div className="flex items-center gap-x-1.5">
                <ReceiptTicketIcon className="size-[18px] min-w-[18px] stroke-text-1" />
                <p className="text-xs text-text-1 opacity-70 font-medium">
                  {data?.receipt_number}
                </p>
              </div>
              <div className="flex items-center gap-x-1.5">
                <InfoIcon className="size-[18px] min-w-[18px] stroke-text-1 rotate-180" />
                <p className="text-xs text-text-1 opacity-70 font-medium">
                  {data?.issue_type}
                </p>
              </div>
            </div>
            <ScrollArea className="h-full my-4 px-8 flex flex-col overflow-y-auto">
              <div className="h-[600px] p-4 rounded-xl flex flex-col bg-text-13 overflow-hidden">
                <div className="flex items-center gap-x-2">
                  <div className="relative">
                    <Img
                      src={data?.user_img}
                      className="min-w-11 min-h-11 size-11 rounded-full border-2 border-text-24"
                    />
                    <div
                      className={cn(
                        "absolute -top-0.5 right-0 size-3.5 rounded-full border-2 border-text-24",
                        data?.isactive ? "bg-text-20" : "bg-text-5"
                      )}
                    />
                    <div
                      className={cn(
                        "flex gap-x-0.5 absolute bottom-0",
                        data?.isVerified && data?.showRoleIcon
                          ? "-right-1/2"
                          : "-right-1"
                      )}
                    >
                      {data?.isVerified && (
                        <CheckCircle className="size-4 fill-text-12" />
                      )}
                      {data?.showRoleIcon && (
                        <User className="size-4 fill-text-7" />
                      )}
                    </div>
                  </div>
                  <div
                    className={cn(
                      "w-full",
                      data?.isVerified && data?.showRoleIcon
                        ? "ml-7"
                        : !(data?.isVerified && data?.showRoleIcon)
                          ? "ml-3"
                          : "ml-0"
                    )}
                  >
                    <div className="flex justify-between">
                      <span className="text-base text-text-1 flex items-center gap-x-1">
                        {data?.fname} {data?.lname}
                      </span>
                      <UserStatus status={data?.status} />
                    </div>
                    <UserType role={data?.role} />
                  </div>
                </div>
                <Separator className="my-4 bg-text-19" />
                <div className="h-full flex flex-col gap-2 overflow-hidden">
                  <div className="h-full flex flex-col overflow-hidden">
                    <ScrollArea className="h-full pr-6">
                      <div className="flex flex-col gap-y-5">
                        {data?.messages.map((message, index) => {
                          const isSelf = message.id === data?.id;
                          return (
                            <div key={index} className="flex flex-col">
                              <div
                                className={cn(
                                  "w-full max-w-[85%] py-3 px-4 rounded-full",
                                  isSelf
                                    ? "mr-auto bg-text-11 rounded-bl-none"
                                    : "ml-auto bg-text-2 rounded-br-none"
                                )}
                              >
                                <p
                                  className={cn(
                                    "text-sm",
                                    isSelf
                                      ? "text-text-1 opacity-90"
                                      : "text-white"
                                  )}
                                >
                                  {message.message}
                                </p>
                              </div>
                              <p
                                className={cn(
                                  "text-text-10 text-xs font-medium",
                                  isSelf ? "mr-auto" : "ml-auto"
                                )}
                              >
                                {moment(message.message_time).format("hh:mm A")}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </ScrollArea>
                  </div>
                  <div className="relative">
                    <Input
                      className="w-full py-5 pl-4 pr-14 rounded-lg bg-white border-none text-sm font-medium placeholder:text-text-1 placeholder:opacity-40"
                      placeholder="Type here..."
                    />
                    <Button className="p-0 h-full aspect-square bg-transparent hover:bg-transparent shadow-none absolute right-0 top-1/2 -translate-y-1/2">
                      <SendIcon className="min-w-7 size-7 fill-text-7" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-3 mt-4 mb-8 rounded-lg bg-text-24 flex justify-between items-start">
                <div className="flex flex-col gap-y-2">
                  <div className="flex items-center gap-x-2">
                    <p className="text-sm text-text-1 font-medium">
                      {data?.job_title}
                    </p>
                    <JobPostStatus status={data?.job_status} />
                  </div>
                  <div className="flex items-center gap-x-1.5">
                    <CalendarIcon className="size-[18px] stroke-text-1 stroke-[2px]" />
                    <span className="text-text-1 text-xs opacity-70">
                      {moment(data?.start_date).format("MMM DD, YYYY")}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-text-2 font-semibold">{data?.rate}</p>
              </div>
              <div className="flex gap-x-2">
                <Button
                  type="button"
                  className="w-full py-2 rounded-xl text-base text-text-2 bg-transparent border border-text-2 hover:bg-transparent"
                  onClick={internalNoteModal.setTrue}
                >
                  Add Internal Note (23)
                </Button>
                <Button
                  type="button"
                  className="w-full py-2 rounded-xl text-base"
                >
                  Mark as Resolved
                </Button>
              </div>
            </ScrollArea>
          </div>
        </DrawerContent>
      </Drawer>

      <InternalNotes state={internalNoteModal} />
    </>
  );
};

export default DisputeDetails;
