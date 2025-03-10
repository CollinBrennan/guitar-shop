import { createFileRoute, notFound } from '@tanstack/react-router'
import { queryClient, trpc } from '../../lib/trpc'
import { useForm, UseFormReturn } from 'react-hook-form'
import { useContext, useState } from 'react'
import { centsToDollars, sortStringify } from '../../lib/helpers'
import { CartContext } from '../../context/cart'
import { CustomChoices, Item } from '@/server/schema/item.schema'
import { ProductWithItems } from '@/server/schema/product.schema'

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

  const [selectedItem, setSelectedItem] = useState(product.items[0])

  const customChoicesForm = useForm<CustomChoices>({
    defaultValues: selectedItem?.customDefaultChoices ?? {},
  })

  const itemIsAvailable = selectedItem !== undefined
  const itemPrice = itemIsAvailable
    ? priceFromCustomChoices(selectedItem, customChoicesForm.getValues())
    : 'Out of stock.'

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
          <VariantForm
            product={product}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            customChoicesForm={customChoicesForm}
          />
          <CustomChoicesForm
            form={customChoicesForm}
            selectedItem={selectedItem}
          />
          <button
            form="variant-form"
            type="submit"
            disabled={!itemIsAvailable}
            className="mt-8 bg-black text-white py-2 disabled:bg-neutral-500 cursor-pointer disabled:cursor-default"
          >
            {itemIsAvailable ? 'Add to cart' : 'Out of stock'}
          </button>
        </div>
      </section>
    </main>
  )
}

type VariantFormProps = {
  product: ProductWithItems
  selectedItem: Item | undefined
  setSelectedItem: React.Dispatch<React.SetStateAction<Item | undefined>>
  customChoicesForm: UseFormReturn<CustomChoices>
}

function VariantForm({
  product,
  selectedItem,
  setSelectedItem,
  customChoicesForm,
}: VariantFormProps) {
  const cart = useContext(CartContext)

  const form = useForm<Record<string, string>>({
    defaultValues: selectedItem?.variant,
  })

  const items = variantToItemMap(product)

  function handleChange() {
    const variant = sortStringify(form.getValues())
    setSelectedItem(items[variant])
    customChoicesForm.reset()
  }

  const handleSubmit = form.handleSubmit(() => {
    if (selectedItem) {
      const customChoices = customChoicesForm.getValues()
      cart.incrementCart(selectedItem, customChoices)
    }
  })

  return (
    <form
      id="variant-form"
      onSubmit={handleSubmit}
      onChange={handleChange}
      className="flex flex-col gap-8 pt-8"
    >
      {product.variantFields &&
        Object.entries(product.variantFields).map(([field, fieldData]) => (
          <div>
            <div>
              {fieldData.name + ': '}
              <span className="font-bold">
                {fieldData.options[form.watch(field)]?.name}
              </span>
            </div>
            <div className="flex gap-2">
              {Object.entries(fieldData.options).map(([option, optionData]) => (
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
              ))}
            </div>
          </div>
        ))}
    </form>
  )
}

type CustomChoicesFormProps = {
  selectedItem: Item | undefined
  form: UseFormReturn<CustomChoices>
}

function CustomChoicesForm({ form, selectedItem }: CustomChoicesFormProps) {
  return (
    <form className="flex flex-col gap-8 pt-8">
      {selectedItem?.customFields &&
        Object.entries(selectedItem.customFields).map(([field, fieldData]) => (
          <div>
            <div>
              {fieldData.name + ': '}
              <span className="font-bold">
                {fieldData.options[form.watch(field)]?.name}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {Object.entries(fieldData.options).map(([option, optionData]) => (
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
                    className="flex w-full items-center justify-between"
                  >
                    <div className="text-sm flex justify-between items-center w-full pl-2 pr-4 py-2 rounded-full border border-neutral-300">
                      <div className="flex items-center">
                        {optionData.color && (
                          <div
                            className="size-5 rounded-full"
                            style={{
                              backgroundColor: optionData.color,
                            }}
                          />
                        )}
                        <div className="pl-2">{optionData.name}</div>
                      </div>
                      <div className="text-muted">
                        +{centsToDollars(optionData.fee)}
                      </div>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
    </form>
  )
}

function variantToItemMap<
  T extends { variant: Record<string, string> },
>(product: { items: T[] }): Record<string, T> {
  return product.items.reduce(
    (record, item) => ({ ...record, [sortStringify(item.variant)]: item }),
    {} as Record<string, T>
  )
}

function priceFromCustomChoices(item: Item, choices: CustomChoices) {
  const price = Object.entries(choices).reduce((acc, [field, choice]) => {
    return (acc += item.customFields?.[field]?.options[choice]?.fee || 0)
  }, item.price)

  return centsToDollars(price)
}
