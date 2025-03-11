import { createFileRoute } from '@tanstack/react-router'
import { trpc } from '../lib/trpc'
import { useQuery } from '@tanstack/react-query'
import PageContainer from '../components/page-container'
import ProductCard from '../components/product-card'

export const Route = createFileRoute('/guitars')({
  component: AboutComponent,
})

function AboutComponent() {
  const productQuery = useQuery(trpc.product.list.queryOptions())

  return (
    <PageContainer heading="Guitars">
      <div className="flex gap-12">
        {['all', 'series s', 'series t'].map((category) => (
          <div className="font-display uppercase tracking-widest text-muted">
            {category}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4 pt-4">
        {productQuery.data?.map((product) => <ProductCard product={product} />)}
      </div>
    </PageContainer>
  )
}
