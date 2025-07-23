import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// 0 - In progress
// 1 - Active
// 2 - Completed

const index = ({ status }) => {
  const isInProgress = status === 0
  const isActive = status === 1
  const isCompleted = status === 2
  const isExpired = status === 3
  return (
    <Badge
      variant="secondary"
      className={cn("rounded-full",
        isInProgress && "text-text-12 bg-text-16",
        isActive && "text-text-21 bg-text-22",
        isCompleted && "text-text-2 bg-text-19",
        isExpired && "text-text-12 bg-text-13",
      )}
    >
      {isInProgress && "In Progress"}
      {isActive && "Active"}
      {isCompleted && "Completed"}
      {isExpired && "Expired"}
    </Badge>
  )
}

export default index