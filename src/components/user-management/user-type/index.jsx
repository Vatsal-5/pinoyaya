import { ROLES } from '@/constants/common'
import { cn } from '@/lib/utils'

const UserType = ({ role }) => {
  return (
    <div className="flex items-center gap-x-1">
      <div className={cn("size-[10px] rounded-full", ROLES.at(0) === role ? "bg-text-2" : "bg-text-7")} />
      <span className="text-xs text-text-1 font-medium">
        {role}
      </span>
    </div>
  )
}

export default UserType