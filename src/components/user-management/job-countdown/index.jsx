import { Badge } from "@/components/ui/badge"
import moment from "moment"

const JobCountDown = ({ time }) => {
  return (
    <Badge
      variant="secondary"
      className="rounded-full text-xs text-text-7 bg-text-17"
    >
      ⚡{moment(time).format("HH:MM:SS")}s
    </Badge>
  )
}

export default JobCountDown