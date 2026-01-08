import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'cropify-ml',
    name: 'Cropify',
    title: 'AI-Powered Crop Recommendation System',
    description: 'AI-powered crop recommendation system using machine learning to analyze soil conditions, climate data, and environmental factors for optimal crop selection.',
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
      frontend: ['Streamlit', 'HTML/CSS', 'Python'],
      backend: ['Python', 'FastAPI'],
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
    description: 'Automated trading bot integrated with Telegram for real-time market analysis, signal alerts, and trade execution management.',
    longDescription: 'A robust trading automation tool that interfaces with financial APIs to monitor market trends. It sends real-time buy/sell signals via Telegram and features an administrative dashboard for configuring strategies, setting stop-losses, and monitoring portfolio performance.',
    image: '/projects/Trading_Bot.png',
    images: ['/projects/Trading_Bot.png'],
    github: 'https://github.com/vishwakarma-31/trading_bot',
    link: 'https://vishwakarma-31-trading-bot-uitrading-bot-ui-fyerl5.streamlit.app/',
    tags: ['Python', 'Telethon', 'Algorithmic Trading', 'API Integration', 'Streamlit'],
    category: 'fullstack',
    featured: true,
    status: 'completed',
    timeline: '2024-07-31',
    technologies: {
      frontend: ['Streamlit', 'Python', 'Plotly'],
      backend: ['Python', 'Telethon', 'CCXT', 'FastAPI'],
      database: ['MongoDB', 'Redis'],
      tools: ['Docker', 'Pandas', 'NumPy', 'Git', 'Telegram API']
    },
    features: [
      'Real-time market data monitoring',
      'Automated Buy/Sell execution',
      'Telegram alerts and command interface',
      'Strategy configuration dashboard',
      'Portfolio performance tracking',
      'Risk management (Stop-loss/Take-profit)'
    ],
    challenges: [
      'Managing API rate limits and latency',
      'Handling websocket disconnections',
      'Ensuring atomic transactions',
      'Securely managing API keys',
      'Backtesting strategies against historical data'
    ],
    learnings: [
      'Asynchronous programming with Python',
      'Financial market mechanics and APIs',
      'Telegram Bot API development',
      'State management in real-time systems',
      'Error handling in critical financial applications'
    ],
    metrics: {
      users: 'Active traders',
      performance: '99.9% uptime',
      accuracy: '< 100ms execution latency'
    }
  },
  {
    id: 'ai-interview',
    name: 'AI Interview',
    title: 'AI-Based Interview System',
    description: 'Intelligent interview platform that automates candidate screening using NLP for verbal analysis and Computer Vision for proctoring.',
    longDescription: 'An automated interview system designed to streamline the hiring process. It poses dynamic technical questions, transcribes responses in real-time, analyzes candidate sentiment and confidence via computer vision, and generates a comprehensive performance report for recruiters.',
    image: '/projects/AI_Interview.png',
    images: ['/projects/AI_InterviewN.png'],
    github: 'https://github.com/vishwakarma-31/AI-interview',
    link: 'https://ai-interview-kappa-one.vercel.app/',
    tags: ['Machine Learning', 'NLP', 'Computer Vision', 'OpenAI API', 'React'],
    category: 'ml',
    featured: true,
    status: 'completed',
    timeline: '2024-09-30',
    technologies: {
      frontend: ['React', 'Tailwind CSS', 'MediaRecorder API'],
      backend: ['Python', 'Flask', 'OpenAI API'],
      database: ['PostgreSQL', 'Firebase'],
      tools: ['OpenCV', 'Whisper AI', 'NLTK', 'Scikit-learn', 'Docker']
    },
    features: [
      'Speech-to-Text transcription',
      'AI-driven question generation',
      'Facial emotion/confidence analysis',
      'Code editor for technical rounds',
      'Automated scoring and feedback',
      'Anti-cheating proctoring (gaze tracking)'
    ],
    challenges: [
      'Minimizing audio transcription latency',
      'Detecting subtle cheating behaviors',
      'Prompt engineering for relevant questions',
      'Handling diverse accents and video quality'
    ],
    learnings: [
      'Integration of LLMs in production',
      'Real-time audio/video processing',
      'Prompt engineering strategies',
      'Natural Language Understanding (NLU)',
      'Building scalable assessment pipelines'
    ],
    metrics: {
      accuracy: '95% transcription accuracy',
      performance: 'Real-time feedback generation',
      users: '200+ mock interviews conducted'
    }
  },
  {
    id: 'jarvis',
    name: 'Jarvis',
    title: 'Personal Chat Bot - Jarvis',
    description: 'A sophisticated AI virtual assistant capable of natural conversation, task automation, and system control, accessed via a modern web interface.',
    longDescription: 'Jarvis is a personalized AI assistant built to handle daily tasks and queries. It utilizes Large Language Models to understand context and intent, wrapped in a futuristic web interface featuring 3D visualizations. It can manage schedules, answer complex queries, and simulate a human-like conversational partner.',
    image: '/projects/Jarvis.png',
    images: ['/projects/Jarvis.png'],
    github: 'https://github.com/vishwakarma-31/jarvis-ultimate',
    // link: 'https://vishwakarma-31-jarvis-ultimate.vercel.app',
    tags: ['React', 'GenAI', 'Three.js', 'Speech Recognition', 'Python'],
    category: 'web',
    featured: true,
    status: 'completed',
    timeline: '2024-08-31',
    technologies: {
      frontend: ['React 18', 'Three.js', 'React Three Fiber', 'Web Speech API'],
      backend: ['Node.js', 'Express.js', 'OpenAI/Gemini API'],
      database: ['MongoDB', 'Local Storage'],
      tools: ['Vite', 'Tailwind CSS', 'LangChain', 'Socket.io']
    },
    features: [
      'Voice-activated commands',
      'Interactive 3D avatar/interface',
      'Context-aware conversational memory',
      'Text-to-Speech synthesis',
      'Integration with external APIs (Weather, News)',
      'Customizable personality settings'
    ],
    challenges: [
      'Reducing voice-to-response latency',
      'Maintaining long-term conversation context',
      'Synchronizing 3D animations with speech',
      'Handling API rate limits and costs'
    ],
    learnings: [
      'LLM integration and fine-tuning',
      'Web Speech API implementation',
      '3D web graphics optimization',
      'WebSocket communication for streams',
      'Designing conversational UIs'
    ],
    metrics: {
      performance: '< 1.5s voice response time',
      users: 'Personal use & Portfolio demo',
      accuracy: '98% intent recognition'
    }
  }
];