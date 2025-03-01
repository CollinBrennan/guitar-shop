import { createContext, PropsWithChildren, useState } from 'react'
import { type Cart, Choices } from '@server/schema/checkout.schema'

type CartProviderValue = {
  cart: Cart
  incrementCart: (itemSku: string) => void
}

export const CartContext = createContext({} as CartProviderValue)

export function CartProvider({ children }: PropsWithChildren) {
  const [cart, setCart] = useState({} as Cart)

  function incrementCart(itemSku: string) {
    setCart((prev) => {
      const quantity = (prev[itemSku]?.quantity || 0) + 1
      return { ...prev, [itemSku]: { quantity } }
    })
  }

  return (
    <CartContext.Provider value={{ cart, incrementCart }}>
      {children}
    </CartContext.Provider>
  )
}
