import prisma from '../lib/prisma.ts'

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
            name: 'Guitar Picks - Medium - 12 Pack',
            price: 1000,
            isCustom: false,
          },
          {
            sku: 'GPK-M-24',
            name: 'Guitar Picks - Medium - 24 Pack',
            price: 1800,
            isCustom: false,
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
            name: 'Instrument Cable - Black',
            price: 1000,
            color: '#000000',
            isCustom: false,
          },
          {
            sku: 'ICBL-10-WHT',
            name: 'Instrument Cable - White',
            price: 1000,
            color: '#FFFFFF',
            isCustom: false,
          },
        ],
      },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Custom Guitar',
      price: 500,
      description: 'Custom guitarrrrrr!.',
      slug: 'custom-guitar',
      imageUrl: 'https://i.imgur.com/dLVWfHZ.png',
      items: {
        create: [
          {
            sku: 'GTR-CSTM',
            name: 'Custom Guitar',
            price: 500,
            isCustom: true,
            customOptions: [
              {
                name: 'Body Wood',
                value: 'body-wood',
                choices: [
                  {
                    name: 'Alder',
                    value: 'alder',
                    color: '#eab37a',
                    surcharge: 0,
                  },
                  {
                    name: 'Mahogany',
                    value: 'mahogany',
                    color: '#6b2919',
                    surcharge: 200,
                  },
                ],
              },
              {
                name: 'Frets',
                value: 'frets',
                choices: [
                  { name: 'Standard', value: 'standard', surcharge: 0 },
                  {
                    name: 'Stainless Steel',
                    value: 'stainless-steel',
                    surcharge: 0,
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  })

  console.log('Database seeded.')
}

seed()
