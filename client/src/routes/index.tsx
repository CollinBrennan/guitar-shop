import { createFileRoute, Link } from '@tanstack/react-router'
import { CaretRight } from '@phosphor-icons/react'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <main>
      <div className="flex flex-col gap-12 w-1/2 items-end">
        <div className="flex flex-col justify-center text-right w-full h-screen">
          <span className="font-display-l uppercase text-[5vw] leading-[5vw]">
            Find
            <br />
            your
          </span>
          <br />
          <span className="select-none font-brand text-[16vw] leading-[5vw] translate-x-[1vw]">
            Canvas
          </span>
          <div className="pt-[5vw] z-10">
            <Link to="/guitars" className="flex items-center justify-end">
              <span className="font-display uppercase">SHOP GUITARS</span>
              <CaretRight size={20}></CaretRight>
            </Link>
          </div>
        </div>
        <div></div>
      </div>
    </main>
  )
}
