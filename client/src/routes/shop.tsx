import { createFileRoute, Link } from '@tanstack/react-router'
import { centsToDollarsRounded } from '../lib/helpers'
import { trpc } from '../lib/trpc'
import { useQuery } from '@tanstack/react-query'
import PageContainer from '../components/page-container'

export const Route = createFileRoute('/shop')({
  component: AboutComponent,
})

function AboutComponent() {
  const productQuery = useQuery(trpc.product.list.queryOptions())

  return (
    <PageContainer title="Shop">
      <div className="grid grid-cols-4 gap-4">
        {productQuery.data?.map((product) => (
          <Link to="/product/$slug" params={{ slug: product.slug }}>
            <img
              src={product.imageUrl || ''}
              alt={product.name}
              className="w-full aspect-square object-contain bg-neutral-200"
            />
            <h3 className="font-bold">{product.name}</h3>
            <p className="text-muted leading-4">
              {product.price && centsToDollarsRounded(product.price)}
            </p>
          </Link>
        ))}
      </div>
    </PageContainer>
  )
}
