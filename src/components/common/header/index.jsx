import { SearchIcon } from "@/assets/icons/common";
import Input from "@/components/common/inputs/input";
import { H3 } from "@/components/ui/Typography";
import { FormProvider, useForm } from "react-hook-form";
import Notification from "./notification";
import Logout from "./logout";
import { useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

const Header = () => {
  const methods = useForm({ defaultValues: { search: "" } });

  const {
    location: { pathname },
  } = useRouterState();

  const headerNames = {
    "trust-and-safety": "Trust and Safety",
    "terms-and-conditions": "Terms and Conditions",
    faqs: "FAQs",
    notifications: "Notifications Management",
    templates: "Notifications Templates",
  };

  const hideSearchbar = ["dashboard", "trust-and-safety", "terms-and-conditions", "privacy-policy", "faqs", "job-analytics", "financial-reports", "user-behavior", "reviews"]

  const routeEndPath = useMemo(() => pathname.split("/").at(-1), [pathname]);

  return (
    <div className="min-h-[75px] mx-8 py-4 sticky top-0 bg-text-13 z-[51] border-b border-text-19">
      <header className="flex items-center justify-between">
        <div className="w-full text-2xl font-medium text-text-1">
          <H3
            text={
              routeEndPath in headerNames
                ? headerNames[routeEndPath]
                : routeEndPath.replaceAll("-", " ")
            }
            className={cn(routeEndPath in headerNames ? "" : "capitalize")}
          />
        </div>
        <div className="w-full flex items-center justify-end gap-x-6">
          {hideSearchbar.includes(routeEndPath) ? null :
            <FormProvider {...methods}>
              <Input
                name="search"
                placeholder="Search..."
                prefix={<SearchIcon className="size-6 stroke-text-1" />}
                containerClassName="w-full max-w-[294px]"
                className="w-full px-4 py-2.5 sm:pl-12 font-medium bg-transparent border-text-1 rounded-full text-base shadow-none placeholder:font-medium"
                prefixContainerClassName="sm:left-3"
              />
            </FormProvider>
          }
          <div className="flex items-center gap-4">
            <Notification />
            <Logout />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
