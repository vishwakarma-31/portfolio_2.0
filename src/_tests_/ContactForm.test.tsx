import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import ContactForm from '../components/ContactForm'

// Mock environment variables
vi.mock('vite', () => ({
  import: {
    meta: {
      env: {
        VITE_API_URL: 'http://localhost:3001'
      }
    }
  }
}))

// Mock fetch
vi.stubGlobal('fetch', vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true })
  } as Response)
))

describe('ContactForm', () => {
  it('renders form inputs correctly', () => {
    render(<ContactForm />)

    expect(screen.getByPlaceholderText('Your full name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('your.email@example.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Tell me about your project, idea, or just say hello...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('shows validation errors for empty fields', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument()
      expect(screen.getByText('Email is required')).toBeInTheDocument()
      expect(screen.getByText('Message is required')).toBeInTheDocument()
    })
  })

  it('validates email format', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    // Fill other required fields so only email validation triggers
    await user.type(screen.getByPlaceholderText('Your full name'), 'John Doe')
    await user.type(screen.getByPlaceholderText('Tell me about your project, idea, or just say hello...'), 'Hello')
    const emailInput = screen.getByPlaceholderText('your.email@example.com')
    await user.clear(emailInput)
    await user.type(emailInput, 'invalid-email')

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email')).toBeInTheDocument()
    })
  })

  it('submits form successfully', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.type(screen.getByPlaceholderText('Your full name'), 'John Doe')
    await user.type(screen.getByPlaceholderText('your.email@example.com'), 'john@example.com')
    await user.type(screen.getByPlaceholderText('Tell me about your project, idea, or just say hello...'), 'Test message')

    // Make fetch resolve after a short delay so loading state is observable
    ;(fetch as unknown as jest.Mock).mockImplementationOnce(() =>
      new Promise(resolve => setTimeout(() => resolve({ ok: true, json: () => Promise.resolve({ success: true }) } as Response), 100))
    )

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Sending Message...')).toBeInTheDocument()
    })
  })
})