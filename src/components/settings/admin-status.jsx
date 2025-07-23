import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// 0 - Deactivated
// 1 - Pending
// 2 - Active

const AdminStatus = ({ status }) => {
  const isDeactivated = status === 0
  const isPending = status === 1
  const isActive = status === 2
  return (
    <Badge
      variant="secondary"
      className={cn("rounded-full",
        isDeactivated && "text-text-7 bg-text-17",
        isPending && "text-text-12 bg-text-16",
        isActive && "text-text-21 bg-text-22",
      )}
    >
      {isDeactivated && "Deactivated"}
      {isPending && "Pending"}
      {isActive && "Active"}
    </Badge>
  )
}

export default AdminStatus