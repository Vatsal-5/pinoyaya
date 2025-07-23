import { BellIcon } from '@/assets/icons/common'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { H4 } from '@/components/ui/Typography'
import { faker } from '@faker-js/faker'
import { X } from 'lucide-react'
import Card from './card'
import { useBoolean } from 'usehooks-ts'

const Notification = () => {
  const notificationModal = useBoolean(false)

  const notifications = Array.from({ length: faker.number.int({ min: 5, max: 20 }) }).map(() => {
    const title = faker.helpers.arrayElement(["New Caregiver! ✨", "Lorem ipsum dolor sit amet"])
    return {
      title,
      description: faker.lorem.sentence(),
      time: faker.date.recent(),
      isNewUser: title === "New Caregiver! ✨",
    }
  })

  return (
    <Popover modal open={notificationModal.value} onOpenChange={notificationModal.setValue}>
      <PopoverTrigger className="relative cursor-pointer">
        <BellIcon className="size-7 stroke-text-1" />
        <span className="size-3 absolute top-0 -left-[1px] block bg-text-7 rounded-full" />
      </PopoverTrigger>
      <PopoverContent overlay align="end" sideOffset={16} className="w-[600px] p-5 space-y-6 rounded-xl">
        <div className='flex justify-between items-center'>
          <H4 text="Notifications" className="text-text-1 font-medium" />
          <Button type="button" className="p-0 shadow-none bg-transparent hover:bg-transparent" onClick={notificationModal.setFalse}>
            <X className='size-5 text-text-4' />
          </Button>
        </div>
        <ScrollArea type="always" className="h-[365px] pr-6">
          {notifications.map((notification, index) => {
            return <Card key={index} notification={notification} />
          })}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}

export default Notification