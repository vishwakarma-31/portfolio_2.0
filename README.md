# 🚀 **Interactive Developer Portfolio**

**Last Updated: October 14, 2025**

<div align="center">

![Portfolio Preview](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.2-646CFF?style=for-the-badge&logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.18-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23.24-0055FF?style=for-the-badge&logo=framer)

[![Live Demo](https://img.shields.io/badge/Live_Demo-000000?style=for-the-badge&logo=vercel)](https://vishwakarma-31-portfolio.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)

*A modern, interactive developer portfolio with 3D graphics, smooth animations, and full-stack capabilities.*

[🎬 View Live Demo](https://vishwakarma-31-portfolio.vercel.app/) • [📖 Documentation](#-documentation) • [🚀 Quick Start](#-getting-started)

</div>

---

## 🌟 Features

### 🎨 Frontend Excellence
- **Interactive 3D Elements**: Three.js powered starfield background with cursor-reactive physics
- **Smooth Animations**: Framer Motion and GSAP for fluid page transitions and micro-interactions
- **3D Character**: Spline 3D avatar with optimized lazy loading
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Glassmorphism design with dark theme aesthetics
- **Performance Optimized**: Code splitting, lazy loading, and bundle optimization

### 🛠️ Full-Stack Capabilities
- **Contact Form**: Secure email service with Nodemailer
- **Rate Limiting**: Express-rate-limit for API protection
- **Security**: Helmet.js, CORS protection, and input validation
- **Environment Management**: Dotenv for secure configuration

### 🚀 Developer Experience
- **Vite Powered**: Lightning-fast development and build times
- **TypeScript**: Type-safe development experience
- **ESLint & Prettier**: Code quality and formatting standards
- **Modular Architecture**: Clean, maintainable code structure

## 🚀 Live Demo

🔗 **[View Live Portfolio](https://vishwakarma-31-portfolio.vercel.app/)**

## 🏗️ Project Status

**Current Version:** 2.0.0  
**Last Updated:** October 14, 2025  
**Status:** ✅ Production Ready

## 📦 Tech Stack

### Frontend
- **React 18** - Component-based UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **Framer Motion** - Production-ready motion library
- **GSAP** - Professional-grade animation library
- **Spline** - 3D design and animation tool

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Nodemailer** - Email sending library
- **Dotenv** - Environment variable management

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Concurrently** - Run multiple commands simultaneously

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vishwakarma-31/portfolio_2.0.git
   cd portfolio_2.0
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your configuration:
   ```env
   # Email Configuration (for contact form)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your_16_character_app_password
   RECIPIENT_EMAIL=your-email@gmail.com

   # Frontend URL (for CORS)
   FRONTEND_URL=http://localhost:5173

   # Server Port
   PORT=3001

   # Vite Environment Variables
   VITE_API_URL=http://localhost:3001
   ```

4. **Start the development server**
   ```bash
   # Start frontend only
   npm run dev
   
   # Start both frontend and backend
   npm run dev:full
   ```

### Available Scripts

```bash
# Development
npm run dev          # Start frontend development server
npm run dev:full     # Start both frontend and backend servers
npm run server       # Start backend server only

# Production
npm run build        # Build for production
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint
npm run test:run     # Run tests (placeholder)
```

## 📁 Project Structure

```
portfolio_2.0/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   ├── config/             # App/site constants and URLs
│   ├── data/               # Static data files
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Page components
│   ├── types/              # TypeScript types
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Application entry point
├── server.ts               # Backend server
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies and scripts
```

## 🎯 Key Components

### 3D Interactive Background
The portfolio features a dynamic 3D starfield background powered by Three.js and React Three Fiber. Stars react to cursor movement with gravitational physics, creating an immersive experience.

### Spline 3D Character
A 3D avatar created with Spline and integrated using `@splinetool/react-spline`. The character is optimized with lazy loading to prevent blocking the main thread.

### Magnetic Buttons
Interactive buttons that follow cursor movement for enhanced user engagement.

### Page Transitions
Smooth, animated transitions between pages using Framer Motion.

### Contact Form
Secure contact form with email notifications and auto-replies, protected by rate limiting and input validation.

## 🔐 Security

This project implements:
- Input validation & sanitization with express-validator
- Rate limiting (5 requests/15min) with express-rate-limit
- CORS protection with origin whitelisting
- Helmet.js security headers
- Content Security Policy (CSP)
- Environment variable validation
- XSS prevention with input escaping

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
# Build for production
npm run build

# Serve production build
npm run preview
```

## 📈 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Bundle Optimization**: Code splitting and lazy loading
- **3D Performance**: Optimized particle systems and animations
- **Mobile Responsive**: Works on all device sizes

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

**Aryan Vishwakarma** - [anujaryan81018@gmail.com](mailto:anujaryan81018@gmail.com)

Project Link: [https://github.com/vishwakarma-31/portfolio_2.0](https://github.com/vishwakarma-31/portfolio_2.0)

---

<p align="center">
  Made with ❤️ and ☕ by Aryan Vishwakarma
</p>
