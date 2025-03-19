import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import PageContainer from '../components/page-container'
import { queryClient, trpc } from '../lib/trpc'
import { centsToDollars } from '../lib/helpers'
import { PencilSimple } from '@phosphor-icons/react'

export const Route = createFileRoute('/custom/$slug')({
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
  const { slug } = Route.useParams()

  return (
    <PageContainer backButton={{ label: 'Continue shopping', to: '/shop' }}>
      <div className="flex gap-12">
        <div className="w-full">
          <div className="bg-muted-bg w-full aspect-video"></div>
        </div>
        <div className="w-md">
          <div className="flex flex-col gap-8">
            <h1 className="font-display-l uppercase text-5xl">
              {product.name}
            </h1>

            <p className="font-display text-4xl uppercase">
              {centsToDollars(product.price)}
            </p>

            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="w-full space-x-2 font-display uppercase py-2 text-black bg-linear-to-r from-pink-100 to-cyan-100 disabled:opacity-50 enabled:cursor-pointer"
              >
                <span>Edit your {product.model}</span>
                <PencilSimple size={16} className="inline -translate-y-0.5" />
              </button>
              <button
                type="submit"
                className="w-full font-display uppercase py-2 text-secondary bg-secondary-bg disabled:opacity-50 enabled:cursor-pointer"
              >
                Add to cart
              </button>
            </div>

            <p>{product.description}</p>
            <div className="flex flex-col gap-2">
              {product.specs.length > 0 && (
                <>
                  <h2 className="font-bold text-2xl">Specs</h2>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 w-fit">
                    {product.specs.map((spec) => (
                      <>
                        <h3 className="font-bold">{spec.label}</h3>
                        <p>{spec.body}</p>
                      </>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
