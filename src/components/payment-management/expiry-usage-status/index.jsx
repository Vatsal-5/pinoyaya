import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// 0 - Active
// 1 - Expired
// 2 - Issue
// 3 - Refunded

const index = ({ status }) => {
  const isActive = status === 0
  const isExpired = status === 1
  const isIssue = status === 2
  const isRefunded = status === 3
  return (
    <Badge
      variant="secondary"
      className={cn("rounded-full",
        isActive && "text-text-21 bg-text-22",
        isExpired && "text-[#3E4A72B3] bg-text-17",
        isIssue && "text-text-12 bg-text-16",
        isRefunded && "text-[#3E4A72B3] bg-text-15",
      )}
    >
      {isActive && "Active"}
      {isExpired && "Expired"}
      {isIssue && "Issue"}
      {isRefunded && "Refunded"}
    </Badge>
  )
}

export default index