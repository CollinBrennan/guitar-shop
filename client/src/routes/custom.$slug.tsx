import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import PageContainer from '../components/page-container'
import { queryClient, trpc } from '../lib/trpc'
import { centsToDollars } from '../lib/helpers'

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
    <PageContainer backButton={{ label: 'Continue shopping', to: '/guitars' }}>
      <div className="flex">
        <div className="w-full">
          <div className="bg-muted-bg w-full aspect-square rounded-4xl"></div>
        </div>
        <div className="w-full">
          <div className="flex flex-col gap-8 px-12">
            <h1 className="font-display-l uppercase text-5xl">
              {product.name}
            </h1>

            <div className="flex flex-col gap-2">
              <p className="font-display text-4xl uppercase">
                From {centsToDollars(product.price)}
              </p>
              <Link
                to="/design/$slug"
                params={{ slug }}
                className="w-fit font-display uppercase px-8 py-2 text-secondary bg-secondary-bg disabled:opacity-50 enabled:cursor-pointer"
              >
                Design your {product.model}
              </Link>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-display uppercase font-bold text-2xl">
                Details
              </h2>
              <p>{product.description}</p>
            </div>

            {product.specs.length > 0 && (
              <div className="flex flex-col gap-2">
                <h2 className="font-display uppercase font-bold text-2xl">
                  Specs
                </h2>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 w-fit">
                  {product.specs.map((spec) => (
                    <>
                      <p className="font-bold">{spec.label}</p>
                      <p>{spec.body}</p>
                    </>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
