import type Stripe from 'stripe'
import type { ItemsRecord, ItemWithProduct } from '../actions/item.actions.ts'
import type { CartItems } from '../schema/checkout.schema.ts'
import type { CustomChoices, CustomFields } from '../schema/item.schema.ts'

export function lineItemsFromCart(cartItems: CartItems, items: ItemsRecord) {
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = []

  for (let [cartItemSku, cartItem] of Object.entries(cartItems)) {
    const sku = skuFromCartItemSku(cartItemSku)
    const item = items[sku]

    if (!item) throw new Error('Invalid cart item')

    const price = item.customFields
      ? priceFromCustomChoices(
          item.price,
          cartItem.customChoices,
          item.customFields
        )
      : item.price

    const lineItem = {
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

    lineItems.push(lineItem)
  }

  return lineItems
}

function priceFromCustomChoices(
  basePrice: number,
  customChoices: CustomChoices,
  customFields: CustomFields
) {
  let price = basePrice

  for (let [field, fieldData] of Object.entries(customFields)) {
    const choice = customChoices[field]
    if (!choice) throw new Error('Invalid custom item choices')

    const option = fieldData.options[choice]
    if (!option) throw new Error('Invalid custom item options')

    price += option.fee
  }

  return price
}

// remove custom choices from cart item sku
// ex. 'GUITAR-BLUE,{bodyWood: 'alder'} -> 'GUITAR_BLUE'
export function skuFromCartItemSku(cartItemSku: string) {
  const sku = cartItemSku.split(',')[0] || ''
  return sku
}
