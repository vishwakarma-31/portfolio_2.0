/// <reference types="node" />
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactHandler from './api/contact';

// Load environment variables
dotenv.config();

const app = express();

// Get port from environment variables with safe defaults
// eslint-disable-next-line no-undef
const PORT = typeof process !== 'undefined' && process.env && process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

// Configure CORS with restricted origins
// eslint-disable-next-line no-undef
const allowedOrigin = (typeof process !== 'undefined' && process.env && process.env.VITE_SITE_URL) || (typeof process !== 'undefined' && process.env && process.env.FRONTEND_URL) || 'http://localhost:3000';
const corsOptions = {
  origin: allowedOrigin,
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// API routes
app.post('/api/contact', contactHandler);

// Handle preflight requests
app.options('/api/contact', cors(corsOptions));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});