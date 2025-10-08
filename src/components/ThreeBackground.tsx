import React, { Suspense } from 'react'

const ThreeBackgroundContent = React.lazy(() => import('./ThreeBackgroundContent'))

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Suspense fallback={<div className="w-full h-full bg-black" />}>
        <ThreeBackgroundContent />
      </Suspense>
    </div>
  )
}