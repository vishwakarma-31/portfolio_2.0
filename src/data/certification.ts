import { Award } from 'lucide-react';

export interface Certification {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
  certificateUrl: string;
  skills: string[];
  type?: string;
}

export const certifications: Certification[] = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'HackerRank',
    period: '2025',
    description: 'Proactively mastered core JavaScript concepts and best practices through the HackerRa curriculum.',
    certificateUrl: 'https://www.hackerrank.com/certificates/cfec62c1f767',
    skills: ['JavaScript', 'ES6+', 'DOM Manipulation', 'Async Programming'],
    type: 'Certification'
  },
  {
    id: 2,
    title: 'SQL (Advanced)',
    company: 'HackerRank',
    period: '2024',
    description: 'Developed a strong understanding of how to leverage the Hacker Cloud to build secure, scalable, and cost-effective solutions.',
    certificateUrl: 'https://www.hackerrank.com/certificates/da9e7f8e8713',
    skills: ['Hacker Cloud', 'EC2', 'S3', 'Cloud Architecture'],
    type: 'Certification'
  },
  {
    id: 3,
    title: 'REST API',
    company: 'HackerRank',
    period: '2025',
    description: 'Certified in HTML5 and web fundamentals through the HackerRa program.',
    certificateUrl: 'https://www.hackerrank.com/certificates/02a4f14e5ccf',
    skills: ['HTML5', 'Semantic HTML', 'Web Standards', 'Accessibility'],
    type: 'Certification'
  },
  {
    id: 4,
    title: 'Deloitte Technology Job Simulation',
    company: 'Forage',
    period: '2025',
    description: 'Gained a solid understanding of fundamental AI principles, including machine learning, neural networks, and natural language processing.',
    certificateUrl: 'https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/udmxiyHeqYQLkTPvf_9PBTqmSxAf6zZTseP_NgMXZ9jgJAFqBdf5F_1743954979430_completion_certificate.pdf',
    skills: ['Machine Learning', 'Neural Networks', 'NLP', 'AI Ethics'],
    type: 'Certification'
  },
  {
    id: 5,
    title: 'AWS Solutions Architecture Job Simulation',
    company: 'Forage',
    period: '2025',
    description: 'Gained practical skills in leveraging OCI AI and Machine Learning services to build and deploy intelligent applications.',
    certificateUrl: 'https://www.theforage.com/completion-certificates/pmnMSL4QiQ9JCgE3W/kkE9HyeNcw6rwCRGw_pmnMSL4QiQ9JCgE3W_NgMXZ9jgJAFqBdf5F_1743955799663_completion_certificate.pdfcertificate.pdf',
    skills: ['OCI', 'AI Services', 'ML Deployment', 'Cloud AI'],
    type: 'Certification'   
  },
  {
    id: 6,
    title: 'Eletronic Arts - Software Engineering Job Simulation',
    company: 'Forage',
    period: '2025',
    description: 'Skilled in automating, deploying, and managing cloud-native applications with OCI services and DevOps best practices.',
    certificateUrl: 'https://www.theforage.com/completion-certificates/j43dGscQHtJJ57N54/a77WE3de8qrxWferQ_j43dGscQHtJJ57N54_NgMXZ9jgJAFqBdf5F_1744649102549_completion_certificate.pdf',
    skills: ['DevOps', 'CI/CD', 'Infrastructure as Code', 'Automation'],
    type: 'Certification'
  },
  {
    id: 7,
    title: 'Deloitte Data Analytics Job Simulation',
    company: 'Forage',
    period: '2025',
    description: 'Skilled in automating, deploying, and managing cloud-native applications with OCI services and DevOps best practices.',
    certificateUrl: 'https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_NgMXZ9jgJAFqBdf5F_1740687323017_completion_certificate.pdf',
    skills: ['DevOps', 'CI/CD', 'Infrastructure as Code', 'Automation'],
    type: 'Certification'
  },
  {
    id: 8,
    title: 'TATA Cybersecurity Analyst Job Simulation Job Simulation',
    company: 'Forage',
    period: '2025',
    description: 'Skilled in automating, deploying, and managing cloud-native applications with OCI services and DevOps best practices.',
    certificateUrl: 'https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/gmf3ypEXBj2wvfQWC_ifobHAoMjQs9s6bKS_NgMXZ9jgJAFqBdf5F_1740684326904_completion_certificate.pdf',
    skills: ['DevOps', 'CI/CD', 'Infrastructure as Code', 'Automation'],
    type: 'Certification'
  },
  {
    id: 9,
    title: 'TATA Data Visualisation: Empowering Business with Effective Insights',
    company: 'Forage',
    period: '2025',
    description: 'Skilled in automating, deploying, and managing cloud-native applications with OCI services and DevOps best practices.',
    certificateUrl: 'https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/MyXvBcppsW2FkNYCX_ifobHAoMjQs9s6bKS_NgMXZ9jgJAFqBdf5F_1740600273520_completion_certificate.pdf',
    skills: ['DevOps', 'CI/CD', 'Infrastructure as Code', 'Automation'],
    type: 'Certification'
  },
  {
    id: 10,
    title: 'TATA ESG Job Simulation',
    company: 'Forage',
    period: '2025',
    description: 'Skilled in automating, deploying, and managing cloud-native applications with OCI services and DevOps best practices.',
    certificateUrl: 'https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/N8Muuhk6XsXgMTeu2_ifobHAoMjQs9s6bKS_NgMXZ9jgJAFqBdf5F_1740590803682_completion_certificate.pdf',
    skills: ['DevOps', 'CI/CD', 'Infrastructure as Code', 'Automation'],
    type: 'Certification'
  }
];