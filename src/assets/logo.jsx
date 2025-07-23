import Img from "@/components/common/Img";
import { LOGO } from "@/constants/images";
import { cn } from "@/lib/utils";

const Logo = ({ className, ...rest }) => (
  <Img
    src={LOGO}
    className={cn("w-[65px] aspect-square rounded-xl", className)}
    alt="pinoyaya"
    {...rest}
  />
);
export default Logo;
