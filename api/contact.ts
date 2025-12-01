/// <reference types="node" />
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { Request, Response } from 'express';

// Helper function to escape HTML and prevent XSS
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, (m) => map[m]);
}

// Utility function to safely access environment variables
const getEnvVar = (name: string, defaultValue?: string): string | undefined => {
  // Using typeof to avoid eslint errors
  // eslint-disable-next-line no-undef
  if (typeof process !== 'undefined' && process.env && process.env[name]) {
    // eslint-disable-next-line no-undef
    return process.env[name];
  }
  return defaultValue;
};

// Utility function to safely access environment variables as boolean
const getEnvVarAsBool = (name: string, defaultValue: boolean = false): boolean => {
  // eslint-disable-next-line no-undef
  if (typeof process !== 'undefined' && process.env && process.env[name]) {
    // eslint-disable-next-line no-undef
    return process.env[name]?.toLowerCase() === 'true';
  }
  return defaultValue;
};

// Utility function to safely access environment variables as number
const getEnvVarAsNumber = (name: string, defaultValue: number): number => {
  // eslint-disable-next-line no-undef
  if (typeof process !== 'undefined' && process.env && process.env[name]) {
    // eslint-disable-next-line no-undef
    const value = process.env[name];
    return value ? parseInt(value, 10) : defaultValue;
  }
  return defaultValue;
};

// Create transporter once (singleton pattern) for connection reuse
let transporter: nodemailer.Transporter;

// Initialize transporter function
const initializeTransporter = () => {
  if (transporter) return transporter;

  // Check if SMTP settings are provided (more flexible approach)
  const smtpHost = getEnvVar('SMTP_HOST');
  const smtpPort = getEnvVar('SMTP_PORT');
  
  if (smtpHost && smtpPort) {
    transporter = nodemailer.createTransport({
      host: smtpHost,
      port: getEnvVarAsNumber('SMTP_PORT', 587),
      secure: getEnvVarAsBool('SMTP_SECURE', false), // true for 465, false for other ports
      auth: {
        user: getEnvVar('EMAIL_USER', ''),
        pass: getEnvVar('EMAIL_PASS', '')
      }
    });
  } else {
    // Default to Gmail if no SMTP settings provided
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: getEnvVar('EMAIL_USER', ''),
        pass: getEnvVar('EMAIL_PASS', '')
      }
    });
  }

  return transporter;
};

// Zod schema for contact form validation
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().email("Must be a valid email address").max(254, "Email must be less than 254 characters"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters")
});

// Validate required environment variables
function validateEnv() {
  const required = [
    'EMAIL_USER',
    'EMAIL_PASS',
    'RECIPIENT_EMAIL'
  ];

  const missing = required.filter(key => !getEnvVar(key));

  if (missing.length > 0) {
    // In Vercel functions, we log the error but don't throw to prevent function crashes
    console.error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      `Please check your Vercel environment variables and ensure all required variables are set.`
    );
    return false;
  }
  return true;
}

export default async function handler(req: Request, res: Response) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ 
      success: false, 
      message: `Method ${req.method} not allowed` 
    });
  }

  // Validate environment variables
  if (!validateEnv()) {
    return res.status(500).json({
      success: false,
      message: 'Server configuration error. Please contact the site administrator.'
    });
  }

  try {
    // Parse and validate request body with Zod
    const { name, email, message } = contactSchema.parse(req.body);

    // Initialize transporter
    const transporter = initializeTransporter();

    // Verify transporter configuration before sending
    await transporter.verify();

    // Email options
    const mailOptions = {
      from: getEnvVar('EMAIL_USER', ''),
      to: getEnvVar('RECIPIENT_EMAIL', getEnvVar('EMAIL_USER', '')),
      subject: `Portfolio Contact: Message from ${escapeHtml(name)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #007bff;">
              ${escapeHtml(message).replace(/\n/g, '<br>')}
            </div>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 12px;">
            <p>This message was sent from your portfolio contact form.</p>
            <p>Timestamp: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
      replyTo: email
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Auto-reply to sender with improved template
    const autoReplyOptions = {
      from: getEnvVar('EMAIL_USER', ''),
      to: email,
      subject: 'Thank you for contacting me!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px; border-radius: 8px;">
          <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #007bff; margin-top: 0;">Thank You for Reaching Out!</h2>
            <p>Hi <strong>${escapeHtml(name)}</strong>,</p>
            <p>Thank you for contacting me through my portfolio. I've received your message and will get back to you as soon as possible, typically within 24 hours.</p>
            
            <div style="background: #f1f8ff; padding: 15px; margin: 20px 0; border-radius: 4px; border-left: 4px solid #007bff;">
              <p><strong>Your message:</strong></p>
              <p style="font-style: italic; margin: 10px 0;">"${escapeHtml(message).replace(/\n/g, '<br>')}">"</p>
            </div>
            
            <p>In the meantime, feel free to check out my <a href="${getEnvVar('PORTFOLIO_URL', 'https://vishwakarma-31-portfolio.vercel.app')}" style="color: #007bff; text-decoration: none;">portfolio</a> or connect with me on <a href="${getEnvVar('LINKEDIN_URL', 'https://linkedin.com')}" style="color: #007bff; text-decoration: none;">LinkedIn</a>.</p>
            
            <p>Best regards,<br>
            <strong>Aryan Vishwakarma</strong><br>
            Full Stack Developer</p>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 12px; text-align: center;">
            <p>This is an automated response. Please do not reply to this email.</p>
            <p>If you need immediate assistance, you can reach me directly at <a href="mailto:${getEnvVar('RECIPIENT_EMAIL', getEnvVar('EMAIL_USER', ''))}" style="color: #6c757d;">${getEnvVar('RECIPIENT_EMAIL', getEnvVar('EMAIL_USER', ''))}</a></p>
          </div>
        </div>
      `
    };

    // Send auto-reply (don't fail if this fails)
    try {
      await transporter.sendMail(autoReplyOptions);
    } catch (autoReplyError) {
      console.warn('Auto-reply failed:', autoReplyError);
      // Continue with success response even if auto-reply fails
    }

    res.status(200).json({
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.'
    });

  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        errors: error.issues.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
    }

    console.error('Contact form error:', error);
    
    // Check if the error is related to email configuration
    if (error.code === 'EAUTH' || error.code === 'EENVELOPE') {
      res.status(500).json({
        success: false,
        message: 'Email service is currently unavailable. Please try again later or contact me directly.'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to send message. Please try again later.'
      });
    }
  }
}