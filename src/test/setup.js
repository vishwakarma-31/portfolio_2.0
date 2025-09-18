import '@testing-library/jest-dom'
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import { axe } from 'jest-axe'

expect.extend(axe)

afterEach(() => {
  cleanup()
})