import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// 0 - In progress
// 1 - Active

const index = ({ status }) => {
  const isInProgress = status === 0
  const isActive = status === 1
  return (
    <Badge
      variant="secondary"
      className={cn("rounded-full",
        isInProgress && "text-text-12 bg-text-16",
        isActive && "text-text-21 bg-text-22",
      )}
    >
      {isInProgress && "In Progress"}
      {isActive && "Active"}
    </Badge>
  )
}

export default index