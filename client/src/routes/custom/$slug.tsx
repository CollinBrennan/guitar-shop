import { createFileRoute, notFound } from '@tanstack/react-router'
import PageContainer from '../../components/page-container'
import { queryClient, trpc } from '../../lib/trpc'

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
  notFoundComponent: () => {
    return <p>Product not found.</p>
  },
})

function RouteComponent() {
  const product = Route.useLoaderData()

  return (
    <PageContainer backButton={{ label: 'Continue shopping', to: '/shop' }}>
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
              <p className="font-display text-4xl">$100.00</p>
              <div className="flex gap-2">
                <input
                  type="number"
                  defaultValue={1}
                  min={1}
                  max={99}
                  step={1}
                  className="outline-none border-2 px-2 text-center"
                />
                <button className="font-display uppercase px-8 py-2 text-secondary bg-secondary-bg">
                  Add to cart
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="font-display uppercase font-bold text-2xl">
                Color
              </h2>
              <p>Black</p>
              <div className="flex gap-2">
                {['red', 'blue'].map((color) => (
                  <div
                    style={{ backgroundColor: color }}
                    className="size-6 aspect-square rounded-full"
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="font-display uppercase font-bold text-2xl">
                Size
              </h2>
              <div className="flex gap-2">
                {['6ft', '10ft'].map((size) => (
                  <div className="border-2 px-3 py-1">{size}</div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="font-display uppercase font-bold text-2xl">
                Details
              </h2>
              <p className="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                molestie, ex cursus convallis rhoncus, magna nisi aliquet risus,
                a fermentum lectus magna sed odio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
