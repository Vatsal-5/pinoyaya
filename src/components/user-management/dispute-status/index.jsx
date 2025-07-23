import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// 0 - Pending
// 1 - Resolved

const DisputeStatus = ({ status, icon = true }) => {
  const isPending = status === 0
  const isResolved = status === 1
  return (
    <Badge
      variant="secondary"
      className={cn("rounded-full",
        isPending && "text-text-12 bg-text-16",
        isResolved && "text-text-21 bg-text-22",
      )}
    >
      {isPending && `${icon ? '🟡' : ''} Pending`}
      {isResolved && `${icon ? '✅' : ''} Resolved`}
    </Badge>
  )
}

export default DisputeStatus