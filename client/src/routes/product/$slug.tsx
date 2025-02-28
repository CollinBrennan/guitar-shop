import { createFileRoute, notFound } from '@tanstack/react-router'
import { queryClient, trpc } from '../../lib/trpc'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { centsToDollars } from '../../lib/helpers'

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

  type Item = (typeof product.items)[0]

  const [selectedItem, setSelectedItem] = useState<Item | undefined>(
    product.items[0]
  )
  const form = useForm<Record<string, string>>({
    defaultValues: product.items[0].variant,
  })

  const items = variantToItemMap(product)
  const itemIsAvailable = selectedItem?.sku !== undefined
  const itemPrice = itemIsAvailable
    ? centsToDollars(selectedItem.price)
    : 'Out of stock.'

  function handleChange() {
    const variant = sortStringify(form.getValues())
    setSelectedItem(items[variant])
  }

  const handleSubmit = form.handleSubmit(() => console.log(selectedItem))

  return (
    <main className="">
      <section className="pt-16 px-16 flex w-full gap-8">
        <div className="w-1/2">
          <img src={product.imageUrl || undefined} alt={product.name} />
        </div>
        <div className="w-1/2 flex flex-col gap-4">
          <h1 className="font-bold text-5xl">{product.name}</h1>
          <p>{product.description}</p>
          <p className="pt-8 text-4xl font-bold">{itemPrice}</p>
          <form
            onSubmit={handleSubmit}
            onChange={handleChange}
            className="flex flex-col gap-8 pt-8"
          >
            {product.variantFields &&
              Object.entries(product.variantFields).map(
                ([field, fieldData]) => (
                  <div>
                    {product.variantFields && (
                      <div>
                        {fieldData.name + ': '}
                        <span className="font-bold">
                          {
                            product.variantFields[field].options[
                              form.getValues(field)
                            ].name
                          }
                        </span>
                      </div>
                    )}
                    <div className="flex gap-2">
                      {Object.entries(fieldData.options).map(
                        ([option, optionData]) => (
                          <div className="relative flex">
                            <input
                              id={`${field}-${option}`}
                              type="radio"
                              value={option}
                              className="absolute size-full appearance-none cursor-pointer rounded-full checked:border-blue-500 checked:border-2"
                              {...form.register(field)}
                            />
                            <label
                              htmlFor={`${field}-${option}`}
                              className="flex items-center justify-between"
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
                  </div>
                )
              )}
            <button
              type="submit"
              disabled={!itemIsAvailable}
              className="mt-8 bg-black text-white py-2 disabled:bg-neutral-500 cursor-pointer disabled:cursor-default"
            >
              {itemIsAvailable ? 'Add to cart' : 'Out of stock'}
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

// sort keys of object before stringifying so we can safely use them as keys
function sortStringify(obj: Object) {
  return JSON.stringify(obj, Object.keys(obj).sort())
}

function variantToItemMap<
  T extends { variant: Record<string, string> },
>(product: { items: T[] }): Record<string, T> {
  return product.items.reduce(
    (record, item) => ({ ...record, [sortStringify(item.variant)]: item }),
    {} as Record<string, T>
  )
}
