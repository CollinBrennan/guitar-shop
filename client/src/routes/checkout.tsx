import { createFileRoute } from '@tanstack/react-router'
import { useContext } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js'
import { trpc } from '../lib/trpc'
import { useMutation } from '@tanstack/react-query'
import { CartContext } from '../context/cart'

export const Route = createFileRoute('/checkout')({
  component: RouteComponent,
})

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

function RouteComponent() {
  const cart = useContext(CartContext)
  const { mutateAsync } = useMutation(trpc.checkout.create.mutationOptions())

  const fetchClientSecret = async () => {
    const result = await mutateAsync(cart.items)
    if (!result) throw new Error('Client secret is invalid')

    return result
  }

  const options = { fetchClientSecret }

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
