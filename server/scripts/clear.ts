import { deleteItems } from '../actions/item.actions.ts'
import { deleteProducts } from '../actions/product.actions.ts'

async function clear() {
  await deleteItems()
  await deleteProducts()

  console.log('All products and items deleted from database.')
}

clear()
