export function centsToDollars(cents: number) {
  return `$${(cents / 100).toFixed(2)}`
}

// sort keys of object before stringifying so we can safely use them as keys
export function sortStringify(obj: Object) {
  return JSON.stringify(obj, Object.keys(obj).sort())
}
