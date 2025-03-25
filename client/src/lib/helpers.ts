import {
  CustomChoices,
  CustomFields,
  CustomProduct,
} from '@/server/schema/custom-product.schema'

export function centsToDollars(cents: number) {
  return `$${(cents / 100).toFixed(2)}`
}

export function centsToDollarsRounded(cents: number) {
  return `$${Math.ceil(cents / 100)}`
}

export function centsToDollarsCustom(
  basePrice: number,
  fields: CustomFields,
  choices: CustomChoices
) {
  return centsToDollars(createCustomProductPrice(basePrice, fields, choices))
}

// sort keys of object before stringifying so we can safely use them as keys
export function sortStringify(obj: Object) {
  return JSON.stringify(obj, Object.keys(obj).sort())
}

// returns price in cents
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

export function getCustomChoicesFromParams(
  product: CustomProduct,
  params: CustomChoices
) {
  const customChoices = Object.entries(params).filter(
    ([field, choice]) => product.customFields[field]?.options[choice]
  )

  return {
    ...product.customDefaults,
    ...Object.fromEntries(customChoices),
  }
}

export function stripCustomChoices(
  product: CustomProduct,
  choices: CustomChoices
): CustomChoices {
  const stripped = Object.entries(choices).reduce(
    (acc, [field, choice]) =>
      product.customDefaults[field] === choice
        ? acc
        : { ...acc, [field]: choice },
    {}
  )

  return stripped
}
