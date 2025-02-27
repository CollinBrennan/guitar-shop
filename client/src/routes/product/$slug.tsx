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
  const variantFields = product.variantFields
    ? Object.entries(product.variantFields)
    : null
  return (
    <main className="">
      <section className="px-16 flex w-full gap-8">
        <div className="w-1/2">
          <img src={product.imageUrl || undefined} alt={product.name} />
        </div>
        <div className="w-1/2">
          <h1 className="font-bold text-2xl">{product.name}</h1>
          <p>{product.description}</p>
          <div className="flex flex-col gap-4 pt-8">
            {variantFields &&
              variantFields.map(([field, fieldData]) => (
                <form>
                  <div className="font-bold">{fieldData.name}</div>
                  <div className="flex gap-2">
                    {Object.entries(fieldData.options).map(
                      ([option, optionData]) => (
                        <div className="relative flex">
                          <input
                            id={`${field}-${option}`}
                            type="radio"
                            name={field}
                            value={option}
                            className="absolute size-full appearance-none  cursor-pointer  rounded-full checked:border-blue-500 checked:border-2"
                          />
                          <label
                            htmlFor={`${field}-${option}`}
                            className="flex items-center justify-between "
                          >
                            {optionData.color ? (
                              <div
                                className="size-8 rounded-full aspect-square border border-neutral-300"
                                title={optionData.name}
                                style={{ backgroundColor: optionData.color }}
                              />
                            ) : (
                              <div className="text-sm px-4 py-2 rounded-full border border-neutral-300">
                                {optionData.name}
                              </div>
                            )}
                          </label>
                        </div>
                      )
                    )}
                  </div>
                </form>
              ))}
          </div>
        </div>
      </section>
    </main>
  )
}
