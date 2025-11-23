import nodemailer from 'nodemailer';

// Validate required environment variables
function validateEnv() {
  const required = [
    'EMAIL_USER',
    'EMAIL_PASS',
    'RECIPIENT_EMAIL'
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
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

// Helper function to escape HTML and prevent XSS
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}

// Simple validation function
function validateContactData(data) {
  const errors = [];
  
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2 || data.name.trim().length > 100) {
    errors.push({ param: 'name', msg: 'Name must be between 2 and 100 characters' });
  }
  
  if (!data.email || typeof data.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push({ param: 'email', msg: 'Must be a valid email address' });
  }
  
  if (!data.message || typeof data.message !== 'string' || data.message.trim().length < 10 || data.message.trim().length > 1000) {
    errors.push({ param: 'message', msg: 'Message must be between 10 and 1000 characters' });
  }
  
  // Check that message has actual content (not just whitespace)
  if (data.message && data.message.trim().length === 0) {
    errors.push({ param: 'message', msg: 'Message cannot be only whitespace' });
  }
  
  return errors;
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
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

  const { name, email, message } = req.body;

  // Validate contact data
  const errors = validateContactData({ name, email, message });
  if (errors.length > 0) {
    return res.status(400).json({ 
      success: false, 
      errors: errors 
    });
  }

  try {
    // Email transporter configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Sanitize inputs for HTML email
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

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
    };

    // Send email
    await transporter.sendMail(mailOptions);

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
    };

    // Send auto-reply (don't fail if this fails)
    try {
      await transporter.sendMail(autoReplyOptions);
    } catch (autoReplyError) {
      console.warn('Auto-reply failed:', autoReplyError.message);
    }

    res.status(200).json({
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.'
    });

  } catch (error) {
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