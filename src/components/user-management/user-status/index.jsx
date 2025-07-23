import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// 0 - Inactive
// 1 - Active

const UserStatus = ({ status }) => {
  const isInactive = status === 0
  const isActive = status === 1
  return (
    <Badge
      variant="secondary"
      className={cn("rounded-full",
        isInactive && "text-text-12 bg-text-16",
        isActive && "text-text-21 bg-text-22",
      )}
    >
      {isInactive && "Inactive"}
      {isActive && "Active"}
    </Badge>
  )
}

export default UserStatus