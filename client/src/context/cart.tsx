import { createContext, PropsWithChildren, useState } from 'react'
import { type CartItems } from '@server/schema/checkout.schema'
import { CustomChoices } from '@/server/schema/item.schema'
import { sortStringify } from '../lib/helpers'

type CartProviderValue = {
  items: CartItems
  incrementCart: (itemSku: string, customChoices: CustomChoices) => void
}

export const CartContext = createContext({} as CartProviderValue)

export function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState({} as CartItems)

  function incrementCart(itemSku: string, customChoices: CustomChoices) {
    setItems((prev) => {
      const customChoicesString = sortStringify(customChoices)
      // add custom choices to sku so it's unique in the cart record
      const sku = `${itemSku},${customChoicesString}`
      const quantity = (prev[sku]?.quantity || 0) + 1
      return {
        ...prev,
        [sku]: { quantity, customChoices },
      }
    })
  }

  return (
    <CartContext.Provider value={{ items, incrementCart }}>
      {children}
    </CartContext.Provider>
  )
}
