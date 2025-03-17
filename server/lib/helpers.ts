import type { Cart } from '../schema/checkout.schema.ts'
import type {
  ItemWithProduct,
  ItemWithProductRecord,
} from '../schema/item.schema.ts'

export function lineItemsFromCart(
  cartItems: Cart,
  itemData: ItemWithProductRecord
) {
  const lineItems = cartItems.items.map((cartItem) => {
    const item = itemData[cartItem.sku]

    if (!item) throw new Error(`Invalid item SKU: '${cartItem.sku}'`)

    return {
      price_data: {
        unit_amount: item.price,
        currency: 'usd',
        product_data: {
          description: createItemDescription(item),
          name: item.product.name,
          images: item.product.imageUrl ? [item.product.imageUrl] : [],
        },
      },
      adjustable_quantity: {
        enabled: true,
        minimum: 0,
        maximum: 99,
      },
      quantity: cartItem.quantity,
    }
  })

  return lineItems
}

function createItemDescription(item: ItemWithProduct) {
  const entries = Object.entries(item.variant)

  const description = entries.reduce((acc, [field, choice]) => {
    const choiceData = item.product.variantFields?.[field]?.options[choice]
    if (!choiceData) return acc

    const choiceName = choiceData.name

    return `${acc}${acc === '' ? choiceName : ` / ${choiceName}`}`
  }, '')

  return description || undefined
}

// function priceFromCustomChoices(
//   basePrice: number,
//   customChoices: CustomChoices,
//   customFields: CustomFields
// ) {
//   const entries = Object.entries(customFields)
//   const price = entries.reduce((acc, [field, fieldData]) => {
//     const choice = customChoices[field]
//     if (!choice) throw new Error(`Missing custom item choice: ${field}`)

//     const option = fieldData.options[choice]
//     if (!option)
//       throw new Error(`Invalid custom item choice for '${field}': ${choice}`)

//     return acc + option.fee
//   }, basePrice)

//   return price
// }
