import { createFileRoute, notFound } from '@tanstack/react-router'
import PageContainer from '../components/page-container'
import { queryClient, trpc } from '../lib/trpc'
import { useContext, useState } from 'react'
import { ProductWithItems } from '@/server/schema/product.schema'
import { centsToDollars, sortStringify } from '../lib/helpers'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CartContext } from '../context/cart'
import { Item } from '@/server/schema/item.schema'

export const Route = createFileRoute('/product/$slug')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const productQueryOptions = trpc.product.getWithItemsBySlug.queryOptions(
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

            <ItemForm product={product} />

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

type ItemFormProps = {
  product: ProductWithItems
}

const itemFormSchema = z.object({
  variant: z.record(z.string(), z.string()),
  quantity: z.number().int().positive().max(99),
})

type ItemForm = z.infer<typeof itemFormSchema>

function ItemForm({ product }: ItemFormProps) {
  const cart = useContext(CartContext)

  const [selectedItem, setSelectedItem] = useState(product.items[0])

  const form = useForm<ItemForm>({
    defaultValues: { variant: { ...selectedItem?.variant }, quantity: 1 },
    resolver: zodResolver(itemFormSchema),
  })

  const items = createItemMap(product)
  const itemIsAvailable = selectedItem !== undefined
  const itemPrice = itemIsAvailable
    ? centsToDollars(selectedItem.price)
    : 'Out of stock.'

  function handleChange() {
    const variant = sortStringify(form.getValues().variant)
    setSelectedItem(items[variant])
  }

  const handleSubmit = form.handleSubmit((data) => {
    if (selectedItem) cart.incrementItem(selectedItem, data.quantity)
  })

  return (
    <form
      onChange={handleChange}
      onSubmit={handleSubmit}
      className="flex flex-col gap-8"
    >
      <div className="flex flex-col gap-2">
        <p className="font-display text-4xl uppercase">{itemPrice}</p>

        <div className="flex gap-2">
          <input
            type="number"
            min={1}
            max={99}
            className="w-16 outline-none border-2 px-2 text-center"
            {...form.register('quantity', { valueAsNumber: true })}
          />
          <button
            type="submit"
            disabled={!itemIsAvailable}
            className="font-display uppercase px-8 py-2 text-secondary bg-secondary-bg disabled:opacity-50 enabled:cursor-pointer"
          >
            Add to cart
          </button>
        </div>
      </div>

      {product.variantFields &&
        Object.entries(product.variantFields).map(([field, fieldData]) => (
          <div className="flex flex-col gap-2">
            <h2 className="font-display uppercase font-bold text-2xl">
              {fieldData.name}
            </h2>
            <div className="flex gap-2">
              {Object.entries(fieldData.options).map(([option, optionData]) => (
                <div className="relative flex">
                  <input
                    id={`${field}-${option}`}
                    type="radio"
                    value={option}
                    className="absolute size-full appearance-none cursor-pointer peer"
                    {...form.register(`variant.${field}`)}
                  />
                  <label
                    htmlFor={`${field}-${option}`}
                    style={{ backgroundColor: optionData.color }}
                    className={
                      optionData.color
                        ? 'border-2 size-6 aspect-square rounded-full outline-offset-2 outline-blue-500 peer-checked:outline-2'
                        : 'border-2 px-3 py-1 peer-checked:border-blue-500'
                    }
                  >
                    {!optionData.color && optionData.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
    </form>
  )
}

function createItemMap(product: ProductWithItems): Record<string, Item> {
  return product.items.reduce(
    (map, item) => ({ ...map, [sortStringify(item.variant)]: item }),
    {}
  )
}
