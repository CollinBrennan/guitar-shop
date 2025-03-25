import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import PageContainer from '../components/page-container'
import { queryClient, trpc } from '../lib/trpc'
import {
  centsToDollars,
  centsToDollarsCustom,
  createCustomProductPrice,
  getCustomChoicesFromParams,
  stripCustomChoices,
} from '../lib/helpers'
import { PencilSimple } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import {
  customChoicesSchema,
  CustomProduct,
} from '@/server/schema/custom-product.schema'
import { zodValidator } from '@tanstack/zod-adapter'
import { useCart } from '../context/cart'

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
  validateSearch: zodValidator(customChoicesSchema),
  notFoundComponent: () => <p>Product not found.</p>,
})

function RouteComponent() {
  const product = Route.useLoaderData()

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

            <CustomProductForm product={product} />

            <p>{product.description}</p>
            <div className="flex flex-col gap-2">
              {product.specs.length > 0 && (
                <>
                  <h2 className="font-bold text-2xl">Specs</h2>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2">
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

type CustomProductFormProps = {
  product: CustomProduct
}

function CustomProductForm({ product }: CustomProductFormProps) {
  const cart = useCart()
  const { slug } = Route.useParams()
  const params = Route.useSearch()

  const form = useForm({
    defaultValues: getCustomChoicesFromParams(product, params),
  })

  const customChoices = form.watch()
  const price = centsToDollarsCustom(
    product.price,
    product.customFields,
    customChoices
  )

  const handleSubmit = form.handleSubmit((data) => {
    cart.incrementCustomItem(product, data)
  })

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <p className="font-display text-4xl uppercase">{price}</p>

      <div className="grid grid-cols-2 gap-x-8 gap-y-2 w-full">
        {Object.entries(customChoices).map(([field, choice]) => (
          <>
            <h3 className="font-bold">{product.customFields[field]?.name}</h3>
            <p>{product.customFields[field]?.options[choice]?.name}</p>
          </>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <Link
          to="/design/$slug"
          params={{ slug }}
          search={stripCustomChoices(product, form.getValues())}
          className="w-full flex justify-center items-center gap-2 font-display uppercase py-2 text-black bg-linear-to-r from-pink-100 to-cyan-100 disabled:opacity-50 enabled:cursor-pointer"
        >
          <span>Edit your {product.model}</span>
          <PencilSimple size={16} />
        </Link>
        <button
          type="submit"
          className="w-full font-display uppercase py-2 text-secondary bg-secondary-bg disabled:opacity-50 enabled:cursor-pointer"
        >
          Add to cart
        </button>
      </div>
    </form>
  )
}
