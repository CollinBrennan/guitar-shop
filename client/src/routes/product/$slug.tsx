import { createFileRoute, notFound } from '@tanstack/react-router'
import { queryClient, trpc } from '../../lib/trpc'

export const Route = createFileRoute('/product/$slug')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const productQueryOptions = trpc.product.get.queryOptions(params.slug)
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
    <main className="">
      <section className="px-16 flex w-full gap-8">
        <div className="w-1/2">
          <img src={product.imageUrl || undefined} alt={product.name} />
        </div>
        <div className="w-1/2">
          <h1 className="font-bold text-2xl">{product.name}</h1>
          <p>{product.description}</p>
          <div className="flex gap-2">
            {product.items.map((item) => (
              <div className="relative flex flex-col">
                <input
                  id={item.sku}
                  type="radio"
                  name={'item'}
                  value={item.sku}
                  className="absolute size-full appearance-none border cursor-pointer border-muted rounded-full checked:border-blue-500 checked:border-2"
                />
                <label
                  htmlFor={item.sku}
                  className="flex items-center justify-between gap-8 px-2 pr-4 py-2"
                >
                  <div className="flex gap-2 items-center">
                    {item.color && (
                      <div
                        className="size-5 rounded-full aspect-square border border-neutral-300"
                        style={{ backgroundColor: item.color }}
                      />
                    )}
                    <div className="text-sm">{item.label}</div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
