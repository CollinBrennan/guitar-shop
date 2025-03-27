import { ShoppingCart, UserCircle } from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'
import CartDrawer from './cart-drawer'

const links = [
  { name: 'Guitars', to: '/guitars' },
  { name: 'Shop', to: '/shop' },
  { name: 'About', to: '/about' },
]

export default function Navbar() {
  return (
    <div className="bg-secondary-bg  text-secondary flex w-full px-12 py-4 items-center">
      <Link to="/" className="font-brand text-5xl w-full">
        Canvas Guitars
      </Link>
      <nav className="flex justify-center gap-12 w-full">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="font-display uppercase tracking-widest"
          >
            {link.name}
          </Link>
        ))}
      </nav>
      <div className="flex justify-end items-center gap-4 w-full">
        <Link to="/signin">
          <UserCircle size={24} />
        </Link>
        <CartDrawer />
      </div>
    </div>
  )
}
