import type { Cart } from '../schema/checkout.schema.ts'
import type {
  CustomChoices,
  CustomFields,
  CustomProductRecord,
} from '../schema/custom-product.schema.ts'
import type {
  ItemWithProduct,
  ItemWithProductRecord,
} from '../schema/item.schema.ts'

export function lineItemsFromCart(
  cartItems: Cart,
  itemData: ItemWithProductRecord,
  customProductData: CustomProductRecord
) {
  const items = cartItems.items.map((item) => {
    const data = itemData[item.sku]

    if (!data) throw new Error(`Invalid item SKU: '${item.sku}'`)

    return {
      price_data: {
        unit_amount: data.price,
        currency: 'usd',
        product_data: {
          description: createItemDescription(data),
          name: data.product.name,
          images: data.product.imageUrl ? [data.product.imageUrl] : [],
        },
      },
      adjustable_quantity: {
        enabled: true,
        minimum: 0,
        maximum: 99,
      },
      quantity: item.quantity,
    }
  })

  const customItems = cartItems.customItems.map((item) => {
    const data = customProductData[item.sku]

    if (!data) throw new Error(`Invalid custom item SKU: '${item.sku}'`)

    return {
      price_data: {
        unit_amount: data.price,
        currency: 'usd',
        product_data: {
          description: createCustomItemDescription(
            data.customFields,
            item.customChoices
          ),
          name: data.name,
          images: data.imageUrl ? [data.imageUrl] : [],
        },
      },
      adjustable_quantity: {
        enabled: true,
        minimum: 0,
        maximum: 99,
      },
      quantity: 1,
    }
  })

  return [...items, ...customItems]
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

function createCustomItemDescription(
  fields: CustomFields,
  choices: CustomChoices
) {
  return JSON.stringify(choices)
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
