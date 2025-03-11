import { createFileRoute } from '@tanstack/react-router'
import PageContainer from '../components/page-container'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return <PageContainer heading="About us"></PageContainer>
}
