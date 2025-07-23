import { createFileRoute, Navigate } from '@tanstack/react-router'
import { Route as DashboardRoute } from '@/routes/_protected/dashboard'
export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Navigate to={DashboardRoute.fullPath} />
}
