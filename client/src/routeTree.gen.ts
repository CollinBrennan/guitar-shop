/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ShopImport } from './routes/shop'
import { Route as GuitarsImport } from './routes/guitars'
import { Route as CheckoutImport } from './routes/checkout'
import { Route as AccountImport } from './routes/account'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'
import { Route as ProductSlugImport } from './routes/product.$slug'
import { Route as DesignSlugImport } from './routes/design.$slug'
import { Route as CustomSlugImport } from './routes/custom.$slug'

// Create/Update Routes

const ShopRoute = ShopImport.update({
  id: '/shop',
  path: '/shop',
  getParentRoute: () => rootRoute,
} as any)

const GuitarsRoute = GuitarsImport.update({
  id: '/guitars',
  path: '/guitars',
  getParentRoute: () => rootRoute,
} as any)

const CheckoutRoute = CheckoutImport.update({
  id: '/checkout',
  path: '/checkout',
  getParentRoute: () => rootRoute,
} as any)

const AccountRoute = AccountImport.update({
  id: '/account',
  path: '/account',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  id: '/about',
  path: '/about',
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

const DesignSlugRoute = DesignSlugImport.update({
  id: '/design/$slug',
  path: '/design/$slug',
  getParentRoute: () => rootRoute,
} as any)

const CustomSlugRoute = CustomSlugImport.update({
  id: '/custom/$slug',
  path: '/custom/$slug',
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
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/account': {
      id: '/account'
      path: '/account'
      fullPath: '/account'
      preLoaderRoute: typeof AccountImport
      parentRoute: typeof rootRoute
    }
    '/checkout': {
      id: '/checkout'
      path: '/checkout'
      fullPath: '/checkout'
      preLoaderRoute: typeof CheckoutImport
      parentRoute: typeof rootRoute
    }
    '/guitars': {
      id: '/guitars'
      path: '/guitars'
      fullPath: '/guitars'
      preLoaderRoute: typeof GuitarsImport
      parentRoute: typeof rootRoute
    }
    '/shop': {
      id: '/shop'
      path: '/shop'
      fullPath: '/shop'
      preLoaderRoute: typeof ShopImport
      parentRoute: typeof rootRoute
    }
    '/custom/$slug': {
      id: '/custom/$slug'
      path: '/custom/$slug'
      fullPath: '/custom/$slug'
      preLoaderRoute: typeof CustomSlugImport
      parentRoute: typeof rootRoute
    }
    '/design/$slug': {
      id: '/design/$slug'
      path: '/design/$slug'
      fullPath: '/design/$slug'
      preLoaderRoute: typeof DesignSlugImport
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
  '/about': typeof AboutRoute
  '/account': typeof AccountRoute
  '/checkout': typeof CheckoutRoute
  '/guitars': typeof GuitarsRoute
  '/shop': typeof ShopRoute
  '/custom/$slug': typeof CustomSlugRoute
  '/design/$slug': typeof DesignSlugRoute
  '/product/$slug': typeof ProductSlugRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/account': typeof AccountRoute
  '/checkout': typeof CheckoutRoute
  '/guitars': typeof GuitarsRoute
  '/shop': typeof ShopRoute
  '/custom/$slug': typeof CustomSlugRoute
  '/design/$slug': typeof DesignSlugRoute
  '/product/$slug': typeof ProductSlugRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/account': typeof AccountRoute
  '/checkout': typeof CheckoutRoute
  '/guitars': typeof GuitarsRoute
  '/shop': typeof ShopRoute
  '/custom/$slug': typeof CustomSlugRoute
  '/design/$slug': typeof DesignSlugRoute
  '/product/$slug': typeof ProductSlugRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/about'
    | '/account'
    | '/checkout'
    | '/guitars'
    | '/shop'
    | '/custom/$slug'
    | '/design/$slug'
    | '/product/$slug'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/about'
    | '/account'
    | '/checkout'
    | '/guitars'
    | '/shop'
    | '/custom/$slug'
    | '/design/$slug'
    | '/product/$slug'
  id:
    | '__root__'
    | '/'
    | '/about'
    | '/account'
    | '/checkout'
    | '/guitars'
    | '/shop'
    | '/custom/$slug'
    | '/design/$slug'
    | '/product/$slug'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutRoute: typeof AboutRoute
  AccountRoute: typeof AccountRoute
  CheckoutRoute: typeof CheckoutRoute
  GuitarsRoute: typeof GuitarsRoute
  ShopRoute: typeof ShopRoute
  CustomSlugRoute: typeof CustomSlugRoute
  DesignSlugRoute: typeof DesignSlugRoute
  ProductSlugRoute: typeof ProductSlugRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutRoute: AboutRoute,
  AccountRoute: AccountRoute,
  CheckoutRoute: CheckoutRoute,
  GuitarsRoute: GuitarsRoute,
  ShopRoute: ShopRoute,
  CustomSlugRoute: CustomSlugRoute,
  DesignSlugRoute: DesignSlugRoute,
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
        "/about",
        "/account",
        "/checkout",
        "/guitars",
        "/shop",
        "/custom/$slug",
        "/design/$slug",
        "/product/$slug"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/account": {
      "filePath": "account.tsx"
    },
    "/checkout": {
      "filePath": "checkout.tsx"
    },
    "/guitars": {
      "filePath": "guitars.tsx"
    },
    "/shop": {
      "filePath": "shop.tsx"
    },
    "/custom/$slug": {
      "filePath": "custom.$slug.tsx"
    },
    "/design/$slug": {
      "filePath": "design.$slug.tsx"
    },
    "/product/$slug": {
      "filePath": "product.$slug.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
