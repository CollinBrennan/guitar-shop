import { createFileRoute, notFound } from '@tanstack/react-router'
import GuitarBuildForm from '../../components/guitar-build-form'
import { queryClient, trpc } from '../../lib/trpc'

export const Route = createFileRoute('/product/custom-guitar')({
  component: RouteComponent,
  loader: async () => {
    const productQueryOptions = trpc.product.get.queryOptions('custom-guitar')
    const product = await queryClient.ensureQueryData(productQueryOptions)
    if (!product) throw notFound()
    return product
  },
  notFoundComponent: () => {
    return <p>Product not found.</p>
  },
})

function RouteComponent() {
  return <div></div>
}
