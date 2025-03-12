import { createCustomProduct } from '../actions/custom-product.actions.ts'
import { createProduct } from '../actions/product.actions.ts'

async function seed() {
  await createProduct({
    name: 'Guitar Stand',
    category: 'accessories',
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
    category: 'accessories',
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
    category: 'gear',
    price: 1500,
    description: 'Cool amazing instrument cable!',
    slug: 'instrument-cable',
    imageUrl: 'https://i.imgur.com/jFztfPR.jpeg',
    specs: [{ label: 'Material', body: 'Fabric' }],
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

  await createCustomProduct({
    name: 'Custom S1 Guitar',
    model: 'S1',
    category: 'guitar',
    sku: 'CSTM-GTR-S1',
    price: 50000,
    description: 'Your very own custom S1 guitar!',
    slug: 's1',
    imageUrl: 'https://i.imgur.com/dLVWfHZ.png',
    specs: [
      { label: 'Pickups', body: 'Canvas Brand Pickups' },
      { label: 'Scale Length', body: '25 1/2"' },
    ],
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
    customDefaults: {
      bodyWood: 'alder',
      frets: 'standard',
    },
  })

  console.log('Database seeded.')
}

seed()
