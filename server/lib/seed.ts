import prisma from './prisma.ts'

async function seed() {
  prisma.product.createMany({
    data: [
      {
        name: 'Guitar Picks - Medium',
        slug: 'guitar-picks-medium',
        price: 1000,
        description: 'Cool awesome guitar picks!',
        imageUrl: 'https://i.imgur.com/CqXC21j.jpeg',
        variations: [
          { name: '12 Pack', price: 1000 },
          { name: '24 Pack', price: 1800 },
        ],
      },
      {
        name: 'Instrument Cable',
        slug: 'instrument-cable',
        price: 1500,
        description: 'Cool awesome instrument cable!',
        imageUrl: 'https://i.imgur.com/CqXC21j.jpeg',
        variations: [
          { name: 'Black', color: '#000000', price: 1000 },
          { name: 'White', color: '#FFFFFF', price: 1000 },
        ],
      },
    ],
  })

  console.log('Database seeded.')
}

seed()
