import { createFileRoute } from '@tanstack/react-router'
import PageContainer from '../components/page-container'

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
          <span className="font-brand text-[16vw] leading-[5vw] translate-x-[1vw]">
            Canvas
          </span>
          <div className="pt-[5vw]">
            <button className="font-display uppercase px-8 py-2 text-secondary bg-secondary-bg">
              Design your guitar
            </button>
          </div>
        </div>
        <div></div>
      </div>
    </main>
  )
}
