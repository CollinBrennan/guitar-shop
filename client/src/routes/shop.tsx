import { createFileRoute, Link } from '@tanstack/react-router'
import { centsToDollarsRounded } from '../lib/helpers'
import { trpc } from '../lib/trpc'
import { useQuery } from '@tanstack/react-query'
import PageContainer from '../components/page-container'
import ProductCard from '../components/product-card'

export const Route = createFileRoute('/shop')({
  component: AboutComponent,
})

function AboutComponent() {
  const productQuery = useQuery(trpc.product.list.queryOptions())

  return (
    <PageContainer heading="Shop">
      <div className="flex gap-12">
        {['all', 'parts', 'gear', 'apparel'].map((category) => (
          <div className="font-display uppercase tracking-widest text-muted">
            {category}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-2 pt-4">
        {productQuery.data?.map((product) => <ProductCard product={product} />)}
      </div>
    </PageContainer>
  )
}
