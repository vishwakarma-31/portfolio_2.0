// Full implementation of contact handler with proper timeout handling
import nodemailer from 'nodemailer';

// Helper function to escape HTML and prevent XSS
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, (m) => map[m]);
}

// Utility function to safely access environment variables
const getEnvVar = (name, defaultValue) => {
  if (typeof process !== 'undefined' && process.env && process.env[name]) {
    return process.env[name];
  }
  return defaultValue;
};

export default async function handler(req, res) {
  // Enable CORS for all origins (you might want to restrict this in production)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
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

  try {
    // Parse request body
    const { name, email, message } = req.body;

    // Simple validation
    if (!name || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Name must be at least 2 characters'
      });
    }
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }
    
    if (!message || message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Message must be at least 10 characters'
      });
    }

    // Log the received data
    console.log('Received contact form submission:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);

    // Check if email credentials are configured
    const emailUser = getEnvVar('EMAIL_USER');
    const emailPass = getEnvVar('EMAIL_PASS');
    const recipientEmail = getEnvVar('RECIPIENT_EMAIL');

    if (!emailUser || !emailPass || !recipientEmail) {
      console.warn('Email credentials not configured, skipping email sending');
      // Return success even without email sending for testing
      return res.status(200).json({
        success: true,
        message: 'Message received successfully! (Email sending is disabled in current configuration)'
      });
    }

    // Configure nodemailer with timeout
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Email options
    const mailOptions = {
      from: `"${name}" <${emailUser}>`,
      to: recipientEmail,
      replyTo: email,
      subject: `Portfolio Contact: Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background: #f8f9fa; padding: 20px; margin: 20px 0;">
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px;">
              ${escapeHtml(message).replace(/\n/g, '<br>')}
            </div>
          </div>
          <div style="color: #6c757d; font-size: 12px;">
            <p>This message was sent from your portfolio contact form.</p>
            <p>Timestamp: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `
    };

    // Send email with timeout
    try {
      console.log('Attempting to send email...');
      
      // Create a promise that rejects after 10 seconds
      const emailPromise = transporter.sendMail(mailOptions);
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Email sending timed out after 10 seconds')), 10000);
      });
      
      // Race between email sending and timeout
      await Promise.race([emailPromise, timeoutPromise]);
      
      console.log('Email sent successfully!');
    } catch (emailError) {
      console.error('Email sending failed:', emailError.message);
      // Don't fail the request if email sending fails, just log it
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process your message. Please try again later.'
    });
  }
}