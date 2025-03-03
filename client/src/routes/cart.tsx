import { createFileRoute, Link } from '@tanstack/react-router'
import { useContext } from 'react'
import { CartContext } from '../context/cart'

export const Route = createFileRoute('/cart')({
  component: RouteComponent,
})

function RouteComponent() {
  const cart = useContext(CartContext)
  return (
    <div>
      <pre>{JSON.stringify(cart.items, null, 2)}</pre>

      <Link to="/checkout">Checkout</Link>
    </div>
  )
}
