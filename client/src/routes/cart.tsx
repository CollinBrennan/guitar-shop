import { createFileRoute } from '@tanstack/react-router'
import { useContext } from 'react'
import { CartContext } from '../context/cart'

export const Route = createFileRoute('/cart')({
  component: RouteComponent,
})

function RouteComponent() {
  const cart = useContext(CartContext)
  return <div>{JSON.stringify(cart.cart)}</div>
}
