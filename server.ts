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

import path from 'path';
import { fileURLToPath } from 'url';

// Convert import.meta.url to __dirname equivalent in ES modules if needed, or just use process.cwd()
const __dirname = path.resolve();

// API routes
app.post('/api/contact', (req, res) => contactHandler(req as any, res as any));

// Handle preflight requests
app.options('/api/contact', cors(corsOptions));

// Serve static frontend files in production
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all route to serve React app for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
