import React, { Suspense } from 'react'
import { useTheme } from '../context/ThemeContext'

const ThreeBackgroundContent = React.lazy(() => import('./ThreeBackgroundContent'))

export default function ThreeBackground() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Suspense fallback={<div className={`w-full h-full ${isDark ? 'bg-black' : 'bg-white'}`} />}>
        <ThreeBackgroundContent />
      </Suspense>
    </div>
  )
}