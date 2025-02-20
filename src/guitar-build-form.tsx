import { SubmitHandler, useForm } from 'react-hook-form'

type Inputs = {
  color: 'black' | 'white' | 'red'
  bodyWood: 'alder' | 'mahogany' | 'ash'
}

type ColorOption = {
  name: string
  color: string
}

type BodyWoodOption = {
  name: string
  price: number
}

const colorOptions: ColorOption[] = [
  { name: 'red', color: '#FF0000' },
  { name: 'black', color: '#000000' },
  { name: 'white', color: '#FFFFFF' },
]

const bodyWoodOptions: BodyWoodOption[] = [
  { name: 'alder', price: 0 },
  { name: 'mahogany', price: 100 },
  { name: 'ash', price: 100 },
]

export default function GuitarBuildForm() {
  const form = useForm<Inputs>({
    defaultValues: {
      color: 'black',
      bodyWood: 'alder',
    },
  })

  const onSubmit = form.handleSubmit((data) => console.log(data))

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2>Color</h2>
        <div className="grid grid-cols-4 gap-2">
          {colorOptions.map((option) => (
            <input
              style={{ backgroundColor: option.color }}
              id={`color-${option.name}`}
              type="radio"
              value={option.name}
              {...form.register('color')}
              className="aspect-square appearance-none border cursor-pointer border-neutral-400 rounded-full checked:border-blue-500 checked:border-2 p-4"
            />
          ))}
        </div>

        <h2 className="pt-8 pb-4 font-bold">Body Wood</h2>
        <div className="flex flex-col gap-2">
          {bodyWoodOptions.map((option) => (
            <div className="relative flex flex-col">
              <input
                id={`body-wood-${option.name}`}
                type="radio"
                value={option.name}
                {...form.register('bodyWood')}
                className="absolute size-full appearance-none border cursor-pointer border-gray-400 rounded-xl checked:border-blue-500 checked:border-2 p-4"
              />
              <label
                htmlFor={`body-wood-${option}`}
                className="flex items-center justify-between gap-8 p-4"
              >
                <div className="capitalize font-semibold">{option.name}</div>
                <div className="text-neutral-500 text-sm">${option.price}</div>
              </label>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="cursor-pointer px-4 py-2 bg-black text-white mt-8"
        >
          Add to cart
        </button>
      </form>
    </div>
  )
}
