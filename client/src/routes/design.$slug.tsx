import { createFileRoute, notFound } from '@tanstack/react-router'
import { queryClient, trpc } from '../lib/trpc'
import PageContainer from '../components/page-container'

export const Route = createFileRoute('/design/$slug')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const productQueryOptions = trpc.customProduct.getBySlug.queryOptions(
      params.slug
    )
    const product = await queryClient.ensureQueryData(productQueryOptions)
    if (!product) throw notFound()

    return product
  },
  notFoundComponent: () => <p>Product not found.</p>,
})

function RouteComponent() {
  const product = Route.useLoaderData()

  return (
    <PageContainer
      heading={`design your ${product.model}`}
      backButton={{ label: 'continue shopping', to: '/guitars' }}
    ></PageContainer>
  )
}
