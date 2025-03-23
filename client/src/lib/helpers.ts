import {
  CustomChoices,
  CustomFields,
} from '@/server/schema/custom-product.schema'

export function centsToDollars(cents: number) {
  return `$${(cents / 100).toFixed(2)}`
}

export function centsToDollarsRounded(cents: number) {
  return `$${Math.ceil(cents / 100)}`
}

// sort keys of object before stringifying so we can safely use them as keys
export function sortStringify(obj: Object) {
  return JSON.stringify(obj, Object.keys(obj).sort())
}

export function createCustomProductPrice(
  basePrice: number,
  fields: CustomFields,
  choices: CustomChoices
) {
  const entries = Object.entries(fields)
  const price = entries.reduce((acc, [field, fieldData]) => {
    const choice = choices[field]
    if (!choice) throw new Error(`Missing custom item choice: ${field}`)

    const option = fieldData.options[choice]
    if (!option)
      throw new Error(`Invalid custom item choice for '${field}': ${choice}`)

    return acc + option.fee
  }, basePrice)

  return price
}
