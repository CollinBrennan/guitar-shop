/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ShopImport } from './routes/shop'
import { Route as ContactImport } from './routes/contact'
import { Route as CheckoutImport } from './routes/checkout'
import { Route as CartImport } from './routes/cart'
import { Route as IndexImport } from './routes/index'
import { Route as ProductSlugImport } from './routes/product/$slug'

// Create/Update Routes

const ShopRoute = ShopImport.update({
  id: '/shop',
  path: '/shop',
  getParentRoute: () => rootRoute,
} as any)

const ContactRoute = ContactImport.update({
  id: '/contact',
  path: '/contact',
  getParentRoute: () => rootRoute,
} as any)

const CheckoutRoute = CheckoutImport.update({
  id: '/checkout',
  path: '/checkout',
  getParentRoute: () => rootRoute,
} as any)

const CartRoute = CartImport.update({
  id: '/cart',
  path: '/cart',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ProductSlugRoute = ProductSlugImport.update({
  id: '/product/$slug',
  path: '/product/$slug',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/cart': {
      id: '/cart'
      path: '/cart'
      fullPath: '/cart'
      preLoaderRoute: typeof CartImport
      parentRoute: typeof rootRoute
    }
    '/checkout': {
      id: '/checkout'
      path: '/checkout'
      fullPath: '/checkout'
      preLoaderRoute: typeof CheckoutImport
      parentRoute: typeof rootRoute
    }
    '/contact': {
      id: '/contact'
      path: '/contact'
      fullPath: '/contact'
      preLoaderRoute: typeof ContactImport
      parentRoute: typeof rootRoute
    }
    '/shop': {
      id: '/shop'
      path: '/shop'
      fullPath: '/shop'
      preLoaderRoute: typeof ShopImport
      parentRoute: typeof rootRoute
    }
    '/product/$slug': {
      id: '/product/$slug'
      path: '/product/$slug'
      fullPath: '/product/$slug'
      preLoaderRoute: typeof ProductSlugImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/cart': typeof CartRoute
  '/checkout': typeof CheckoutRoute
  '/contact': typeof ContactRoute
  '/shop': typeof ShopRoute
  '/product/$slug': typeof ProductSlugRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/cart': typeof CartRoute
  '/checkout': typeof CheckoutRoute
  '/contact': typeof ContactRoute
  '/shop': typeof ShopRoute
  '/product/$slug': typeof ProductSlugRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/cart': typeof CartRoute
  '/checkout': typeof CheckoutRoute
  '/contact': typeof ContactRoute
  '/shop': typeof ShopRoute
  '/product/$slug': typeof ProductSlugRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/cart'
    | '/checkout'
    | '/contact'
    | '/shop'
    | '/product/$slug'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/cart' | '/checkout' | '/contact' | '/shop' | '/product/$slug'
  id:
    | '__root__'
    | '/'
    | '/cart'
    | '/checkout'
    | '/contact'
    | '/shop'
    | '/product/$slug'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  CartRoute: typeof CartRoute
  CheckoutRoute: typeof CheckoutRoute
  ContactRoute: typeof ContactRoute
  ShopRoute: typeof ShopRoute
  ProductSlugRoute: typeof ProductSlugRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CartRoute: CartRoute,
  CheckoutRoute: CheckoutRoute,
  ContactRoute: ContactRoute,
  ShopRoute: ShopRoute,
  ProductSlugRoute: ProductSlugRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/cart",
        "/checkout",
        "/contact",
        "/shop",
        "/product/$slug"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/cart": {
      "filePath": "cart.tsx"
    },
    "/checkout": {
      "filePath": "checkout.tsx"
    },
    "/contact": {
      "filePath": "contact.tsx"
    },
    "/shop": {
      "filePath": "shop.tsx"
    },
    "/product/$slug": {
      "filePath": "product/$slug.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
