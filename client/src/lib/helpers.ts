export function centsToDollars(cents: number) {
  return `$${(cents / 100).toFixed(2)}`
}
