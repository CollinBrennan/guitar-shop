import { createFileRoute, Link } from '@tanstack/react-router'
import { useContext } from 'react'
import { CartContext } from '../context/cart'
import PageContainer from '../components/page-container'

export const Route = createFileRoute('/cart')({
  component: RouteComponent,
})

function RouteComponent() {
  const cart = useContext(CartContext)

  return (
    <PageContainer
      heading="Shopping Cart"
      backButton={{ label: 'Continue shopping', to: '/shop' }}
    >
      <pre>{JSON.stringify(cart, null, 2)}</pre>

      <Link to="/checkout">Checkout</Link>
    </PageContainer>
  )
}
