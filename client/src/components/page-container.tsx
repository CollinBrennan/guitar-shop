import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  title: string
}

export default function PageContainer({ title, children }: Props) {
  return (
    <main className="px-16">
      <h1 className="font-bold text-3xl py-8">{title}</h1>
      {children}
    </main>
  )
}
