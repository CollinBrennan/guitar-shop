import { createContext, PropsWithChildren, useContext, useRef } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import type { Cart } from '@server/schema/checkout.schema'
import type {
  ItemWithProductRecord,
  ItemWithProduct,
} from '@/server/schema/item.schema'

const CartContext = createContext<
  ReturnType<typeof createCartContext> | undefined
>(undefined)

function createCartContext() {
  const form = useForm<Cart>({
    defaultValues: { items: [], customItems: [] },
  })

  const itemData = useRef<ItemWithProductRecord>({})

  const itemsFieldArray = useFieldArray({
    control: form.control,
    name: 'items',
  })

  const cartItems = form.watch()

  function incrementItem(item: ItemWithProduct, increment: number) {
    const index = cartItems.items.findIndex((field) => field.sku === item.sku)
    const prev = cartItems.items[index]

    if (prev)
      form.setValue(`items.${index}.quantity`, prev.quantity + increment)
    else {
      itemData.current[item.sku] = item
      itemsFieldArray.append({ sku: item.sku, quantity: increment })
    }
  }

  return { form, cartItems, itemsFieldArray, itemData, incrementItem }
}

export function CartProvider({ children }: PropsWithChildren) {
  const context = createCartContext()

  return <CartContext.Provider value={context}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')

  return context
}
