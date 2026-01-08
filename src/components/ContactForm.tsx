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
        if (!value.trim()) {
          return 'Name is required'
        } else if (value.trim().length < 2) {
          return 'Name must be at least 2 characters'
        } else if (value.trim().length > 50) {
          return 'Name must be less than 50 characters'
        }
        return ''
      case 'email':
        if (!value.trim()) {
          return 'Email is required'
        } else if (!/^\S+@\S+\.\S+$/.test(value)) {
          return 'Please enter a valid email address'
        } else if (value.length > 254) {
          return 'Email must be less than 254 characters'
        }
        return ''
      case 'message':
        if (!value.trim()) {
          return 'Message is required'
        } else if (value.trim().length < 10) {
          return 'Message must be at least 10 characters'
        } else if (value.trim().length > 500) {
          return 'Message must be less than 500 characters'
        }
        return ''
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
    
    // Perform real-time validation with debounce
    const error = validateField(name, value)
    if (error !== errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: error,
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
      // Send to our backend API with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
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
        signal: controller.signal
      })
      
      clearTimeout(timeoutId);

      // Check if response is ok
      if (!response.ok) {
        // Try to parse error response
        let errorMessage = 'Failed to send message';
        let errorDetails = '';
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
          
          // Handle validation errors
          if (errorData.errors && Array.isArray(errorData.errors)) {
            const validationErrors = errorData.errors.map((err: { msg?: string; message?: string }) => err.msg || err.message).join(', ');
            errorMessage = 'Please check your input';
            errorDetails = validationErrors;
          }
          
          // Handle specific status codes
          if (response.status === 429) {
            errorMessage = 'Too many requests';
            errorDetails = 'Please wait a moment before trying again.';
          } else if (response.status === 500) {
            errorMessage = 'Server error';
            errorDetails = 'Our server is experiencing issues. Please try again later.';
          }
        } catch {
          // If JSON parsing fails, use status text
          errorMessage = response.statusText || `Server error (${response.status})`;
        }
        
        throw new Error(errorDetails ? `${errorMessage}: ${errorDetails}` : errorMessage);
      }

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setSubmitMessage(result.message || 'Thank you for your message! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
        // Clear any field errors on successful submission
        setErrors({ name: '', email: '', message: '' });
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      setSubmitStatus('error');
      let errorMessage = 'Failed to send message';
      
      if (error instanceof Error && error.name === 'AbortError') {
        errorMessage = 'Request timed out';
      } else if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = 'Network error: Please check your internet connection and try again.';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setSubmitMessage(errorMessage);
      
      // Log error for debugging (only in development)
      if (import.meta.env.DEV) {
        console.error('Contact form submission error:', error);
      }
      
      // Add subtle shake animation to indicate error
      const formElement = document.querySelector('form');
      if (formElement) {
        formElement.classList.add('animate-shake');
        setTimeout(() => {
          formElement.classList.remove('animate-shake');
        }, 1000);
      }
    } finally {
      setIsSubmitting(false);
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
            {errors.name && <span className="text-red-400 text-sm mt-1 block px-1">{errors.name}</span>}
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
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && <span id="email-error" className="text-red-400 text-sm mt-1 block px-1">{errors.email}</span>}
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
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && <span id="message-error" className="text-red-400 text-sm mt-1 block px-1">{errors.message}</span>}
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
          whileHover={!isSubmitting ? { scale: 1.02 } : {}}
          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          className="w-full btn-primary flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed py-4 transition-all duration-300"
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Sending Message...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  )
}
