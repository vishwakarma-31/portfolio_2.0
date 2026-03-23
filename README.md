# 🚀 **Aryan Vishwakarma — Interactive Developer Portfolio**

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-Black?style=for-the-badge&logo=three.js&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white)

[![Live Demo](https://img.shields.io/badge/Live_Demo-000000?style=for-the-badge&logo=vercel)](https://vishwakarma-31-portfolio.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

*A modern, interactive developer portfolio showcasing 3D graphics, seamless scroll animations, and full-stack capabilities.*

[🎮 View Live Demo](https://vishwakarma-31-portfolio.vercel.app/) • [📖 Features](#-features) • [🚀 Quick Start](#-getting-started)

</div>

---

## 🌟 Features

### 🎨 Frontend Excellence
- **Interactive 3D Elements**: Custom Three.js powered starfield background with cursor-reactive physics and smooth parallax.
- **Fluid Animations**: Scroll-linked animations and micro-interactions powered by Framer Motion and GSAP.
- **Glassmorphism UI**: Modern aesthetic utilizing backdrop-filters, dark themes, and dynamic neon glows.
- **Performance Optimized**: Highly optimized asset delivery, code splitting, and fully responsive across all devices.

### 🛠️ Backend Integration
- **Serverless-Ready API**: Express.js endpoints configured for contact form submissions.
- **Secure Emailing**: Integrated NodeMailer for safe cross-origin communication.
- **Security Layers**: Uses Helmet.js, rate limiting, and standard CORS protection to secure API routes.

### ⚙️ Developer Experience
- **Vite Build System**: Lightning-fast Hot Module Replacement (HMR) and optimized production bundles.
- **Strict TypeScript**: End-to-end type safety protecting data integrity.
- **SEO Ready**: Configured `canonical` links, `robots.txt`, XML sitemaps, and detailed `application/ld+json` schema for maximum search-ability.

## 🛠️ Tech Stack

**Frontend:**
- React 18
- TypeScript
- Tailwind CSS
- Three.js / React Three Fiber
- Framer Motion / GSAP

**Backend:**
- Node.js / Express.js
- Nodemailer
- Vite (Dev Server & Build Pipeline)

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` package manager

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
   *Edit the `.env` file with your credentials (SMTP configurations, ports, etc.).*

4. **Start the development servers**
   ```bash
   # Starts both the React frontend and Express backend concurrently
   npm run dev:all
   ```

### Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts only the Vite frontend server. |
| `npm run dev:api` | Starts only the Node.js Express internal backend. |
| `npm run dev:all` | Runs both frontend and backend concurrently. |
| `npm run build` | Compiles TypeScript and creates an optimized production bundle. |
| `npm run preview` | Serves the built production bundle locally. |

## 📁 Project Structure

```text
portfolio_2.0/
├── public/                 # Static assets, sitemap, robots.txt, SW
├── src/
│   ├── components/         # Reusable UI components (Cards, Forms, etc.)
│   ├── data/               # Static site data (Projects, Skills, Experience)
│   ├── hooks/              # Custom React animation and utility hooks
│   ├── pages/              # Main routing pages (Home, Projects, etc.)
│   ├── types/              # Global TypeScript interfaces
│   ├── utils/              # Helper functions and environment validators
│   ├── App.tsx             # Application router
│   └── main.tsx            # React DOM entry point
├── server.ts               # Express backend application
├── vite.config.js          # Vite configuration & chunking
└── tailwind.config.js      # Tailwind CSS theme configuration
```

## 🔒 Security Posture

This repository follows standard web security practices:
- Input validation & escaping via `express-validator`.
- Request rate limiting (`express-rate-limit`) preventing API abuse.
- Security header injection via `helmet`.
- Restrictive CORS bridging protecting `.env` variables from unauthorized domains.

## 🚀 Deployment

The portfolio is optimally configured for zero-config deployments using **Vercel**. 

1. Connect your GitHub repository to [Vercel](https://vercel.com/).
2. Load your environment variables into the Vercel project settings.
3. Deploy! Vercel automatically maps `server.ts` routes via its serverless function compatibility.

*(Manual deployment is fully supported via standard `npm run build` and serving the `./dist` folder).*

## 📈 Performance & SEO
- **Lighthouse**: 95+ performance across Best Practices, Accessibility, and SEO.
- **Search-Engine Indexed**: Embedded `Person` JSON-LD schema linking out to external authorities like LinkedIn and GitHub.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built by <strong>Aryan Vishwakarma</strong> • <a href="mailto:anujaryan81018@gmail.com">anujaryan81018@gmail.com</a>
</p>
