import Img from "@/components/common/Img";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { faker } from "@faker-js/faker";
import { Link, useSearch } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import moment from "moment";
import { useMemo } from "react";

const Chat = () => {
  const { user_id, ...search } = useSearch({ strict: false })

  const chatData = useMemo(() =>
    Array.from({ length: faker.number.int({ min: 11, max: 69 }) }).map(() => {
      const self = faker.database.mongodbObjectId()
      const messages = Array.from({ length: faker.number.int({ min: 11, max: 69 }) }).map(() => {
        const sender = faker.database.mongodbObjectId()
        return {
          id: faker.helpers.arrayElement([self, sender]),
          message: faker.lorem.sentence(),
          message_time: faker.date.recent({ days: 3 }),
        }
      })
      return {
        id: self,
        fname: faker.person.firstName(),
        lname: faker.person.lastName(),
        avatar: faker.image.avatar(),
        last_message_time: faker.helpers.arrayElement([moment().set("hour", faker.number.int({ min: 1, max: 12 })), faker.date.recent({ days: 3 })]),
        last_message: faker.lorem.sentence(),
        unread: faker.datatype.boolean(),
        messages
      };
    }).sort(a => a.unread ? -1 : 1),
    []);

  const selected_user = useMemo(() => {
    if (!user_id) return
    const user = chatData.find(data => data.id === user_id)
    return user
  }, [user_id])

  return (
    <>
      <AnimatePresence mode="wait">
        {selected_user ? (
          <motion.div
            key="chat-detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="h-full"
          >
            <div className="h-full p-4 rounded-xl flex flex-col gap-y-4 bg-text-13 overflow-hidden">
              <div className="py-4 flex items-center gap-x-4">
                <Link search={search}>
                  <ChevronLeft className="min-w-7 min-h-7 size-7 text-text-4" />
                </Link>
                <div className="flex items-center gap-x-2">
                  <Img src={selected_user.avatar} className="min-w-7 min-h-7 size-7 rounded-full border-2 border-white" />
                  <p className='text-sm text-text-1 font-medium'>{selected_user.fname} {selected_user.lname.at(0)}.</p>
                </div>
              </div>
              <div className="h-full flex overflow-hidden">
                <ScrollArea className="pr-6">
                  <div className="flex flex-col gap-y-5">
                    {selected_user.messages.map((data, index) => {
                      const isSelf = data.id === selected_user.id
                      return (
                        <div key={index} className="flex flex-col">
                          <div className={cn("w-full max-w-[85%] py-3 px-4 rounded-full", isSelf ? "mr-auto bg-text-11 rounded-bl-none" : "ml-auto bg-text-2 rounded-br-none")}>
                            <p className={cn("text-sm", isSelf ? "text-text-1 opacity-90" : "text-white")}>{data.message}</p>
                          </div>
                          <p className={cn("text-text-10 text-xs font-medium", isSelf ? "mr-auto" : "ml-auto")}>
                            {moment(data.message_time).format("hh:mm A")}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-y-4">
            {chatData.map((data) => (
              <Link search={{ ...search, user_id: data.id }} key={data.id} className="pb-3 border-b border-text-24">
                <div className="flex gap-x-3">
                  <Img src={data.avatar} className="min-w-[34px] min-h-[34px] size-[34px] rounded-full border-2 border-white" />
                  <div className="w-full flex flex-col gap-y-1.5">
                    <div className='w-full flex items-start justify-between gap-x-3'>
                      <p className='text-sm text-text-1 font-medium'>{data.fname} {data.lname}</p>
                      <div className="flex items-center gap-x-1">
                        <p className="text-text-9 text-sm">
                          {moment(data.last_message_time).format("DD/MM/YYYY") === moment(new Date()).format("DD/MM/YYYY")
                            ? `Today, ${moment(data.last_message_time).format("HH:mm A")}`
                            : moment(data.last_message_time).format("MMMM DD, hh:mm")}
                        </p>
                        <ChevronRight className="size-4 text-text-9" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center gap-x-1">
                      <div className="w-full max-w-[80%]">
                        <p className={cn("w-full text-sm text-text-1", data.unread ? "opacity-100" : "opacity-70")}>
                          {data.last_message}
                        </p>
                      </div>
                      {data.unread && <div className="size-2 bg-text-12 rounded-full" />}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Chat