import type { ItemWithProduct } from '../actions/item.actions.ts'
import type { CartItems, Choices } from '../schema/checkout.schema.ts'
import type { OptionFields } from '../schema/item.schema.ts'

export function lineItemsFromCart(cart: CartItems, items: ItemWithProduct[]) {
  const lineItems = items.map((item) => {
    const cartItem = cart[item.sku]
    if (!cartItem) throw new Error('Cart item not found')

    let price = item.price
    if (item.optionFields) {
      if (!cartItem.choices) throw new Error('Custom item choices not provided')

      price = priceFromCustomOptions(
        item.price,
        cartItem.choices,
        item.optionFields as OptionFields
      )
    }

    return {
      price_data: {
        unit_amount: price,
        currency: 'usd',
        product_data: {
          description: item.product.description,
          name: item.product.name,
          images: item.product.imageUrl ? [item.product.imageUrl] : [],
        },
      },
      quantity: cartItem.quantity,
    }
  })

  return lineItems
}

function priceFromCustomOptions(
  basePrice: number,
  choices: Choices,
  optionFields: OptionFields
) {
  let price = basePrice

  for (let [optionFieldName, optionField] of Object.entries(optionFields)) {
    const choice = choices[optionFieldName]
    if (!choice) throw new Error('Invalid custom item choices')

    const option = optionField.options[choice]
    if (!option) throw new Error('Invalid custom item options')

    price += option.fee
  }

  return price
}
