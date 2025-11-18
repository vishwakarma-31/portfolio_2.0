export interface Certification {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
  certificateUrl: string;
  skills: string[];
}

export const certifications: Certification[] = [
  {
    id: 1,
    title: 'JavaScript Certification',
    company: 'Infosys SpringBoard',
    period: '2025',
    description: 'Proactively mastered core JavaScript concepts and best practices through the Infosys SpringBoard curriculum.',
    certificateUrl: 'https://www.example.com/path-to-your-certificate.pdf',
    skills: ['JavaScript', 'ES6+', 'DOM Manipulation', 'Async Programming']
  },
  {
    id: 2,
    title: 'AWS Cloud Practitioner Essentials',
    company: 'AWS',
    period: '2024',
    description: 'Developed a strong understanding of how to leverage the AWS Cloud to build secure, scalable, and cost-effective solutions.',
    certificateUrl: 'https://drive.google.com/file/d/1oKmAMkW8IK9nCcP0gqkmTb-CY35GxTe4/view?usp=drive_link',
    skills: ['AWS Cloud', 'EC2', 'S3', 'Cloud Architecture']
  },
  {
    id: 3,
    title: 'HTML5 Certification',
    company: 'Infosys SpringBoard',
    period: '2025',
    description: 'Certified in HTML5 and web fundamentals through the Infosys SpringBoard program.',
    certificateUrl: 'https://www.example.com/path-to-your-certificate.pdf',
    skills: ['HTML5', 'Semantic HTML', 'Web Standards', 'Accessibility']
  },
  {
    id: 4,
    title: 'Introduction To Artificial Intelligence',
    company: 'Coursera',
    period: '2025',
    description: 'Gained a solid understanding of fundamental AI principles, including machine learning, neural networks, and natural language processing.',
    certificateUrl: 'https://www.example.com/path-to-your-certificate.pdf',
    skills: ['Machine Learning', 'Neural Networks', 'NLP', 'AI Ethics']
  },
  {
    id: 5,
    title: 'Oracle Cloud Infrastructure AI Foundations',
    company: 'Oracle',
    period: '2025',
    description: 'Gained practical skills in leveraging OCI AI and Machine Learning services to build and deploy intelligent applications.',
    certificateUrl: 'https://www.example.com/path-to-your-certificate.pdf',
    skills: ['OCI', 'AI Services', 'ML Deployment', 'Cloud AI']
  },
  {
    id: 6,
    title: 'Oracle Cloud Infrastructure DevOps Professional',
    company: 'Oracle',
    period: '2025',
    description: 'Skilled in automating, deploying, and managing cloud-native applications with OCI services and DevOps best practices.',
    certificateUrl: 'https://www.example.com/path-to-your-certificate.pdf',
    skills: ['DevOps', 'CI/CD', 'Infrastructure as Code', 'Automation']
  }
];