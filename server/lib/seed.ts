import { Color } from '@prisma/client'
import prisma from './prisma.ts'

async function seed() {
  await prisma.product.create({
    data: {
      name: 'Guitar Picks - Medium',
      price: 1000,
      description: 'Cool amazing guitar picks!.',
      slug: 'guitar-picks-medium',
      imageUrl: 'https://i.imgur.com/HtK3ioz.jpeg',
      items: {
        create: [
          {
            sku: 'GPK-M-12',
            name: '12 Pack',
            price: 1000,
          },
          {
            sku: 'GPK-M-24',
            name: '24 Pack',
            price: 1800,
          },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Instrument Cable',
      price: 1500,
      description: 'Cool amazing instrument cable!.',
      slug: 'instrument-cable',
      imageUrl: 'https://i.imgur.com/jFztfPR.jpeg',
      items: {
        create: [
          {
            sku: 'ICBL-10-BLK',
            name: 'Black',
            price: 1000,
            color: Color.black,
          },
          {
            sku: 'ICBL-10-WHT',
            name: 'White',
            price: 1000,
            color: Color.white,
          },
        ],
      },
    },
  })

  console.log('Database seeded.')
}

seed()
