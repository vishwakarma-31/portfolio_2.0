/// <reference types="node" />
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// Get port from environment variables with safe defaults
const PORT = typeof process !== 'undefined' && process.env && process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

// Configure CORS with restricted origins
const allowedOrigin = (typeof process !== 'undefined' && process.env && process.env.VITE_SITE_URL) || (typeof process !== 'undefined' && process.env && process.env.FRONTEND_URL) || 'http://localhost:5173';
const corsOptions = {
  origin: allowedOrigin,
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Import contact handler
import contactHandler from './api/contact';

// API routes
app.post('/api/contact', contactHandler);

// Handle preflight requests
app.options('/api/contact', cors(corsOptions));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
