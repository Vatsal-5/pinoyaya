import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// 0 - Scheduled
// 1 - Send

const NotificationStatus = ({ status, icon = true }) => {
  const isScheduled = status === 0
  const isSend = status === 1
  return (
    <Badge
      variant="secondary"
      className={cn("rounded-full",
        isScheduled && "text-text-12 bg-text-16",
        isSend && "text-text-21 bg-text-22",
      )}
    >
      {icon ?
        <span>
          {isSend && "✅"}
        </span>
        : null}
      {isScheduled && "Scheduled"}
      {isSend && "Sent"}
    </Badge>
  )
}

export default NotificationStatus