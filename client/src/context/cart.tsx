import { createContext, PropsWithChildren, useState } from 'react'
import { type CartItems } from '@server/schema/checkout.schema'
import { sortStringify } from '../lib/helpers'
import { Item } from '@/server/schema/item.schema'

type CartProviderValue = {
  cartItems: CartItems
  incrementItem: (item: Item, increment: number) => void
}

export const CartContext = createContext({} as CartProviderValue)

export function CartProvider({ children }: PropsWithChildren) {
  const [cartItems, setCartItems] = useState({
    items: {},
    customItems: [],
  } as CartItems)

  function incrementItem(item: Item, increment: number) {
    setCartItems((prev) => {
      const quantity = (prev.items[item.sku]?.quantity || 0) + increment
      return {
        items: { ...prev.items, [item.sku]: { quantity } },
        customItems: prev.customItems,
      }
    })
  }

  return (
    <CartContext.Provider value={{ cartItems, incrementItem }}>
      {children}
    </CartContext.Provider>
  )
}
