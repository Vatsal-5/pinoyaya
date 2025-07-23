import { CalendarIcon } from "@/assets/icons/dashboard";
import { UsersIcon } from "@/assets/icons/sidebar";
import { EmailIcon } from "@/assets/icons/user-management";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { X } from "lucide-react";
import { Button } from "../ui/button";
import moment from "moment";
import { EyeOn } from "@/assets/icons/common";
import { Separator } from "../ui/separator";
import NotificationStatus from "./notification-status";
import { DeleteIcon } from "@/assets/icons/notification-management";

const NotificationDetails = ({ state, data, setData }) => {


  const onClose = () => {
    state.setFalse()
  }
  return (
    <Drawer modal={false} open={state.value} direction="right" dismissible={false} onOpenChange={state.setValue}>
      {state.value && <div className="fixed inset-0 z-[52] bg-text-1 opacity-10" />}
      <DrawerContent className="!max-w-[512px] pt-8 gap-y-8 border-none">
        <DrawerHeader className="py-0 px-8">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-xl text-text-1">Notification Details</DrawerTitle>
            <Button type="button" variant="outlined" className="p-0" onClick={onClose}>
              <X className="size-5 text-text-4" />
            </Button>
          </div>
          <VisuallyHidden.Root>
            <DrawerDescription>notification details</DrawerDescription>
          </VisuallyHidden.Root>
        </DrawerHeader>
        <div className="h-full pl-8 pr-2 pb-4 overflow-hidden">
          <ScrollArea className="h-full pr-6" viewPortClassName="[&>div]:!flex [&>div]:flex-col [&>div]:h-full">
            <ul className="flex flex-col gap-y-4">
              <li className="flex gap-x-1.5 items-center">
                <EmailIcon className="stroke-text-1 size-[18px] min-w-[18px]" />
                <p className="text-sm text-text-1 opacity-70">{data?.type}</p>
              </li>
              <li className="flex gap-x-1.5 items-center">
                <UsersIcon className="stroke-text-1 size-[18px] min-w-[18px]" />
                <p className="text-sm text-text-1 opacity-70">All Users</p>
              </li>
              <li className="flex gap-x-1.5 items-center">
                <CalendarIcon className="stroke-text-1 stroke-[1.5px] size-[18px] min-w-[18px]" />
                <p className="text-sm text-text-1 opacity-70">{moment(data?.createdAt).format("DD MMM YYYY")}</p>
              </li>
              <li className="flex gap-x-1.5 items-center">
                <EyeOn className="stroke-text-1 stroke-[1.5px] size-[18px] min-w-[18px]" />
                <p className="text-sm text-text-1 opacity-70">{data?.recipients}</p>
              </li>
            </ul>
            <Separator className="my-4 bg-text-19" />
            <div className="flex flex-col gap-y-4">
              <p className="text-lg text-text-1 font-semibold">{data?.title}</p>
              <p className="text-sm text-text-1">Lorem ipsum dolor sit amet consectetur. Nunc urna non at sit eget. Et diam diam iaculis posuere. Venenatis ultrices elit libero a fames mauris mattis malesuada malesuada. Vel.</p>
            </div>
            <Separator className="my-4 bg-text-19" />
            <div className="flex items-center justify-between">
              <p className="text-text-1 opacity-70 text-sm">Notification Status</p>
              <NotificationStatus status={data?.status} />
            </div>
            <div className="mt-8 flex items-center gap-x-2">
              <Button type="button" className="w-full px-4 py-2.5 rounded-xl text-base bg-text-24 text-text-1 border border-text-24 hover:bg-text-24">
                <DeleteIcon className="size-5 min-w-5 stroke-text-1" />
                Delete
              </Button>
              <Button type="button" className="w-full px-4 py-2.5 rounded-xl text-base bg-text-7 text-white border border-text-7 hover:bg-text-7">
                Duplicate
              </Button>
            </div>
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default NotificationDetails