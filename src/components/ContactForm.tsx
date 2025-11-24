import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react'

interface ContactFormProps {
  apiUrl?: string
}

// Updated to use relative path as requested for Vercel deployment
// Vercel automatically serves API routes from the api/ directory
export default function ContactForm({ apiUrl = '/api/contact' }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)
  const [submitMessage, setSubmitMessage] = useState('')

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        return value.trim() ? '' : 'Name is required'
      case 'email':
        if (!value.trim()) {
          return 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          return 'Please enter a valid email'
        }
        return ''
      case 'message':
        return value.trim() ? '' : 'Message is required'
      default:
        return ''
    }
  }

  const validateForm = () => {
    const newErrors = { name: '', email: '', message: '' }

    newErrors.name = validateField('name', formData.name)
    newErrors.email = validateField('email', formData.email)
    newErrors.message = validateField('message', formData.message)

    setErrors(newErrors)
    return !newErrors.name && !newErrors.email && !newErrors.message
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const error = validateField(name, value)
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)
    setSubmitMessage('')

    try {
      // Send to our backend API
      const response = await window.fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })

      // Check if response is ok
      if (!response.ok) {
        // Try to parse error response
        let errorMessage = 'Failed to send message'
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorData.error || errorMessage
          
          // Handle validation errors
          if (errorData.errors && Array.isArray(errorData.errors)) {
            const validationErrors = errorData.errors.map((err: { msg?: string; message?: string }) => err.msg || err.message).join(', ')
            errorMessage = `Validation error: ${validationErrors}`
          }
        } catch {
          // If JSON parsing fails, use status text
          errorMessage = response.statusText || `Server error (${response.status})`
        }
        throw new Error(errorMessage)
      }

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        setSubmitMessage(result.message || 'Message sent successfully!')
        setFormData({ name: '', email: '', message: '' })
      } else {
        throw new Error(result.message || 'Failed to send message')
      }
    } catch (error) {
      setSubmitStatus('error')
      let errorMessage = 'Failed to send message'
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = 'Network error: Please check your internet connection and try again.'
      } else if (error instanceof Error) {
        errorMessage = error.message
      }
      
      setSubmitMessage(errorMessage)
      // Log error for debugging (only in development)
      if (import.meta.env.DEV) {
        console.error('Contact form submission error:', error)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClasses = 'w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-foreground placeholder-gray-500'
  const labelClasses = 'block text-sm font-medium mb-2 text-gray-200'

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="glass-card p-8 rounded-xl max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary/20 rounded-lg">
          <Mail className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-gradient">Send a Message</h2>
      </div>

      <form noValidate onSubmit={onSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className={labelClasses}>
              <User className="w-4 h-4 inline mr-2" />
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={inputClasses}
              placeholder="Your full name"
            />
            {errors.name && <span className="text-red-400 text-sm mt-1 block">{errors.name}</span>}
          </div>

          <div>
            <label htmlFor="email" className={labelClasses}>
              <Mail className="w-4 h-4 inline mr-2" />
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={inputClasses}
              placeholder="your.email@example.com"
            />
            {errors.email && <span className="text-red-400 text-sm mt-1 block">{errors.email}</span>}
          </div>
        </div>

        <div>
          <label htmlFor="message" className={labelClasses}>
            <MessageSquare className="w-4 h-4 inline mr-2" />
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`${inputClasses} resize-none`}
            placeholder="Tell me about your project, idea, or just say hello..."
          />
          {errors.message && <span className="text-red-400 text-sm mt-1 block">{errors.message}</span>}
        </div>

        {/* Status message display */}
        {submitStatus === 'success' && (
          <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <span className="text-green-300">{submitMessage}</span>
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <span className="text-red-300">{submitMessage}</span>
          </div>
        )}

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full btn-primary flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed py-4"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Sending Message...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Message
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  )
}