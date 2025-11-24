import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactHandler from './api/contact.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.post('/api/contact', (req, res) => {
  // Wrap the Vercel function handler
  contactHandler(req, res);
});

// Handle preflight requests
app.options('/api/contact', cors());

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});