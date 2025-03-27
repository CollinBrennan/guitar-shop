import {
  _internal_ComponentButton,
  ButtonProps,
  Button as HeadlessButton,
} from '@headlessui/react'

export default function Button(props: ButtonProps) {
  return (
    <HeadlessButton
      {...props}
      className="bg-secondary-bg py-2 px-8 font-display uppercase text-secondary data-[hover]:bg-secondary-bg/70 data-[disabled]:cursor-default data-[disabled]:bg-secondary-bg/50 data-[hover]:data-[active]:bg-secondary-bg hover:cursor-pointer"
    />
  )
}
