import express from 'express'
import nodemailer from 'nodemailer'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { body, validationResult } from 'express-validator'
// Validate required environment variables
function validateEnv() {
  const required = [
    'PORT',
    'FRONTEND_URL',
    'EMAIL_USER',
    'EMAIL_PASS',
    'RECIPIENT_EMAIL'
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      `Please check your .env file and ensure all required variables are set.`
    );
  }
}

dotenv.config();
validateEnv();

const app = express()
const PORT = process.env.PORT || 3001

// Enhanced Helmet configuration
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// CORS with whitelist
const isProduction = process.env.NODE_ENV === 'production'
const allowedOrigins = isProduction
  ? [process.env.FRONTEND_URL].filter(Boolean) // Only production URL in production
  : [
      process.env.FRONTEND_URL,
      'http://localhost:5173',
      'http://localhost:4173',
      'http://localhost:3000'
    ].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests) only in development
    if (!origin) {
      if (isProduction) {
        return callback(new Error('CORS: Origin header required in production'));
      }
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: Origin ${origin} is not allowed`));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}));

// Rate limiting with better config
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { 
    error: 'Too many contact requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Health check rate limiter (more lenient)
const healthLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // Allow more requests for monitoring
  message: {
    error: 'Too many health check requests, please try again later.',
    retryAfter: '1 minute'
  },
  standardHeaders: true,
  legacyHeaders: false
});

app.use('/api/contact', contactLimiter);
app.use('/api/health', healthLimiter);

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now()
  const timestamp = new Date().toISOString()
  
  res.on('finish', () => {
    const duration = Date.now() - start
    const logMessage = `${timestamp} ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`
    
    if (res.statusCode >= 400) {
      console.error(logMessage)
    } else {
      console.log(logMessage)
    }
  })
  
  next()
})

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
    console.error('❌ Email configuration error:', error)
    console.error('⚠️  Contact form will not work until email is properly configured')
    if (process.env.NODE_ENV === 'production') {
      // In production, this is critical - exit the application
      console.error('🚨 CRITICAL: Email service not available in production! Shutting down...')
      process.exit(1)
    }
  } else {
    console.log('✅ Email server is ready to send messages')
  }
})

// Contact form validation middleware
const validateContactForm = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .escape(),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Must be a valid email address')
    .normalizeEmail(),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message cannot be empty')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters')
    .custom((value) => {
      // Check that message has actual content (not just whitespace)
      if (value.trim().length === 0) {
        throw new Error('Message cannot be only whitespace')
      }
      return true
    })
    .escape()
];

// Helper function to escape HTML and prevent XSS
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return String(text).replace(/[&<>"']/g, m => map[m])
}

// Contact form endpoint
app.post('/api/contact', validateContactForm, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() 
    });
  }
  
  try {
    const { name, email, message } = req.body

    // Sanitize inputs for HTML email
    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>')

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
      subject: `Portfolio Contact: Message from ${safeName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #007bff;">
              ${safeMessage}
            </div>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 12px;">
            <p>This message was sent from your portfolio contact form.</p>
            <p>Timestamp: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
      replyTo: email
    }

    // Send email
    await transporter.sendMail(mailOptions)

    // Auto-reply to sender
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting me!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #007bff;">Thank You for Reaching Out!</h2>
          <p>Hi ${safeName},</p>
          <p>Thank you for contacting me through my portfolio. I've received your message and will get back to you as soon as possible, typically within 24 hours.</p>
          <div style="background: #f8f9fa; padding: 15px; margin: 20px 0; border-radius: 4px;">
            <p><strong>Your message:</strong></p>
            <p style="font-style: italic;">"${safeMessage}"</p>
          </div>
          <p>Best regards,<br>
          Aryan Vishwakarma<br>
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
    
    // Check if the error is related to email configuration
    if (error.code === 'EAUTH' || error.code === 'EENVELOPE') {
      res.status(500).json({
        success: false,
        message: 'Email service is currently unavailable. Please try again later or contact me directly.'
      })
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to send message. Please try again later.'
      })
    }
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: '2.0.0'
  });
});

// Detailed health check
app.get('/api/health/detailed', (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    checks: {
      database: 'N/A',
      emailService: process.env.EMAIL_USER ? 'Configured' : 'Not Configured',
      environment: process.env.NODE_ENV || 'development'
    }
  };
  
  try {
    res.status(200).send(healthcheck);
  } catch (error) {
    healthcheck.message = error;
    res.status(503).send(healthcheck);
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error)
  if (res.headersSent) {
    return next(error)
  }
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal server error'
  })
})

// 404 handler
app.use((req, res) => {
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