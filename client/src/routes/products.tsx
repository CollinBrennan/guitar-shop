import { createFileRoute, Link } from '@tanstack/react-router'
import { centsToDollars } from '../lib/helpers'
import { trpc } from '../lib/trpc'
import { useQuery } from '@tanstack/react-query'
export const Route = createFileRoute('/products')({
  component: AboutComponent,
})

function AboutComponent() {
  const productQuery = useQuery(trpc.product.list.queryOptions())

  return (
    <main className="px-16">
      <section>
        <h1 className="font-bold text-2xl">Products</h1>
        <div className="grid grid-cols-3">
          {productQuery.data?.map((product) => (
            <Link to="/product/$slug" params={{ slug: product.slug }}>
              <img
                src={product.imageUrl || ''}
                alt={product.name}
                className="size-48 object-contain"
              />
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-muted">
                {product.price && centsToDollars(product.price)}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
