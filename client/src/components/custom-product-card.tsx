import { Link } from '@tanstack/react-router'
import { centsToDollarsRounded } from '../lib/helpers'
import { CustomProduct } from '@/server/schema/custom-product.schema'

type Props = {
  product: CustomProduct
}

export default function CustomProductCard({ product }: Props) {
  return (
    <Link to="/custom/$slug" params={{ slug: product.slug }}>
      <div className="bg-muted-bg w-full aspect-square rounded-2xl">
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
      <p>From {centsToDollarsRounded(product.price)}</p>
    </Link>
  )
}
