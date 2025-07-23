import Header from "@/components/common/header";
import Sidebar from "@/components/common/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "18.625rem",
        "--sidebar-width-icon": "5.5rem",
      }}
      className="h-dvh overflow-hidden"
    >
      
      <Sidebar />
      <SidebarInset className="h-full w-[calc(100%-var(--sidebar-width))] bg-text-13 overflow-hidden">
        <Header />
        <ScrollArea className="h-full px-8 flex flex-col overflow-x-hidden overflow-y-auto" viewPortClassName="[&>div:first-child]:!flex">
          <Outlet />
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  );
}
