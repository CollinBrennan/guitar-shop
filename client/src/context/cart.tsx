import { createContext, PropsWithChildren, useState } from 'react'
import { type CartItems } from '@server/schema/checkout.schema'

type CartProviderValue = {
  items: CartItems
  incrementCart: (itemSku: string) => void
}

export const CartContext = createContext({} as CartProviderValue)

export function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState({} as CartItems)

  function incrementCart(itemSku: string) {
    setItems((prev) => {
      const quantity = (prev[itemSku]?.quantity || 0) + 1
      return { ...prev, [itemSku]: { quantity } }
    })
  }

  return (
    <CartContext.Provider value={{ items, incrementCart }}>
      {children}
    </CartContext.Provider>
  )
}
