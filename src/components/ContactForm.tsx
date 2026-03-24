import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react'

interface ContactFormProps {
  apiUrl?: string
}

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
        if (!value.trim()) return 'Name is required'
        if (value.trim().length < 2) return 'Name must be at least 2 characters'
        if (value.trim().length > 50) return 'Name must be less than 50 characters'
        return ''
      case 'email':
        if (!value.trim()) return 'Email is required'
        if (!/^\S+@\S+\.\S+$/.test(value)) return 'Please enter a valid email address'
        if (value.length > 254) return 'Email must be less than 254 characters'
        return ''
      case 'message':
        if (!value.trim()) return 'Message is required'
        if (value.trim().length < 10) return 'Message must be at least 10 characters'
        if (value.trim().length > 500) return 'Message must be less than 500 characters'
        return ''
      default: return ''
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
    setFormData(prev => ({ ...prev, [name]: value }))
    const error = validateField(name, value)
    if (error !== errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus(null)
    setSubmitMessage('')

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)
      
      const response = await window.fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      const result = await response.json()
      if (result.success) {
        setSubmitStatus('success')
        setSubmitMessage(result.message || 'Thank you for your message! I\'ll get back to you soon.')
        setFormData({ name: '', email: '', message: '' })
        setErrors({ name: '', email: '', message: '' })
      } else {
        throw new Error(result.message || 'Failed to send message')
      }
    } catch (error) {
      setSubmitStatus('error')
      setSubmitMessage(error instanceof Error ? error.message : 'Error sending message')
      const formElement = document.querySelector('form')
      if (formElement) {
        formElement.classList.add('animate-shake')
        setTimeout(() => formElement.classList.remove('animate-shake'), 1000)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClasses = 'w-full px-4 py-4 bg-black/40 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300 text-white placeholder-gray-500 backdrop-blur-sm'
  const labelClasses = 'block text-sm font-semibold mb-2 text-gray-300 ml-1'

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="glass p-8 rounded-xl max-w-2xl mx-auto border border-white/5 relative overflow-hidden backdrop-blur-xl bg-black/50 hover:border-cyan-500/20 transition-colors">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-cyan-500/20 rounded-xl text-cyan-400">
          <Mail className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-white">Send a Message</h2>
      </div>

      <form noValidate onSubmit={onSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className={labelClasses}>
              <User className="w-4 h-4 inline mr-2 text-cyan-500" />
              Name *
            </label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} onBlur={handleBlur} className={inputClasses} placeholder="Your full name" />
            {errors.name && <span className="text-red-400 text-sm mt-1 block px-1">{errors.name}</span>}
          </div>

          <div>
            <label htmlFor="email" className={labelClasses}>
              <Mail className="w-4 h-4 inline mr-2 text-cyan-500" />
              Email *
            </label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} onBlur={handleBlur} className={inputClasses} placeholder="your.email@example.com" aria-describedby={errors.email ? "email-error" : undefined} />
            {errors.email && <span id="email-error" className="text-red-400 text-sm mt-1 block px-1">{errors.email}</span>}
          </div>
        </div>

        <div>
          <label htmlFor="message" className={labelClasses}>
            <MessageSquare className="w-4 h-4 inline mr-2 text-cyan-500" />
            Message *
          </label>
          <textarea id="message" name="message" rows={6} value={formData.message} onChange={handleInputChange} onBlur={handleBlur} className={`${inputClasses} resize-none`} placeholder="Tell me about your project, idea, or just say hello..." aria-describedby={errors.message ? "message-error" : undefined} />
          {errors.message && <span id="message-error" className="text-red-400 text-sm mt-1 block px-1">{errors.message}</span>}
        </div>

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

        <motion.button type="submit" disabled={isSubmitting || submitStatus === 'success'} whileHover={!isSubmitting && submitStatus !== 'success' ? { scale: 1.02, y: -2 } : {}} whileTap={!isSubmitting && submitStatus !== 'success' ? { scale: 0.98 } : {}} className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold transition-all duration-500 relative overflow-hidden ${submitStatus === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'bg-gradient-to-r from-cyan-600 to-cyan-400 text-black hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] disabled:opacity-70 disabled:grayscale border border-transparent'}`} aria-busy={isSubmitting}>
          {submitStatus === 'success' ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Message Sent Successfully!</span>
            </motion.div>
          ) : isSubmitting ? (
             <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex items-center gap-2">
               <Send className="w-5 h-5 animate-pulse text-cyan-900" />
               <span className="text-cyan-950">Sending Message...</span>
               <div className="absolute inset-0 bg-white/20 animate-[shimmer_1s_infinite] -skew-x-12" />
             </motion.div>
          ) : (
            <div className="flex items-center gap-2 relative z-10 group">
              <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              <span>Send Message</span>
            </div>
          )}
        </motion.button>
      </form>
    </motion.div>
  )
}
