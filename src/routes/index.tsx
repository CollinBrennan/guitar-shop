import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import GuitarBuildForm from '../guitar-build-form'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="flex">
      <div className="flex-1 h-screen bg-red-100"></div>
      <div className="px-4">
        <GuitarBuildForm />
      </div>
    </div>
  )
}
