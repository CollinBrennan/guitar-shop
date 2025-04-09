import { createFileRoute, redirect } from '@tanstack/react-router'
import PageContainer from '../components/page-container'
import { useQuery } from '@tanstack/react-query'
import { queryClient, trpc } from '../lib/trpc'

export const Route = createFileRoute('/account')({
  component: RouteComponent,
  loader: async () => {
    const sessionQueryOptions = trpc.session.get.queryOptions()
    const session = await queryClient.ensureQueryData(sessionQueryOptions)

    return session
  },
  onError: () => {
    throw redirect({ href: 'http://localhost:3001/api/auth/signin' })
  },
})

function RouteComponent() {
  const session = Route.useLoaderData()
  return <PageContainer heading="Account">{session.user.name}</PageContainer>
}
