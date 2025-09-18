import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import ContactForm from '../components/ContactForm'

describe('Accessibility checks', () => {
  it('ContactForm is accessible', async () => {
    const { container } = render(<ContactForm />)
    const results = await axe(container)
    expect(results.violations).toHaveLength(0)
  })
})