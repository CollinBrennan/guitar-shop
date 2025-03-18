import { Product } from '@/server/schema/product.schema'
import { Link } from '@tanstack/react-router'
import { centsToDollarsRounded } from '../lib/helpers'

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  return (
    <Link to="/product/$slug" params={{ slug: product.slug }}>
      <div className="bg-muted-bg w-full aspect-square">
        <img
          src={product.imageUrl || ''}
          alt={product.name}
          className="w-full aspect-square object-contain p-8"
        />
      </div>
      <p className="font-display uppercase font-muted text-xs pt-1 tracking-widest text-muted">
        {product.category}
      </p>
      <h2 className="font-display text-2xl uppercase font-bold leading-6 line-clamp-2 h-12">
        {product.name}
      </h2>
      <p>{product.price && centsToDollarsRounded(product.price)}</p>
    </Link>
  )
}
