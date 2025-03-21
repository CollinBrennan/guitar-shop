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
    <main className="h-screen bg-muted-bg">
      <div className="w-full flex justify-between items-center py-12 px-12">
        <h1 className="font-display-l uppercase text-5xl">
          Design your {product.model}
        </h1>
        <div>
          <button
            type="submit"
            className="font-display uppercase py-2 px-8 text-secondary bg-secondary-bg disabled:opacity-50 enabled:cursor-pointer"
          >
            Finish
          </button>
        </div>
      </div>
    </main>
  )
}
