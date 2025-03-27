import { createFileRoute, notFound } from '@tanstack/react-router'
import { queryClient, trpc } from '../lib/trpc'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { customChoicesSchema } from '@/server/schema/custom-product.schema'
import { zodValidator } from '@tanstack/zod-adapter'
import {
  centsToDollars,
  centsToDollarsCustom,
  centsToDollarsRounded,
  createCustomProductPrice,
  getCustomChoicesFromParams,
  stripCustomChoices,
} from '../lib/helpers'
import { useState } from 'react'
import Button from '../components/button'

export const Route = createFileRoute('/design/$slug')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const productQueryOptions = trpc.customProduct.getBySlug.queryOptions(
      params.slug
    )
    const product = await queryClient.ensureQueryData(productQueryOptions)
    if (!product) throw notFound()

    return product
  },
  validateSearch: zodValidator(customChoicesSchema),
  notFoundComponent: () => <p>Product not found.</p>,
})

function RouteComponent() {
  const product = Route.useLoaderData()
  const params = Route.useSearch()
  const navigate = Route.useNavigate()

  const [fieldIndex, setFieldIndex] = useState(0)
  const fields = Object.entries(product.customFields)
  const [field, fieldData] = fields[fieldIndex]!

  const defaultValues = getCustomChoicesFromParams(product, params)
  const form = useForm({ defaultValues })
  const customChoices = form.watch()

  const price = centsToDollarsCustom(
    product.price,
    product.customFields,
    customChoices
  )

  function incrementOption() {
    setFieldIndex((prev) => (prev + 1) % fields.length)
  }

  function decrementOption() {
    setFieldIndex((prev) => (prev - 1 + fields.length) % fields.length)
  }

  const handleSubmit = form.handleSubmit((data) =>
    navigate({
      to: '/custom/$slug',
      params: { slug: product.slug },
      search: stripCustomChoices(product, data),
    })
  )

  return (
    <main>
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col h-screen bg-muted-bg"
      >
        <div className="absolute w-full flex justify-between py-12 px-12">
          <div>
            <h1 className="font-display-l uppercase text-5xl">
              Design your {product.model}
            </h1>
            <h2 className="font-display text-3xl">{price}</h2>
          </div>
          <div>
            <Button
              type="submit"
              className="font-display uppercase py-2 px-8 text-secondary bg-secondary-bg disabled:opacity-50 enabled:cursor-pointer"
            >
              Finish
            </Button>
          </div>
        </div>
        <div className="flex-1" />
        <div className="h-60 p-8 flex flex-col items-center justify-between bg-white">
          <div className="flex w-80 justify-between items-center">
            <button onClick={decrementOption} type="button">
              <CaretLeft size={24} weight="bold" />
            </button>
            <div className="flex items-center gap-4">
              <h1 className="font-semibold text-2xl">{fieldData.name}</h1>
              <span className="font-display text-muted tracking-widest">
                {fieldIndex + 1}/{fields.length}
              </span>
            </div>
            <button onClick={incrementOption} type="button">
              <CaretRight size={24} weight="bold" />
            </button>
          </div>
          <div className={`flex ${fieldData.isColor ? 'gap-4' : 'gap-2'}`}>
            {Object.entries(fieldData.options).map(([option, optionData]) => (
              <div key={option} className="group relative flex">
                <input
                  id={`${field}-${option}`}
                  type="radio"
                  value={option}
                  className="absolute size-full appearance-none cursor-pointer peer"
                  {...form.register(field)}
                />
                <label
                  htmlFor={`${field}-${option}`}
                  style={{
                    backgroundColor: fieldData.isColor ? optionData.color : '',
                  }}
                  className={
                    fieldData.isColor
                      ? 'rounded-full border border-primary/20 size-8 aspect-square outline-offset-4 outline-black peer-checked:*:block peer-checked:outline'
                      : 'border border-primary/20 px-8 py-2 rounded-full peer-checked:border-black'
                  }
                >
                  <span
                    className={
                      fieldData.isColor
                        ? 'absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-8 hidden'
                        : 'flex justify-between gap-4'
                    }
                  >
                    <span>{optionData.name}</span>
                    {optionData.fee > 0 && (
                      <span>+{centsToDollarsRounded(optionData.fee)}</span>
                    )}
                  </span>
                </label>
              </div>
            ))}
          </div>
          <div />
        </div>
      </form>
    </main>
  )
}
