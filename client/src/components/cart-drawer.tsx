import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { ShoppingCart, X } from '@phosphor-icons/react'
import { useState } from 'react'
import { useCart } from '../context/cart'
import { centsToDollars } from '../lib/helpers'
import { Link } from '@tanstack/react-router'
import { ItemWithProduct } from '@/server/schema/item.schema'
import { UseFormRegisterReturn } from 'react-hook-form'
import {
  CustomChoices,
  CustomProduct,
} from '@/server/schema/custom-product.schema'

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <ShoppingCart size={24} />
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        <div className="fixed inset-0 flex w-screen items-center justify-end">
          <DialogPanel className="flex flex-col gap-8 w-xs h-screen bg-white p-4">
            <div className="flex flex-col">
              <button onClick={() => setIsOpen(false)} className="self-end">
                <X size={24} />
              </button>
              <DialogTitle className="font-bold font-display-l uppercase text-4xl">
                Your cart
              </DialogTitle>
            </div>

            <CartItemForm setIsOpen={setIsOpen} />
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

type CartItemFormProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function CartItemForm({ setIsOpen }: CartItemFormProps) {
  const {
    form,
    cartItems,
    itemsFieldArray,
    customItemsFieldArray,
    itemData,
    customProductData,
  } = useCart()

  const onSubmit = form.handleSubmit((data) => {
    console.log(data)
  })

  const items = cartItems.items
  const customItems = cartItems.customItems

  const itemSubtotal = items.reduce((subtotal, item) => {
    const data = itemData.current[item.sku]
    return subtotal + (data ? data.price * item.quantity : 0)
  }, 0)
  const customItemSubtotal = customItems.reduce((subtotal, item) => {
    const data = customProductData.current[item.sku]
    return subtotal + (data ? data.price : 0)
  }, 0)
  const subtotal = itemSubtotal + customItemSubtotal

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col h-full overflow-y-hidden"
    >
      <div className="flex flex-col gap-8 h-full overflow-y-auto pb-8">
        {items.length === 0 && 'No items in cart.'}
        {items.map((cartItem, index) => {
          const item = itemData.current[cartItem.sku]
          if (!item) return 'Item not found.'

          const price = items[index]
            ? centsToDollars(item.price * items[index].quantity)
            : 'Out of stock'

          return (
            <ItemComponent
              item={item}
              price={price}
              register={form.register(`items.${index}.quantity`, {
                valueAsNumber: true,
              })}
              remove={() => itemsFieldArray.remove(index)}
            />
          )
        })}

        {customItems.map((cartItem, index) => {
          const item = customProductData.current[cartItem.sku]
          if (!item) return 'Item not found.'

          const price = centsToDollars(item.price)

          return (
            <CustomItemComponent
              item={item}
              customChoices={cartItem.customChoices}
              price={price}
              remove={() => customItemsFieldArray.remove(index)}
            />
          )
        })}
      </div>

      <div className="flex flex-col justify-end gap-4">
        <hr className="text-muted" />
        <p className="text-muted">Taxes and shipping calculated at checkout</p>
        <Link
          to="/checkout"
          onClick={() => setIsOpen(false)}
          className="flex justify-center gap-2 w-full font-display uppercase px-8 py-2 text-secondary bg-secondary-bg"
        >
          <span>Checkout</span>
          <span>{centsToDollars(subtotal)}</span>
        </Link>
      </div>
    </form>
  )
}

type ItemComponentProps = {
  item: ItemWithProduct
  price: string
  register: UseFormRegisterReturn
  remove: () => void
}

function ItemComponent({ item, price, register, remove }: ItemComponentProps) {
  return (
    <div key={item.sku} className="flex gap-4">
      <div className="bg-muted-bg size-20 aspect-square" />
      <div className="flex flex-col w-full gap-2">
        <h2 className="font-display uppercase font-bold leading-4">
          {item.product.name}
        </h2>

        <div className="font-display">{price}</div>

        <p className="leading-4 text-muted text-xs uppercase">
          {Object.entries(item.variant).map(([field, choice]) => (
            <span className="not-first:before:content-['_/'] not-first:before:px-1">
              {item.product.variantFields?.[field]?.options[choice]?.name}
            </span>
          ))}
        </p>

        <div className="flex w-full gap-4 items-center">
          <input
            key={item.sku}
            type="number"
            min={1}
            max={99}
            className="w-24 outline-none border border-primary/20 pl-4 pr-2 py-1"
            {...register}
          />
          <button
            type="button"
            onClick={remove}
            className="font-display uppercase text-xs font-bold"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

type CustomItemComponentProps = {
  item: CustomProduct
  customChoices: CustomChoices
  price: string
  remove: () => void
}

function CustomItemComponent({
  item,
  customChoices,
  price,
  remove,
}: CustomItemComponentProps) {
  return (
    <div key={item.sku} className="flex gap-4">
      <div className="bg-muted-bg size-20 aspect-square" />
      <div className="flex flex-col w-full gap-2">
        <h2 className="font-display uppercase font-bold leading-4">
          {item.name}
        </h2>

        <div className="font-display">{price}</div>

        <pre className="leading-4 text-muted text-xs uppercase">
          {JSON.stringify(customChoices, null, 2)}
        </pre>

        <div>
          <button
            type="button"
            onClick={remove}
            className="font-display uppercase text-xs font-bold"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}
