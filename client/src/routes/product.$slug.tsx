import { createFileRoute, notFound } from '@tanstack/react-router'
import PageContainer from '../components/page-container'
import { queryClient, trpc } from '../lib/trpc'
import { useState } from 'react'
import { ProductWithItems } from '@/server/schema/product.schema'
import { centsToDollars, sortStringify } from '../lib/helpers'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCart } from '../context/cart'
import { Item } from '@/server/schema/item.schema'
import Button from '../components/button'

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
  const [selectedItem, setSelectedItem] = useState(product.items[0])

  return (
    <PageContainer backButton={{ label: 'Continue shopping', to: '/shop' }}>
      <div className="flex flex-col sm:flex-row gap-12">
        <div className="grid grid-cols-2 w-full h-full gap-2">
          {selectedItem &&
            selectedItem.galleryUrls.map((url) => (
              <div className="bg-muted-bg w-full aspect-square">
                <img
                  src={url}
                  alt={product.name}
                  className="w-full aspect-square object-contain"
                />
              </div>
            ))}
        </div>
        <div className="w-full max-w-160">
          <div className="flex flex-col gap-8">
            <h1 className="font-display-l uppercase text-5xl break-words">
              {product.name}
            </h1>

            <ItemForm
              product={product}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />

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

const itemFormSchema = z.object({
  variant: z.record(z.string(), z.string()),
  quantity: z.number().int().positive().max(99),
})

type ItemFormSchema = z.infer<typeof itemFormSchema>

type ItemFormProps = {
  product: ProductWithItems
  selectedItem: Item | undefined
  setSelectedItem: React.Dispatch<React.SetStateAction<Item | undefined>>
}

function ItemForm({ product, selectedItem, setSelectedItem }: ItemFormProps) {
  const cart = useCart()

  const form = useForm<ItemFormSchema>({
    defaultValues: { variant: { ...selectedItem?.variant }, quantity: 1 },
    resolver: zodResolver(itemFormSchema),
  })

  const variant = form.watch('variant')

  const items = createItemMap(product)
  const itemIsAvailable = selectedItem !== undefined
  const itemPrice = itemIsAvailable
    ? centsToDollars(selectedItem.price)
    : 'Out of stock.'

  function handleChange() {
    setSelectedItem(items[sortStringify(variant)])
  }

  const handleSubmit = form.handleSubmit((data) => {
    if (selectedItem)
      cart.incrementItem({ ...selectedItem, product }, data.quantity)
  })

  return (
    <form
      onChange={handleChange}
      onSubmit={handleSubmit}
      className="flex flex-col gap-8"
    >
      <p className="font-display text-4xl uppercase">{itemPrice}</p>

      {product.variantFields &&
        Object.entries(product.variantFields).map(([field, fieldData]) => (
          <div key={field} className="flex flex-col gap-1">
            <h2 className="font-bold">{fieldData.name}</h2>
            <p>
              {fieldData.isColor && fieldData.options[variant[field]!]?.name}
            </p>
            <div className="flex gap-2">
              {Object.entries(fieldData.options).map(([option, optionData]) => (
                <div key={option} className="relative flex">
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
                      fieldData.isColor
                        ? 'rounded-full border border-primary/20 size-6 aspect-square  outline-offset-3 outline-black peer-checked:outline'
                        : 'border border-primary/20 px-2 py-1 peer-checked:border-black'
                    }
                  >
                    {!optionData.color && optionData.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}

      <input
        type="number"
        min={1}
        max={99}
        className="w-24 py-1 outline-none border border-primary/20 px-4"
        {...form.register('quantity', { valueAsNumber: true })}
      />

      <Button disabled={!itemIsAvailable} type="submit">
        Add to cart
      </Button>
    </form>
  )
}

function createItemMap(product: ProductWithItems): Record<string, Item> {
  return product.items.reduce(
    (map, item) => ({ ...map, [sortStringify(item.variant)]: item }),
    {}
  )
}
