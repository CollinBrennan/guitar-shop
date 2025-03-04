import { createProduct } from '../actions/product.actions.ts'

async function seed() {
  await createProduct({
    name: 'Guitar Stand',
    price: 2000,
    description: 'Guitar stand!',
    slug: 'guitar-stand',
    imageUrl: 'https://i.imgur.com/cEcruBa.png',
    items: [
      {
        sku: 'GTRSTAND',
        price: 2000,
        variant: {},
      },
    ],
  })

  await createProduct({
    name: 'Guitar Picks',
    price: 1000,
    description: 'Cool amazing guitar picks!.',
    slug: 'guitar-picks',
    imageUrl: 'https://i.imgur.com/HtK3ioz.jpeg',
    variantFields: {
      color: {
        name: 'Color',
        options: {
          black: {
            name: 'Black',
            color: '#000000',
          },
          white: {
            name: 'White',
            color: '#FFFFFF',
          },
        },
      },
      thickness: {
        name: 'Thickness',
        options: {
          medium: {
            name: 'Medium',
          },
          heavy: {
            name: 'Heavy',
          },
        },
      },
      count: {
        name: 'Size',
        options: {
          '12': {
            name: '12 Pack',
          },
          '24': {
            name: '24 Pack',
          },
        },
      },
    },
    items: [
      {
        sku: 'GPK-M-BLK-12',
        price: 1000,
        variant: {
          color: 'black',
          thickness: 'medium',
          count: '12',
        },
      },
      {
        sku: 'GPK-M-BLK-24',
        price: 1800,
        variant: {
          color: 'black',
          thickness: 'medium',
          count: '24',
        },
      },
      {
        sku: 'GPK-H-BLK-12',
        price: 1000,
        variant: {
          color: 'black',
          thickness: 'heavy',
          count: '12',
        },
      },
      {
        sku: 'GPK-H-BLK-24',
        price: 1800,
        variant: {
          color: 'black',
          thickness: 'heavy',
          count: '24',
        },
      },
      {
        sku: 'GPK-H-WHT-12',
        price: 1000,
        variant: {
          color: 'white',
          thickness: 'heavy',
          count: '12',
        },
      },
      {
        sku: 'GPK-H-WHT-24',
        price: 1800,
        variant: {
          color: 'white',
          thickness: 'heavy',
          count: '24',
        },
      },
    ],
  })

  await createProduct({
    name: 'Instrument Cable',
    price: 1500,
    description: 'Cool amazing instrument cable!',
    slug: 'instrument-cable',
    imageUrl: 'https://i.imgur.com/jFztfPR.jpeg',
    variantFields: {
      color: {
        name: 'Color',
        options: {
          black: {
            name: 'Black',
            color: '#000000',
          },
          white: {
            name: 'White',
            color: '#FFFFFF',
          },
        },
      },
    },
    items: [
      {
        sku: 'ICBL-BLK',
        price: 1500,
        variant: {
          color: 'black',
        },
      },
      {
        sku: 'ICBL-WHT',
        price: 1500,
        variant: {
          color: 'white',
        },
      },
    ],
  })

  await createProduct({
    name: 'Custom Guitar',
    price: 50000,
    description: 'Your very own custom guitar!',
    slug: 'custom-guitar',
    imageUrl: 'https://i.imgur.com/dLVWfHZ.png',
    variantFields: {
      handedness: {
        name: 'Handedness',
        options: {
          right: { name: 'Right-Handed' },
          left: { name: 'Left-Handed' },
        },
      },
    },
    items: [
      {
        sku: 'GTR-CSTM-L',
        price: 50000,
        variant: { handedness: 'left' },
        customFields: {
          bodyWood: {
            name: 'Body Wood',
            options: {
              alder: { name: 'Alder', color: '#eab37a', fee: 0 },
              mahogany: {
                name: 'Mahogany',
                color: '#7a2c20',
                fee: 10000,
              },
            },
          },
          frets: {
            name: 'Frets',
            options: {
              standard: { name: 'Standard', fee: 0 },
              stainlessSteel: { name: 'Stainless Steel', fee: 5000 },
            },
          },
        },
        customDefaultChoices: {
          bodyWood: 'alder',
          frets: 'standard',
        },
      },
      {
        sku: 'GTR-CSTM',
        price: 50000,
        variant: { handedness: 'right' },
        customFields: {
          bodyWood: {
            name: 'Body Wood',
            options: {
              alder: { name: 'Alder', color: '#eab37a', fee: 0 },
              mahogany: {
                name: 'Mahogany',
                color: '#7a2c20',
                fee: 10000,
              },
            },
          },
          frets: {
            name: 'Frets',
            options: {
              standard: { name: 'Standard', fee: 0 },
              stainlessSteel: { name: 'Stainless Steel', fee: 5000 },
            },
          },
        },
        customDefaultChoices: {
          bodyWood: 'alder',
          frets: 'standard',
        },
      },
    ],
  })

  console.log('Database seeded.')
}

seed()
