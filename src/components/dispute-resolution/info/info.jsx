import { CalendarIcon, ReceiptTicketIcon } from "@/assets/icons/dashboard"
import { EmailIcon } from "@/assets/icons/user-management"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import DisputeStatus from "@/components/user-management/dispute-status"
import InternalNotes from "@/modals/internal-notes"
import { issueTypeOption } from "@/routes/_protected/dispute-resolution"
import { faker } from "@faker-js/faker"
import { CircleAlert } from "lucide-react"
import moment from "moment"
import { useMemo } from "react"
import { useBoolean } from "usehooks-ts"

const Info = () => {
  const internalNoteModal = useBoolean(false)

  const userData = useMemo(() => ({
    id: faker.database.mongodbObjectId(),
    receipt_number: `№${faker.number.int({ min: 1000000, max: 9999999 })}`,
    email: faker.internet.email(),
    createdAt: faker.date.recent({ days: 10 }),
    reason: faker.helpers.arrayElement(issueTypeOption.map(e => e.label)),
    status: faker.helpers.arrayElement([0, 1]),
  }), [])
  return (
    <>
      <ul className="flex flex-col gap-y-4">
        <li className="flex items-center gap-x-1.5">
          <EmailIcon className="size-[18px] stroke-text-1 stroke-[1.5px]" />
          <span className="text-text-1 text-sm opacity-70">{userData.email}</span>
        </li>
        <li className="flex items-center gap-x-1.5">
          <ReceiptTicketIcon className="size-[18px] stroke-text-1 stroke-[1.5px]" />
          <span className="text-text-1 text-sm opacity-70">{userData.receipt_number}</span>
        </li>
        <li className="flex items-center gap-x-1.5">
          <CalendarIcon className="size-[18px] stroke-text-1 stroke-[2px]" />
          <span className="text-text-1 text-sm opacity-70">{moment(userData.createdAt).format("MMM DD, YYYY")}</span>
        </li>
        <li className="flex items-center gap-x-1.5">
          <CircleAlert className="size-[18px] stroke-text-1 stroke-[2px]" />
          <span className="text-text-1 text-sm opacity-70">{userData.reason}</span>
        </li>
      </ul>
      <Separator className="my-4 bg-text-19" />
      <div className="flex items-center justify-between gap-x-1.5">
        <span className="text-text-1 text-sm opacity-70">Dispute Status</span>
        <DisputeStatus status={userData.status} icon={false} />
      </div>
      <div className="mt-8 flex gap-x-2">
        <Button
          type="button"
          className="w-full py-2 rounded-xl text-base text-text-2 bg-transparent border border-text-2 hover:bg-transparent"
          onClick={internalNoteModal.setTrue}
        >
          Add Internal Note
        </Button>
        <Button
          type="button"
          className="w-full py-2 rounded-xl text-base"
        >
          Mark as Resolved
        </Button>
      </div>

      <InternalNotes state={internalNoteModal} />
    </>
  )
}

export default Info