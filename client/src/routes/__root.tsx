import {
  Outlet,
  createRootRoute,
  useLocation,
  useMatchRoute,
} from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../lib/trpc'
import { CartProvider } from '../context/cart'
import Navbar from '../components/navbar'

export const Route = createRootRoute({
  component: RootComponent,
})

const hideNavRoutes = ['/design/$slug']

function RootComponent() {
  const matchRoute = useMatchRoute()

  const shouldHideNav = hideNavRoutes.some((route) => matchRoute({ to: route }))

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="flex flex-col">
          {!shouldHideNav && <Navbar />}
          <Outlet />
        </div>
      </CartProvider>
    </QueryClientProvider>
  )
}
