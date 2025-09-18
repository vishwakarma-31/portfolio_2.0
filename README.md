# 🚀 **Ultimate Developer Portfolio**

<div align="center">

![Portfolio Preview](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1.5-646CFF?style=for-the-badge&logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0.0-0055FF?style=for-the-badge&logo=framer)

[![Live Demo](https://img.shields.io/badge/Live_Demo-000000?style=for-the-badge&logo=vercel)](https://portfolio-alpha-neon-54.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)

*A cutting-edge, pixel-perfect developer portfolio with advanced animations, backend integration, and comprehensive testing suite.*

[🎬 View Live Demo](https://portfolio-alpha-neon-54.vercel.app/) • [📖 Documentation](#-documentation) • [🚀 Quick Start](#-getting-started)

</div>

---

## ✨ **Features**

### 🎨 **Advanced UI/UX**
- **Responsive Design**: Mobile-first approach with perfect cross-device compatibility
- **Dark/Light Mode**: Seamless theme switching with localStorage persistence
- **Advanced Animations**: 50+ floating particles, sparkles, falling stars, and smooth transitions
- **Interactive Elements**: Magnetic hover effects, dynamic cursor, and micro-interactions
- **Glass Morphism**: Modern glassmorphism effects with backdrop blur

### 🚀 **Performance & Optimization**
- **Lightning Fast**: Optimized with Vite for sub-second load times
- **Code Splitting**: Lazy loading for routes and components
- **SEO Optimized**: Meta tags, structured data, and social sharing
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation
- **Error Boundaries**: Graceful error handling with user-friendly fallbacks
- **Progressive Web App**: Offline support and native app-like Certification
- **Performance Monitoring**: Lighthouse CI integration with automated scoring

### 🔧 **Backend Integration**
- **Contact Form**: Full-stack contact form with email notifications
- **Rate Limiting**: Protection against spam and abuse
- **Auto-Reply**: Automated thank-you emails to form submitters
- **Security**: Helmet.js, CORS, input validation, and sanitization
- **Error Handling**: Comprehensive error management and logging

### 🧪 **Testing & Quality**
- **Unit Tests**: Comprehensive test coverage with Vitest
- **Integration Tests**: End-to-end testing with React Testing Library
- **Accessibility Tests**: Automated a11y testing with jest-axe
- **Performance Tests**: Lighthouse CI for continuous performance monitoring
- **Type Safety**: Full TypeScript coverage with strict mode

### 📊 **Developer Certification**
- **Hot Reload**: Instant development feedback with Vite
- **TypeScript**: Full type safety and IntelliSense support
- **ESLint + Prettier**: Automated code formatting and linting
- **GitHub Actions**: Automated CI/CD pipeline with quality gates
- **Modular Architecture**: Reusable components and hooks system

---

## 🖼️ **Screenshots**

<div align="center">

### Desktop View
![Desktop Screenshot](./public/screenshots/desktop.png)

### Mobile View
![Mobile Screenshot](./public/screenshots/mobile.png)

### Dark Mode
![Dark Mode Screenshot](./public/screenshots/dark-mode.png)

</div>

---

## 🛠️ **Tech Stack**

### **Frontend**
```json
{
  "React": "18.2.0",
  "Vite": "7.1.5",
  "TypeScript": "18.0.28",
  "Tailwind CSS": "3.3.3",
  "Framer Motion": "11.0.0",
  "GSAP": "3.12.5",
  "Three.js": "0.160.0",
  "React Router": "6.8.0"
}
```

### **Backend**
```json
{
  "Node.js": "20.x",
  "Express.js": "4.18.2",
  "Nodemailer": "6.9.7",
  "Helmet": "7.1.0",
  "CORS": "2.8.5",
  "Express Rate Limit": "7.1.5"
}
```

### **Testing & Quality**
```json
{
  "Vitest": "3.2.4",
  "React Testing Library": "14.0.0",
  "@testing-library/jest-dom": "6.0.0",
  "jest-axe": "8.0.0",
  "Lighthouse CI": "10.x",
  "ESLint": "8.38.0",
  "Prettier": "3.0.0"
}
```

### **Deployment & CI/CD**
```json
{
  "Vercel": "Frontend Deployment",
  "Railway": "Backend Deployment",
  "GitHub Actions": "CI/CD Pipeline",
  "Codecov": "Coverage Reports",
  "Slack": "Notifications"
}
```

---

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 20.x or higher
- npm or yarn package manager
- Git

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file in the root directory:
   ```env
   # Frontend Configuration
   VITE_API_URL=http://localhost:3001

   # Backend Configuration
   PORT=3001
   FRONTEND_URL=http://localhost:5173

   # Email Configuration (Gmail SMTP)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   RECIPIENT_EMAIL=your-email@gmail.com

   # Optional: Slack Notifications
   SLACK_WEBHOOK_URL=your-slack-webhook-url
   ```

4. **Start Development Servers**

   **Option A: Run both frontend and backend together**
   ```bash
   npm run dev:full
   ```

   **Option B: Run separately**
   ```bash
   # Terminal 1: Backend
   npm run server

   # Terminal 2: Frontend
   npm run dev
   ```

5. **Open your browser**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:3001](http://localhost:3001)

---

## 📁 **Project Structure**

```
portfolio/
├── public/                    # Static assets
│   ├── screenshots/          # Demo screenshots
│   └── icons/               # App icons
├── src/
│   ├── components/          # Reusable components
│   │   ├── ui/             # UI components
│   │   ├── animations/     # Animation components
│   │   └── forms/          # Form components
│   ├── pages/              # Page components
│   ├── hooks/              # Custom React hooks
│   ├── context/            # React context providers
│   ├── data/               # Static data files
│   ├── styles/             # Global styles
│   ├── utils/              # Utility functions
│   └── test/               # Test utilities
├── server.js               # Backend server
├── vitest.config.js        # Test configuration
├── tailwind.config.js      # Tailwind configuration
├── .lighthouserc.json     # Lighthouse CI config
└── .github/
    └── workflows/          # GitHub Actions
```

---

## 🧪 **Testing**

### **Run Tests**
```bash
# Run all tests
npm run test:run

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage

# Run accessibility tests
npm run test:a11y
```

### **Test Structure**
```
src/_tests_/
├── ContactForm.test.tsx     # Contact form tests
├── accessibility.test.tsx   # Accessibility tests
├── components/              # Component tests
├── pages/                   # Page tests
├── hooks/                   # Hook tests
└── utils/                   # Utility tests
```

---

## 🚀 **Deployment**

### **Frontend (Vercel)**
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### **Backend (Railway)**
1. Create a new project on Railway
2. Connect your GitHub repository
3. Set environment variables
4. Deploy with automatic scaling

### **Environment Variables for Production**
```env
# Production URLs
VITE_API_URL=https://your-backend-url.railway.app
FRONTEND_URL=https://your-portfolio.vercel.app

# Email Configuration
EMAIL_USER=your-production-email@gmail.com
EMAIL_PASS=your-production-app-password
RECIPIENT_EMAIL=your-email@gmail.com
```

---

## 🎨 **Customization**

### **Personal Information**
Edit the following files to customize your portfolio:

- `src/data/projects.ts` - Your projects and portfolio items
- `src/data/personal.ts` - Personal information and bio
- `src/data/skills.ts` - Skills and technologies
- `src/data/Certification.ts` - Work Certification and education

### **Styling**
- `src/styles/globals.css` - Global styles and CSS variables
- `tailwind.config.js` - Tailwind configuration and custom colors
- `src/components/theme/` - Theme-related components

### **Content Management**
- `src/data/` - All static content and data
- `public/` - Images, icons, and other assets
- `src/components/` - Reusable UI components

---

## 📊 **Performance Metrics**

| Metric | Score | Target |
|--------|-------|--------|
| **Performance** | 95+ | 90+ |
| **Accessibility** | 98+ | 95+ |
| **Best Practices** | 95+ | 90+ |
| **SEO** | 100 | 90+ |
| **First Contentful Paint** | <1.5s | <2s |
| **Largest Contentful Paint** | <2.5s | <4s |

---

## 🤝 **Contributing**

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests**
   ```bash
   npm run test:run
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### **Development Guidelines**
- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass
- Follow semantic commit messages

---

## 📝 **API Documentation**

### **Contact Form Endpoint**
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to work with you!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully! I'll get back to you soon."
}
```

### **Health Check**
```http
GET /api/health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 3600
}
```

---

## 🔒 **Security**

- **Rate Limiting**: 5 requests per 15 minutes per IP
- **Input Validation**: Server-side validation and sanitization
- **CORS Protection**: Configured for allowed origins
- **Helmet.js**: Security headers and protections
- **Environment Variables**: Sensitive data stored securely

---

## 📈 **Roadmap**

### **Phase 1 (Current)**
- ✅ Advanced animations and effects
- ✅ Backend integration
- ✅ Comprehensive testing
- ✅ CI/CD pipeline
- ✅ Performance optimization
- ✅ Code splitting and lazy loading
- ✅ Error boundaries
- ✅ TypeScript standardization

### **Phase 2 (Upcoming)**
- 🔄 Blog/CMS integration
- 🔄 Multi-language support (i18n)
- 🔄 Admin dashboard
- 🔄 Analytics integration
- 🔄 Progressive Web App features

### **Phase 3 (Future)**
- 🔄 AI-powered features
- 🔄 Real-time collaboration
- 🔄 Advanced portfolio analytics
- 🔄 Mobile app companion

---

## 🐛 **Troubleshooting**

### **Common Issues**

**Port already in use**
```bash
# Kill process on port 5173
npx kill-port 5173

# Kill process on port 3001
npx kill-port 3001
```

**Email not sending**
- Check your Gmail app password
- Verify environment variables
- Check server logs for errors

**Tests failing**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run test:run
```

---

## 📞 **Support**

- **Issues**: [GitHub Issues](https://github.com/your-username/portfolio/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/portfolio/discussions)
- **Email**: your-email@example.com

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- **React Team** for the amazing framework
- **Vite Team** for the blazing fast build tool
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for the smooth animations
- **All contributors** who helped make this project better

---

<div align="center">

**Made with ❤️ by [Your Name]**

⭐ **Star this repo if you found it helpful!**

[⬆️ Back to Top](#-ultimate-developer-portfolio)

</div>