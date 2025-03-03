import type { ItemsRecord } from '../actions/item.actions.ts'
import type { CartItems } from '../schema/checkout.schema.ts'
import type { CustomChoices, CustomFields } from '../schema/item.schema.ts'

export function lineItemsFromCart(cartItems: CartItems, items: ItemsRecord) {
  const lineItems = Object.entries(cartItems).map(([cartItemSku, cartItem]) => {
    const sku = skuFromCartItemSku(cartItemSku)
    const item = items[sku]

    if (!item) throw new Error(`Invalid item SKU: '${sku}'`)

    const price = item.customFields
      ? priceFromCustomChoices(
          item.price,
          cartItem.customChoices,
          item.customFields
        )
      : item.price

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

function priceFromCustomChoices(
  basePrice: number,
  customChoices: CustomChoices,
  customFields: CustomFields
) {
  const entries = Object.entries(customFields)
  const price = entries.reduce((acc, [field, fieldData]) => {
    const choice = customChoices[field]
    if (!choice) throw new Error(`Missing custom item choice: ${field}`)

    const option = fieldData.options[choice]
    if (!option)
      throw new Error(`Invalid custom item choice for '${field}': ${choice}`)

    return acc + option.fee
  }, basePrice)

  return price
}

// remove custom choices from cart item sku
// ex. 'GUITAR-BLUE,{bodyWood: 'alder'} -> 'GUITAR_BLUE'
export function skuFromCartItemSku(cartItemSku: string) {
  const sku = cartItemSku.split(',')[0] || ''
  return sku
}
