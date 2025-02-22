import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ProductData } from '../../../types'
import { centsToDollars } from '../lib/helpers'

export const Route = createFileRoute('/products')({
  component: AboutComponent,
})

function AboutComponent() {
  const [products, setProducts] = useState<ProductData[]>([])

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('/api/product')
      const json = await res.json()
      setProducts(json.products)
    }

    fetchProducts()
  })

  return (
    <main className="px-16">
      <section>
        <h1 className="font-bold text-2xl">Products</h1>
        <div className="grid grid-cols-3 bg-pink-100">
          {products.map((product) => (
            <div>
              <img
                src={product.images[0]}
                alt={product.name}
                className="size-48 object-contain"
              />
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-muted">
                {product.price && centsToDollars(product.price)}
              </p>
              <p>{product.id}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
