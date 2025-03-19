import { CaretLeft } from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'
import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  heading?: string
  backButton?: { label: string; to: string }
}

export default function PageContainer({
  heading,
  backButton,
  children,
}: Props) {
  return (
    <main className="w-full max-w-[1440px] px-12 mx-auto">
      <div className="flex flex-col gap-4 pt-12 pb-8">
        {backButton && (
          <Link to={backButton.to} className="flex items-center">
            <CaretLeft size={20}></CaretLeft>
            <span className="font-display uppercase">{backButton.label}</span>
          </Link>
        )}
        {heading && (
          <h1 className="font-display-l uppercase text-5xl">{heading}</h1>
        )}
      </div>
      {children}
    </main>
  )
}
