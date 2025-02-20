import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import GuitarBuildForm from '../guitar-build-form'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="flex h-full overflow-hidden">
      <div className="flex-1 bg-red-100"></div>
      <GuitarBuildForm />
    </div>
  )
}
