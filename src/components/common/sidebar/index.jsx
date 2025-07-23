import {
  AnalyticReportActiveIcon,
  AnalyticReportIcon,
  ContentManagementActiveIcon,
  ContentManagementIcon,
  DashboardActiveIcon,
  DashboardIcon,
  DisputeResolutionActiveIcon,
  DisputeResolutionIcon,
  JobPostActiveIcon,
  JobPostIcon,
  NotificationManagementActiveIcon,
  NotificationManagementIcon,
  PaymentManagementActiveIcon,
  PaymentManagementIcon,
  SettingsActiveIcon,
  SettingsIcon,
  UsersActiveIcon,
  UsersIcon,
} from "@/assets/icons/sidebar";
import Logo from "@/assets/logo";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { PAGINATION } from "@/constants/common";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";

import { Route as DashboardRoute } from "@/routes/_protected/dashboard";
import { Route as UserManagementRoute } from "@/routes/_protected/user-management";
import { Route as JobPostManagementRoute } from "@/routes/_protected/job-post-management";
import { Route as PaymentManagementRoute } from "@/routes/_protected/payment-management";
import { Route as DisputeResolutionRoute } from "@/routes/_protected/dispute-resolution";
import { Route as TrustAndSafetyRoute } from "@/routes/_protected/content-management/trust-and-safety";
import { Route as TermsAndConditionsRoute } from "@/routes/_protected/content-management/terms-and-conditions";
import { Route as PrivacyPolicyRoute } from "@/routes/_protected/content-management/privacy-policy";
import { Route as FaqsRoute } from "@/routes/_protected/content-management/faqs";
import { Route as JobAnalyticsRoute } from "@/routes/_protected/analytics-and-reporting/job-analytics";
import { Route as UserBehaviorRoute } from "@/routes/_protected/analytics-and-reporting/user-behavior";
import { Route as FinancialReportsRoute } from "@/routes/_protected/analytics-and-reporting/financial-reports";
import { Route as NofiticationRoute } from "@/routes/_protected/notification-management/notifications";
import { Route as TemplateRoute } from "@/routes/_protected/notification-management/templates";
import { Route as AdminRolesRoute } from "@/routes/_protected/settings/admin-roles";
import { Route as AdminActivityRoute } from "@/routes/_protected/settings/admin-activity";
import { Route as ReviewsRoute } from "@/routes/_protected/settings/reviews";
import { Route as SubscriptionSettingsRoute } from "@/routes/_protected/settings/subscription-settings";

const Sidebar = () => {
  const navItems = [
    {
      title: "Dashboard",
      path: DashboardRoute.fullPath,
      icon: DashboardIcon,
      activeIcon: DashboardActiveIcon,
    },
    {
      title: "User Management",
      path: UserManagementRoute.fullPath,
      icon: UsersIcon,
      activeIcon: UsersActiveIcon,
      search: PAGINATION,
    },
    {
      title: "Job Post Management",
      path: JobPostManagementRoute.fullPath,
      icon: JobPostIcon,
      activeIcon: JobPostActiveIcon,
      search: PAGINATION,
    },
    {
      title: "Payment Management",
      path: PaymentManagementRoute.fullPath,
      icon: PaymentManagementIcon,
      activeIcon: PaymentManagementActiveIcon,
      search: PAGINATION,
    },
    {
      title: "Dispute Resolution",
      path: DisputeResolutionRoute.fullPath,
      icon: DisputeResolutionIcon,
      activeIcon: DisputeResolutionActiveIcon,
      search: PAGINATION,
    },
    {
      title: "Content Management",
      icon: ContentManagementIcon,
      activeIcon: ContentManagementActiveIcon,
      activeKey: "/content-management/",
      items: [
        {
          title: "Trust and Safety",
          path: TrustAndSafetyRoute.fullPath,
        },
        {
          title: "Terms and Conditions",
          path: TermsAndConditionsRoute.fullPath,
        },
        {
          title: "Privacy Policy",
          path: PrivacyPolicyRoute.fullPath,
        },
        {
          title: "FAQs",
          path: FaqsRoute.fullPath,
        },
      ],
    },
    {
      title: "Analytics and Reporting",
      icon: AnalyticReportIcon,
      activeIcon: AnalyticReportActiveIcon,
      activeKey: "/analytics-and-reporting/",
      items: [
        {
          title: "Job Analytics",
          path: JobAnalyticsRoute.fullPath,
        },
        {
          title: "User Behavior",
          path: UserBehaviorRoute.fullPath,
          search: { tab: "daily-logins" },
        },
        {
          title: "Financial Reports",
          path: FinancialReportsRoute.fullPath,
          search: {
            "revenue-by-tab": "payment-type",
            "revenue-tab": "total",
          },
        },
      ],
    },
    {
      title: "Notifications Management",
      icon: NotificationManagementIcon,
      activeIcon: NotificationManagementActiveIcon,
      activeKey: "/notification-management/",
      items: [
        {
          title: "Notifications",
          path: NofiticationRoute.fullPath,
          search: PAGINATION,
        },
        {
          title: "Templates",
          path: TemplateRoute.fullPath,
          search: PAGINATION,
        },
      ],
    },
    {
      title: "Settings",
      icon: SettingsIcon,
      activeIcon: SettingsActiveIcon,
      activeKey: "/settings/",
      items: [
        {
          title: "Admin Roles",
          path: AdminRolesRoute.fullPath,
          search: PAGINATION,
        },
        {
          title: "Admin Activity",
          path: AdminActivityRoute.fullPath,
          search: { ...PAGINATION, tab: "activity" },
        },
        {
          title: "Reviews",
          path: ReviewsRoute.fullPath,
        },
        {
          title: "Subscription Settings",
          path: SubscriptionSettingsRoute.fullPath,
        },
      ],
    },
  ];

  const {
    location: { pathname },
  } = useRouterState();

  return (
    <SidebarComponent className="px-0 border-none [&>*:first-child]:bg-white">
      <SidebarHeader className="px-0 pt-5 pb-[10px] mx-10 border-text-19 flex border-b">
        <div className="flex items-center gap-x-3">
          <Logo className="w-full max-w-[44px] rounded-lg" />
          <div className="w-full flex flex-col">
            <h3 className="text-text-1 text-lg font-semibold">Pinoyaya</h3>
            <p className="text-text-4 text-xs font-medium">
              Trusted care with ease.
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="ml-10 my-8 overflow-hidden">
        <ScrollArea className="h-full">
          <SidebarGroup className="p-0">
            <SidebarGroupLabel className="h-auto px-0 mb-6 text-text-4">
              MENU
            </SidebarGroupLabel>
            <SidebarMenu className="gap-y-6">
              {navItems.map((item) => {
                const isActive = pathname.includes(item.activeKey);
                return item.items ? (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={isActive}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger
                        asChild
                        className={cn(
                          "h-auto px-0 py-1 rounded-none [&>svg]:size-5 active:bg-transparent hover:bg-transparent data-[state=open]:hover:bg-transparent cursor-pointer",
                          isActive ? "opacity-100" : "opacity-50"
                        )}
                      >
                        <SidebarMenuButton tooltip={item.title}>
                          {isActive ? (
                            <item.activeIcon />
                          ) : (
                            <item.icon className="stroke-text-1 group-data-[status=active]:stroke-transparent group-data-[status=active]:fill-text-1 transition-colors" />
                          )}
                          <span className="text-text-1 text-sm">
                            {item.title}
                          </span>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub className="mx-0 ml-2 px-3">
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                className="hover:bg-transparent active:bg-transparent"
                              >
                                <Link
                                  to={subItem.path}
                                  search={subItem.search}
                                  className="text-text-1 text-[13px] opacity-50 hover:text-text-1 active:text-text-1"
                                  activeOptions={{ includeSearch: false }}
                                  activeProps={{ className: "opacity-100" }}
                                >
                                  {subItem.title}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className={cn(
                        "h-auto px-0 py-1 rounded-none [&>svg]:size-5 hover:bg-transparent active:bg-transparent",
                        "opacity-50"
                      )}
                      tooltip={item.title}
                      asChild
                    >
                      <Link
                        to={item.path}
                        search={item.search}
                        className="font-medium group transition-opacity"
                        activeOptions={{ includeSearch: false }}
                        activeProps={{ className: "opacity-100" }}
                      >
                        {({ isActive }) => {
                          return (
                            <>
                              {isActive ? (
                                <item.activeIcon />
                              ) : (
                                <item.icon className="stroke-text-1 group-data-[status=active]:stroke-transparent group-data-[status=active]:fill-text-1 transition-colors" />
                              )}
                              <span className="text-text-1 text-sm">
                                {item.title}
                              </span>
                            </>
                          );
                        }}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>
    </SidebarComponent>
  );
};

export default Sidebar;
