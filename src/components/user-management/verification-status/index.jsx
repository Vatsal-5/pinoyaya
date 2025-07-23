import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// 0 - Rejected
// 1 - Pending
// 2 - Verified

const index = ({ status, icon = true }) => {
  const isRejected = status === 0
  const isPending = status === 1
  const isVerified = status === 2
  return (
    <Badge
      variant="secondary"
      className={cn("rounded-full",
        isRejected && "text-text-1 bg-text-6",
        isPending && "text-text-12 bg-text-16",
        isVerified && "text-text-21 bg-text-22",
      )}
    >
      {icon ?
        <span>
          {isRejected && "❌"}
          {isPending && "⏳"}
          {isVerified && "✅"}
        </span>
        : null}
      {isRejected && "Not Verified"}
      {isPending && "Pending Verification"}
      {isVerified && "Verified"}
    </Badge>
  )
}

export default index