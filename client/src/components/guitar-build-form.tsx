import { useEffect } from 'react'
import { useForm, UseFormRegisterReturn } from 'react-hook-form'

type Inputs = {
  color: 'black' | 'white' | 'red'
  bodyWood: 'alder' | 'mahogany' | 'ash'
  frets: 'nickel-silver' | 'stainless-steel'
  fretboardWood: 'maple' | 'rosewood'
}

interface Option {
  name: string
  value:
    | Inputs['color']
    | Inputs['bodyWood']
    | Inputs['frets']
    | Inputs['fretboardWood']
  surcharge: number
  color?: string
}

const colorOptions: Option[] = [
  { name: 'Red', value: 'red', surcharge: 0, color: '#FF0000' },
  { name: 'Black', value: 'black', surcharge: 50, color: '#000000' },
  { name: 'White', value: 'white', surcharge: 100, color: '#FFFFFF' },
]

const bodyWoodOptions: Option[] = [
  { name: 'Alder', value: 'alder', surcharge: 0, color: '#f2d9bb' },
  { name: 'Mahogany', value: 'mahogany', surcharge: 100, color: '#863428' },
  { name: 'Ash', value: 'ash', surcharge: 500, color: '#ffedd0' },
]

const fretOptions: Option[] = [
  { name: 'Nickel silver', value: 'nickel-silver', surcharge: 0 },
  { name: 'Stainless steel', value: 'stainless-steel', surcharge: 100 },
]

const fretboardWoodOptions: Option[] = [
  { name: 'Maple', value: 'maple', surcharge: 0, color: '#f2d9bb' },
  { name: 'Rosewood', value: 'rosewood', surcharge: 0, color: '#863428' },
]

export default function GuitarBuildForm() {
  const form = useForm<Inputs>({
    defaultValues: {
      color: 'black',
      bodyWood: 'alder',
      fretboardWood: 'maple',
      frets: 'nickel-silver',
    },
  })

  const onSubmit = form.handleSubmit((data) => console.log(data))

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <div className="px-4 py-8 h-full overflow-y-auto">
        <h2 className="pb-4 font-bold">Color</h2>
        <RadioGroup
          name="color"
          register={form.register('color')}
          options={colorOptions}
        />

        <h2 className="pt-8 pb-4 font-bold">Body Wood</h2>
        <RadioGroup
          name="body-wood"
          register={form.register('bodyWood')}
          options={bodyWoodOptions}
        />

        <h2 className="pt-8 pb-4 font-bold">Fretboard Wood</h2>
        <RadioGroup
          name="fretboard-wood"
          register={form.register('fretboardWood')}
          options={fretboardWoodOptions}
        />

        <h2 className="pt-8 pb-4 font-bold">Frets</h2>
        <RadioGroup
          name="frets"
          register={form.register('frets')}
          options={fretOptions}
        />
      </div>

      <div className="bg-white p-4">
        <button className="bg-black text-white px-4 py-2 rounded w-full">
          Continue
        </button>
      </div>
    </form>
  )
}

type RadioGroupProps = {
  name: string
  options: Option[]
  register: UseFormRegisterReturn
}

function RadioGroup({ name, register, options }: RadioGroupProps) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((option) => (
        <div className="relative flex flex-col">
          <input
            id={`${name}-${option.value}`}
            type="radio"
            value={option.value}
            {...register}
            className="absolute size-full appearance-none border cursor-pointer border-muted rounded-full checked:border-blue-500 checked:border-2"
          />
          <label
            htmlFor={`color-${option}`}
            className="flex items-center justify-between gap-8 px-2 pr-4 py-2"
          >
            {option.color ? (
              <div className="flex gap-2 items-center">
                <div
                  className="size-5 rounded-full aspect-square border border-neutral-300"
                  style={{ backgroundColor: option.color }}
                />
                <div className="text-sm">{option.name}</div>
              </div>
            ) : (
              <div className="text-sm px-2">{option.name}</div>
            )}
            <div className="text-neutral-500 text-sm">
              {option.surcharge > 0 ? `+$${option.surcharge}` : ''}
            </div>
          </label>
        </div>
      ))}
    </div>
  )
}
