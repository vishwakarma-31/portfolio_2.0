import express from 'express'
import nodemailer from 'nodemailer'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Security middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per windowMs
  message: 'Too many contact form submissions, please try again later.'
})
app.use('/api/contact', limiter)

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

// Validate email configuration
transporter.verify((error) => {
  if (error) {
    console.error('Email configuration error:', error)
  } else {
    console.log('Email server is ready to send messages')
  }
})

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      })
    }

    // Sanitize inputs
    const escapeHtml = (value) =>
      String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')

    const sanitizedName = escapeHtml(name.trim())
    const sanitizedEmail = escapeHtml(email.trim())
    const sanitizedMessage = escapeHtml(message.trim())

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
      subject: `Portfolio Contact: Message from ${sanitizedName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <p><strong>Name:</strong> ${sanitizedName}</p>
            <p><strong>Email:</strong> <a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #007bff;">
              ${sanitizedMessage.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 12px;">
            <p>This message was sent from your portfolio contact form.</p>
            <p>Timestamp: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
      replyTo: sanitizedEmail
    }

    // Send email
    await transporter.sendMail(mailOptions)

    // Auto-reply to sender
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: sanitizedEmail,
      subject: 'Thank you for contacting me!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #007bff;">Thank You for Reaching Out!</h2>
          <p>Hi ${sanitizedName},</p>
          <p>Thank you for contacting me through my portfolio. I've received your message and will get back to you as soon as possible, typically within 24 hours.</p>
          <div style="background: #f8f9fa; padding: 15px; margin: 20px 0; border-radius: 4px;">
            <p><strong>Your message:</strong></p>
            <p style="font-style: italic;">"${sanitizedMessage}"</p>
          </div>
          <p>Best regards,<br>
          Your Name<br>
          Full Stack Developer<br>
          <a href="mailto:${process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER}">Email me</a></p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 12px;">
            <p>This is an automated response. Please do not reply to this email.</p>
          </div>
        </div>
      `
    }

    // Send auto-reply (don't fail if this fails)
    try {
      await transporter.sendMail(autoReplyOptions)
    } catch (autoReplyError) {
      console.warn('Auto-reply failed:', autoReplyError.message)
    }

    res.status(200).json({
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.'
    })

  } catch (error) {
    console.error('Contact form error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    })
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error)
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  })
})

app.listen(PORT, () => {
  console.log(`Portfolio backend server running on port ${PORT}`)
  console.log(`Email service: ${process.env.EMAIL_USER ? 'Configured' : 'Not configured'}`)
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`)
})