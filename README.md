# 🚀 **Clean Developer Portfolio**

<div align="center">

![Portfolio Preview](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1.5-646CFF?style=for-the-badge&logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0.0-0055FF?style=for-the-badge&logo=framer)

[![Live Demo](https://img.shields.io/badge/Live_Demo-000000?style=for-the-badge&logo=vercel)](https://portfolio-alpha-neon-54.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)

*A clean, optimized developer portfolio with smooth animations, 3D elements, and modern dark theme design.*

[🎬 View Live Demo](https://portfolio-alpha-neon-54.vercel.app/) • [📖 Documentation](#-documentation) • [🚀 Quick Start](#-getting-started)

</div>

---

## ✨ **Features**

### 🎨 **Modern UI/UX**
- **Responsive Design**: Mobile-first approach with perfect cross-device compatibility
- **Dark Theme**: Consistent dark mode design throughout the application
- **Smooth Animations**: Optimized page transitions and scroll-revealed content
- **Interactive Elements**: Magnetic hover effects, dynamic cursor, and 3D transforms
- **Glass Morphism**: Modern glassmorphism effects with backdrop blur
- **3D Character**: Interactive Spline 3D character on the homepage

### 🚀 **Performance & Architecture**
- **Lightning Fast**: Optimized with Vite for sub-second load times
- **Clean Code**: Streamlined architecture with reusable components
- **Code Splitting**: Lazy loading for routes and components
- **Unified Components**: Single `UnifiedCard` component for consistent design
- **Optimized Bundle**: Reduced CSS size and eliminated unused code
- **Error Boundaries**: Graceful error handling with user-friendly fallbacks

### 🔧 **Backend Integration**
- **Contact Form**: Full-stack contact form with email notifications
- **Rate Limiting**: Protection against spam and abuse
- **Security**: Helmet.js, CORS, input validation, and sanitization
- **Error Handling**: Comprehensive error management and logging

### 🧪 **Testing & Quality**
- **Unit Tests**: Test coverage with Vitest
- **Integration Tests**: React Testing Library
- **Accessibility Tests**: Automated a11y testing with jest-axe
- **Type Safety**: Full TypeScript coverage with strict mode

### 📊 **Developer Experience**
- **Hot Reload**: Instant development feedback with Vite
- **TypeScript**: Full type safety and IntelliSense support
- **ESLint + Prettier**: Automated code formatting and linting
- **Clean Architecture**: Modular, reusable components and hooks

---

## 🖼️ **Screenshots**

<div align="center">

### Desktop View
![Desktop Screenshot](./public/screenshots/desktop.png)

### Mobile View
![Mobile Screenshot](./public/screenshots/mobile.png)

### Interactive Elements
![Interactive Elements](./public/screenshots/interactive.png)

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
  "React Router": "6.8.0",
  "Spline": "4.1.0"
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
│   ├── images/               # Images and photos
│   └── manifest.json         # PWA manifest
├── src/
│   ├── components/          # Reusable components
│   │   ├── UnifiedCard.tsx     # Main card component
│   │   ├── Navbar.tsx          # Navigation component
│   │   ├── ContactForm.tsx     # Contact form
│   │   ├── ThreeBackground.tsx # 3D background
│   │   ├── SplineLoader.tsx    # 3D character loader
│   │   └── index.ts            # Component exports
│   ├── pages/              # Page components
│   │   ├── Home.tsx            # Homepage
│   │   ├── Skills.tsx          # Skills page
│   │   ├── Experience.tsx      # Experience page
│   │   ├── Projects.tsx        # Projects page
│   │   ├── Education.tsx       # Education page
│   │   └── Contact.tsx         # Contact page
│   ├── hooks/              # Custom React hooks
│   │   ├── useScrollReveal.ts  # Scroll animations
│   │   ├── useReusableAnimations.js # GSAP animations
│   │   └── useRouteOptimization.ts # Performance hooks
│   ├── context/            # React context
│   │   └── ThemeContext.tsx    # Theme provider (dark mode)
│   ├── data/               # Static data
│   │   └── projects.ts         # Project data
│   ├── types/              # TypeScript types
│   │   └── index.ts            # Type definitions
│   ├── utils/              # Utility functions
│   │   ├── cacheManager.ts     # Cache management
│   │   └── performanceMonitor.ts # Performance tracking
│   └── _tests_/            # Test files
│       ├── ContactForm.test.tsx
│       └── accessibility.test.tsx
├── server.js               # Backend server
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
├── vitest.config.js        # Test configuration
├── tailwind.config.js      # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
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

| Metric | Score | Target | Status |
|--------|-------|--------|---------|
| **Performance** | 95+ | 90+ | ✅ Optimized |
| **Accessibility** | 98+ | 95+ | ✅ Excellent |
| **Best Practices** | 95+ | 90+ | ✅ Clean Code |
| **SEO** | 100 | 90+ | ✅ Perfect |
| **Bundle Size (CSS)** | 41.42 kB | <50 kB | ✅ Reduced |
| **First Contentful Paint** | <1.5s | <2s | ✅ Fast |
| **Largest Contentful Paint** | <2.5s | <4s | ✅ Smooth |
| **Build Time** | ~18s | <30s | ✅ Efficient |

---

## 🧙 **Code Architecture & Optimization**

This portfolio has been meticulously optimized for performance, maintainability, and clean architecture:

### **🎨 Unified Design System**
- **Single Card Component**: `UnifiedCard` component used throughout for consistency
- **Theme Consistency**: Dark mode design with glass morphism effects
- **Animation Harmony**: Coordinated scroll reveals and hover effects

### **🚀 Performance Optimizations**
- **Bundle Size Reduction**: CSS reduced from 46.06 kB to 41.42 kB
- **Dead Code Elimination**: Removed 7+ unused components
- **Dependency Cleanup**: Removed 4+ unused npm packages
- **Animation Streamlining**: Kept only impactful animations

### **🧑‍💻 Code Quality**
- **TypeScript Strict Mode**: Full type safety across the codebase
- **Component Reusability**: DRY principle with shared components
- **Clean Imports**: Organized import structure and exports
- **Error Handling**: Comprehensive error boundaries

### **🎆 Preserved Features**
- ✨ **Dynamic Cursor**: Interactive cursor effects maintained
- 🌌 **3D Elements**: Spline character and Three.js background
- 🎨 **Smooth Animations**: Page transitions and scroll reveals
- 📱 **Responsive Design**: Perfect on all device sizes

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

### **Recently Completed ✅**
- ✅ Clean architecture with reusable components
- ✅ Unified card system for consistent design
- ✅ Performance optimization and bundle size reduction
- ✅ Theme simplification (dark mode only)
- ✅ Code cleanup and removal of unused dependencies
- ✅ Streamlined animation system
- ✅ Enhanced 3D elements and interactive cursor
- ✅ Comprehensive error handling

### **Current Features 🚀**
- ✅ Interactive Spline 3D character
- ✅ Smooth page transitions
- ✅ Dynamic cursor effects
- ✅ Contact form with backend integration
- ✅ Responsive design for all devices
- ✅ TypeScript for type safety
- ✅ Testing suite with Vitest

### **Future Enhancements 🔎**
- 🔄 Blog/CMS integration
- 🔄 Analytics dashboard
- 🔄 Progressive Web App features
- 🔄 Multi-language support (i18n)
- 🔄 Enhanced accessibility features
- 🔄 Advanced portfolio analytics

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

**Gmail Configuration**
To securely send emails from your portfolio, you need to generate a special App Password from your Google Account. A regular password will not work due to Google's security measures.

*Step 1: Enable 2-Step Verification*
1. Go to your Google Account
2. Navigate to the Security tab
3. Under "Signing in to Google," select 2-Step Verification and follow the on-screen steps to enable it if you haven't already

*Step 2: Generate an App Password*
1. On the same Security page, find and click on App passwords. You may need to sign in again
2. Under "Select app," choose Mail
3. Under "Select device," choose Other (Custom name)
4. Name it something descriptive, like "Portfolio Contact Form," and click Generate
5. Google will generate a 16-character password. Copy this password immediately (without the spaces). This is the password you will use in your .env file

*Step 3: Update Your .env File*
Open your project's .env file and set the following variables:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your_16_character_app_password
RECIPIENT_EMAIL=your-email@gmail.com
```

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
- **Email**: anujaryan81018@gmail.com

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

**Made with ❤️ by Aryan Vishwakarma**

⭐ **Star this repo if you found it helpful!**

[⬆️ Back to Top](#-ultimate-developer-portfolio)

</div>