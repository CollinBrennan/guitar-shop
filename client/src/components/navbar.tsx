import { ShoppingCart } from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'

const links = [
  { name: 'Custom', to: '/custom' },
  { name: 'Shop', to: '/shop' },
  { name: 'Contact', to: '/contact' },
]

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-16 py-8">
      <div>
        <Link
          to="/"
          activeOptions={{ exact: true }}
          className="font-pacifico text-2xl"
        >
          Guitar Shop
        </Link>
      </div>
      <ul className="flex items-center gap-16">
        {links.map((link) => (
          <li>
            <Link
              to={link.to}
              activeProps={{
                className: 'text-neutral-900',
              }}
              className="font-bold text-muted"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="flex items-center gap-8">
        <li>
          <button>Sign in</button>
        </li>
        <li>
          <Link to="/cart">
            <ShoppingCart size={24} />
          </Link>
        </li>
      </ul>
    </nav>
  )
}
