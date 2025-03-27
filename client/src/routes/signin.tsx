import { createFileRoute } from '@tanstack/react-router'
import PageContainer from '../components/page-container'

export const Route = createFileRoute('/signin')({
  component: RouteComponent,
})

function RouteComponent() {
  return <PageContainer heading="Sign in" />
}
