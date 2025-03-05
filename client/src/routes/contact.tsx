import { createFileRoute } from '@tanstack/react-router'
import PageContainer from '../components/page-container'

export const Route = createFileRoute('/contact')({
  component: RouteComponent,
})

function RouteComponent() {
  return <PageContainer title="Contact"></PageContainer>
}
