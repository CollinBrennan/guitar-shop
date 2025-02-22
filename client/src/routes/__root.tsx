import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="h-screen flex flex-col">
      <nav className="flex items-center justify-between px-16 py-8">
        <div>
          <Link to="/" activeOptions={{ exact: true }} className="font-bold">
            Pulse Guitars
          </Link>
        </div>
        <ul className="flex gap-8">
          <li>
            <Link
              to="/products"
              activeProps={{
                className: 'font-bold',
              }}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              activeProps={{
                className: 'font-bold',
              }}
            >
              Cart
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
      {/* <TanStackRouterDevtools position="bottom-right" /> */}
    </div>
  )
}
