import Img from "@/components/common/Img";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserStatus from "@/components/user-management/user-status";
import UserType from "@/components/user-management/user-type";
import { cn } from "@/lib/utils";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { X } from "lucide-react";
import Info from "./info";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { ScrollArea } from "@/components/ui/scroll-area";
import Notes from "./notes";
import { useMemo } from "react";
import { faker } from "@faker-js/faker";

export const DisputeInfo = ({ state, data, onClose }) => {
  const search = useSearch({ strict: false })
  const navigate = useNavigate()

  const handleClose = () => {
    onClose();
    state.setFalse();
    navigate({ search: { page: search.page, limit: search.limit } })
  };

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

  const tabs = [
    { label: "Info", value: "info", component: <Info /> },
    { label: `Notes (${notesData.length})`, value: "jobs", component: <Notes data={notesData} /> },
  ]

  return (
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
            <DrawerTitle className="text-xl text-text-1">Dispute Info</DrawerTitle>
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
            <DrawerDescription>dispute info</DrawerDescription>
          </VisuallyHidden.Root>
        </DrawerHeader>
        <div className="h-full flex flex-col overflow-hidden">
          <div className="px-8 flex justify-between items-start">
            <div className="flex items-center gap-x-4">
              <div className="relative">
                <Img src={data?.user_img} className="min-w-11 min-h-11 size-10 rounded-full border-4 border-text-19" />
                <div
                  className={cn(
                    "absolute top-0 right-0 size-3 rounded-full border-2 border-text-19",
                    data?.isactive ? "bg-text-20" : "bg-text-5"
                  )}
                />
              </div>
              <div className="flex flex-col gap-y-0.5">
                <p className="text-base text-text-1">{data?.fname} {data?.lname}</p>
                <UserType role={data?.role} />
              </div>
            </div>
            <UserStatus status={data?.status} />
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
