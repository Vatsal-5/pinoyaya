import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

// 0 - Rejected
// 1 - Pending
// 2 - Approved

const ReviewStatus = ({ status, icon = true }) => {
  const isRejected = status === 0;
  const isPending = status === 1;
  const isApproved = status === 2;
  return (
    <Badge
      variant="secondary"
      className={cn(
        "rounded-full",
        isRejected && "text-text-7 bg-text-17",
        isPending && "text-text-12 bg-text-16",
        isApproved && "text-text-21 bg-text-22"
      )}
    >
      {icon ? (
        <span>
          {isApproved && "✅"}
        </span>
      ) : null}
      {isRejected && "Rejected"}
      {isPending && "Pending"}
      {isApproved && "Approved"}
    </Badge>
  );
};

export default ReviewStatus;