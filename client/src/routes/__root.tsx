import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../lib/trpc'
import { CartProvider } from '../context/cart'
import Navbar from '../components/navbar'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="h-screen flex flex-col">
          <Navbar />
          <Outlet />
          <TanStackRouterDevtools position="bottom-right" />
        </div>
      </CartProvider>
    </QueryClientProvider>
  )
}
