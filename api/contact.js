// Simple JavaScript version of contact handler for testing
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ 
      success: false, 
      message: `Method ${req.method} not allowed` 
    });
  }

  // For testing purposes, just return success
  return res.status(200).json({
    success: true,
    message: 'Message sent successfully! I\'ll get back to you soon.'
  });
};