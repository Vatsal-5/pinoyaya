import { cn } from "@/lib/utils"

// 0 Super Admin
// 1 Support Manager

const RoleStatus = ({ status, className }) => {
  const isSuperAdmin = status === 0
  const isSupportManager = status === 1
  return (
    <div className={cn("flex justify-center items-center gap-x-2", className)}>
      <div className={cn("size-2.5 min-w-2.5 rounded-full",
        isSuperAdmin && "bg-text-7",
        isSupportManager && "bg-text-2",
      )} />
      <span className="text-text-1 text-xs">
        {isSuperAdmin && "Super Admin"}
        {isSupportManager && "Support Manager"}
      </span>
    </div>
  )
}

export default RoleStatus