import { cn } from "@/lib/utils";
import Img from "../Img";
import { CheckCircle, Flag, User } from "@/assets/icons/user-management";

const UserAvtar = ({
  img,
  fullname,
  isactive,
  isReported = false,
  isVerified = false,
  showRoleIcon = false,
  containerClassName,
  nameClassName
}) => {
  return (
    <div className={cn("flex items-center gap-x-1", containerClassName)}>
      <div className="flex items-center gap-x-2">
        <div className="relative">
          <Img src={img} className="min-w-5 min-h-5 size-5 rounded-full" />
          <div
            className={cn(
              "absolute top-0 right-0 size-1.5 rounded-full",
              isactive ? "bg-text-20" : "bg-text-5"
            )}
          />
        </div>
        <span className={cn("text-xs text-text-1 font-medium flex items-center gap-x-1", nameClassName)}>
          {fullname}
        </span>
      </div>
      <div className="flex items-center gap-x-0.5">
        {isReported && <Flag className="size-3.5 fill-text-7" />}
        {isVerified && <CheckCircle className="size-3 fill-text-12" />}
        {showRoleIcon && <User className="size-3 fill-text-7" />}
      </div>
    </div>
  );
};

export default UserAvtar;
