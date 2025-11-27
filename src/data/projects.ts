export interface Project {
  id: string;
  name: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  images: string[];
  link?: string;
  github: string;
  tags: string[];
  category: 'web' | 'mobile' | 'ml' | 'fullstack';
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planned';
  timeline: string; // ISO date string format (YYYY-MM-DD)
  technologies: {
    frontend: string[];
    backend: string[];
    database: string[];
    tools: string[];
  };
  features: string[];
  challenges: string[];
  learnings: string[];
  metrics?: {
    users?: string;
    performance?: string;
    accuracy?: string;
  };
}

export const projects: Project[] = [
  {
    id: 'cropify-ml',
    name: 'Cropify',
    title: 'AI-Powered Crop Recommendation System',
    description: 'Developed an intelligent crop recommendation system that suggests optimal crops based on soil conditions, climate data, and environmental factors.',
    longDescription: 'Cropify leverages machine learning algorithms to analyze multiple agricultural parameters including soil type, pH levels, temperature, humidity, and rainfall patterns to provide farmers with data-driven crop recommendations. The system uses ensemble learning techniques combining Random Forest, SVM, and Neural Networks to achieve high prediction accuracy.',
    image: '/projects/Cropify.png',
    images: ['/projects/Cropify.png'],
    github: 'https://github.com/vishwakarma-31/Cropify-final',
    link: 'https://vishwakarma-31-cropify-final-cropii-3w4pzw.streamlit.app/',
    tags: ['Machine Learning', 'Python', 'Agriculture', 'Data Science', 'Random Forest'],
    category: 'ml',
    featured: true,
    status: 'completed',
    timeline: '2024-03-31',
    technologies: {
      frontend: ['React', 'Next.js', 'Tailwind CSS', 'Chart.js'],
      backend: ['Python', 'Flask', 'FastAPI'],
      database: ['MongoDB', 'PostgreSQL'],
      tools: ['Scikit-learn', 'Pandas', 'NumPy', 'Jupyter', 'Docker']
    },
    features: [
      'Multi-parameter crop analysis',
      'Real-time weather integration',
      'Soil condition assessment',
      'Historical data analysis',
      'Interactive recommendation dashboard',
      'Mobile-responsive design'
    ],
    challenges: [
      'Handling missing agricultural data',
      'Balancing multiple ML models',
      'Real-time weather API integration',
      'Optimizing prediction accuracy'
    ],
    learnings: [
      'Advanced ensemble learning techniques',
      'Agricultural domain knowledge',
      'Feature engineering for environmental data',
      'Model deployment and scaling'
    ],
    metrics: {
      accuracy: '94.2%',
      users: '500+ farmers tested',
      performance: '< 2s response time'
    }
  },
  {
    id: 'trading-bot',
    name: 'Telegram Trading Bot',
    title: 'Generic Trading Bot',
    description: 'A comprehensive trading bot system with real-time market analysis, automated trading, and administrative dashboard.',
    longDescription: 'Built a complete trading bot system featuring real-time market analysis, automated trading, and comprehensive admin controls. The platform handles concurrent trades, prevents double-trading, and provides real-time updates.',
    image: '/projects/Trading_Bot.png',
    images: ['/projects/Trading_Bot.png'],
    github: 'https://github.com/vishwakarma-31/trading_bot',
    link: 'https://vishwakarma-31-trading-bot-uitrading-bot-ui-fyerl5.streamlit.app/',
    tags: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Stripe', 'Socket.io'],
    category: 'fullstack',
    featured: true,
    status: 'completed',
    timeline: '2024-07-31',
    technologies: {
      frontend: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      backend: ['Node.js', 'Express.js', 'Socket.io', 'JWT'],
      database: ['MongoDB', 'Redis'],
      tools: ['Stripe API', 'Cloudinary', 'Vercel', 'Docker']
    },
    features: [
      'Real-time seat selection',
      'Secure payment processing',
      'User authentication & profiles',
      'Admin dashboard',
      'Movie & showtime management',
      'Booking history & tickets',
      'Email notifications',
      'Mobile-responsive design'
    ],
    challenges: [
      'Preventing concurrent booking conflicts',
      'Real-time seat status updates',
      'Payment security implementation',
      'Complex state management',
      'Database optimization for high traffic'
    ],
    learnings: [
      'Real-time application architecture',
      'Payment gateway integration',
      'Database transaction handling',
      'WebSocket implementation',
      'Production deployment strategies'
    ],
    metrics: {
      users: '1000+ registered users',
      performance: '99.9% uptime',
      accuracy: '100% booking accuracy'
    }
  },
  {
    id: 'fingerprint-detection',
    name: 'Fake Fingerprint Detection',
    title: 'AI-Based Biometric Security System',
    description: 'Machine learning system designed to enhance biometric security by distinguishing between live and fake fingerprints using advanced image analysis.',
    longDescription: 'Developed an intelligent biometric security solution that analyzes textural and structural features of fingerprint images to classify them as authentic or fraudulent. The system uses computer vision techniques and deep learning models to detect spoofing attempts and enhance security systems.',
    image: '/projects/fingerprint-cover.jpg',
    images: ['/projects/fingerprint-1.jpg', '/projects/fingerprint-2.jpg', '/projects/fingerprint-3.jpg'],
    github: 'https://github.com/Aryan2764/Fake-Fingerprint-Detection',
    link: 'https://fingerprint-detection.vercel.app',
    tags: ['Machine Learning', 'Computer Vision', 'Python', 'OpenCV', 'Security'],
    category: 'ml',
    featured: true,
    status: 'completed',
    timeline: '2024-09-30',
    technologies: {
      frontend: ['Streamlit', 'React', 'HTML/CSS'],
      backend: ['Python', 'Flask', 'FastAPI'],
      database: ['SQLite', 'PostgreSQL'],
      tools: ['OpenCV', 'TensorFlow', 'Keras', 'Scikit-learn', 'PIL']
    },
    features: [
      'Real-time fingerprint analysis',
      'Multiple detection algorithms',
      'Texture feature extraction',
      'Deep learning classification',
      'Security report generation',
      'Batch processing capability'
    ],
    challenges: [
      'Handling various fingerprint qualities',
      'Balancing false positive/negative rates',
      'Real-time processing optimization',
      'Training data collection and preparation'
    ],
    learnings: [
      'Advanced computer vision techniques',
      'Biometric security principles',
      'Deep learning for image classification',
      'Security system integration'
    ],
    metrics: {
      accuracy: '96.8%',
      performance: '< 1s processing time',
      users: '200+ security tests conducted'
    }
  },
  {
    id: 'portfolio-website',
    name: 'Interactive Portfolio',
    title: '3D Interactive Developer Portfolio',
    description: 'A cutting-edge portfolio website featuring 3D graphics, advanced animations, and modern web technologies.',
    longDescription: 'Built a sophisticated portfolio showcasing advanced web development skills using React Three Fiber for 3D graphics, GSAP for animations, and modern React patterns. Features interactive 3D backgrounds, particle systems, and responsive design.',
    image: '/projects/portfolio-cover.jpg',
    images: ['/projects/portfolio-1.jpg', '/projects/portfolio-2.jpg', '/projects/portfolio-3.jpg'],
    github: 'https://github.com/Aryan2764/portfolio_2.0',
    link: 'https://vishwakarma-31-portfolio.vercel.app',
    tags: ['React', 'Three.js', 'GSAP', 'TypeScript', 'Tailwind'],
    category: 'web',
    featured: true,
    status: 'completed',
    timeline: '2024-08-31',
    technologies: {
      frontend: ['React 18', 'Three.js', 'React Three Fiber', 'GSAP', 'Framer Motion'],
      backend: ['Node.js', 'Express.js', 'Nodemailer'],
      database: ['Local Storage'],
      tools: ['Vite', 'Tailwind CSS', 'TypeScript', 'ESLint']
    },
    features: [
      'Interactive 3D backgrounds',
      'Advanced particle systems',
      'Smooth page transitions',
      'Responsive design',
      'Contact form integration',
      'Performance optimization'
    ],
    challenges: [
      '3D performance optimization',
      'Mobile device compatibility',
      'Complex animation coordination',
      'Cross-browser compatibility'
    ],
    learnings: [
      '3D web graphics with Three.js',
      'Advanced animation techniques',
      'Performance optimization strategies',
      'Modern React patterns'
    ],
    metrics: {
      performance: '95+ Lighthouse score',
      users: 'Portfolio visitors',
      accuracy: '100% responsive design'
    }
  }
];