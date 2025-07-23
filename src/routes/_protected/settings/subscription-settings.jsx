import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_protected/settings/subscription-settings',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <></>
}
