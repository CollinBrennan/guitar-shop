import { createFileRoute } from '@tanstack/react-router'
import { loadStripe } from '@stripe/stripe-js'
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js'
import { trpc } from '../lib/trpc'
import { useMutation } from '@tanstack/react-query'
import { useCart } from '../context/cart'
import PageContainer from '../components/page-container'
import ErrorComponent from '../components/error-component'

export const Route = createFileRoute('/checkout')({
  component: RouteComponent,
  errorComponent: ErrorComponent,
})

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

function RouteComponent() {
  const { cartItems } = useCart()

  if (cartItems.items.length === 0 && cartItems.customItems.length === 0)
    throw Error('Cart is empty')

  const { mutateAsync } = useMutation(trpc.checkout.create.mutationOptions())

  const fetchClientSecret = async () => {
    const result = await mutateAsync(cartItems)
    if (!result) throw Error('Invalid client secret')

    return result
  }

  const options = { fetchClientSecret }

  return (
    <PageContainer heading="Checkout">
      <div id="checkout">
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </PageContainer>
  )
}
