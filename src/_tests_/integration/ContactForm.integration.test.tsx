import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi, describe, beforeEach, it, expect } from 'vitest'
import ContactForm from '../../components/ContactForm'

describe('ContactForm Integration Tests', () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, 'fetch', {
      value: vi.fn(),
      writable: true
    })
  })

  it('submits form successfully with valid data', async () => {
    (globalThis.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: 'Message sent successfully! I\'ll get back to you soon.' })
    })

    render(<ContactForm />)
    
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' }
    })
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' }
    })
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'This is a test message' }
    })
    
    fireEvent.click(screen.getByRole('button', { name: /send/i }))
    
    await waitFor(() => {
      expect(screen.getByText(/Message sent successfully!/i)).toBeInTheDocument()
    })
  })

  it('displays error for invalid email', async () => {
    render(<ContactForm />)
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'invalid-email' }
    })
    fireEvent.blur(screen.getByLabelText(/email/i))
    
    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid email/i)).toBeInTheDocument()
    })
  })

  it('handles rate limiting gracefully', async () => {
    (globalThis.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 429,
      json: async () => ({ error: 'Too many requests' })
    })

    render(<ContactForm />)
    
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' }
    })
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' }
    })
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'This is a test message' }
    })
    
    fireEvent.click(screen.getByRole('button', { name: /send/i }))
    
    await waitFor(() => {
      expect(screen.getByText(/Failed to send message/i)).toBeInTheDocument()
    })
  })
})