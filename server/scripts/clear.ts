import { deleteCustomProducts } from '../actions/custom-product.actions.ts'
import { deleteItems } from '../actions/item.actions.ts'
import { deleteProducts } from '../actions/product.actions.ts'

async function clear() {
  await deleteItems()
  await deleteProducts()
  await deleteCustomProducts()

  console.log('All products deleted from database.')
}

clear()
