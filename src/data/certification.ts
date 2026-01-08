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
    description: 'Validated proficiency in software engineering fundamentals, including problem-solving, SQL, and building REST APIs.',
    certificateUrl: 'https://www.hackerrank.com/certificates/cfec62c1f767',
    skills: ['Problem Solving', 'SQL', 'REST API', 'Data Structures'],
    type: 'Certification'
  },
  {
    id: 2,
    title: 'SQL (Advanced)',
    company: 'HackerRank',
    period: '2024',
    description: 'Mastered advanced relational database concepts, including complex query optimization, data modeling, indexing, and window functions.',
    certificateUrl: 'https://www.hackerrank.com/certificates/da9e7f8e8713',
    skills: ['Query Optimization', 'Data Modeling', 'Indexing', 'Window Functions'],
    type: 'Certification'
  },
  {
    id: 3,
    title: 'REST API',
    company: 'HackerRank',
    period: '2025',
    description: 'Certified capability in designing and managing RESTful APIs, including handling HTTP methods, status codes, and JSON data effectively.',
    certificateUrl: 'https://www.hackerrank.com/certificates/02a4f14e5ccf',
    skills: ['RESTful Services', 'API Design', 'HTTP Methods', 'JSON'],
    type: 'Certification'
  },
  {
    id: 4,
    title: 'Deloitte Technology Job Simulation',
    company: 'Forage',
    period: '2025',
    description: 'Simulated the role of a Technology Consultant, delivering technology strategy and developing cloud-ready software solutions.',
    certificateUrl: 'https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/udmxiyHeqYQLkTPvf_9PBTqmSxAf6zZTseP_NgMXZ9jgJAFqBdf5F_1743954979430_completion_certificate.pdf',
    skills: ['Technology Strategy', 'Cloud Engineering', 'Coding', 'Unit Testing'],
    type: 'Certification'
  },
  {
    id: 5,
    title: 'AWS Solutions Architecture Job Simulation',
    company: 'Forage',
    period: '2025',
    description: 'Designed scalable, reliable, and cost-efficient cloud hosting architectures using AWS services like Elastic Beanstalk and S3.',
    certificateUrl: 'https://www.theforage.com/completion-certificates/pmnMSL4QiQ9JCgE3W/kkE9HyeNcw6rwCRGw_pmnMSL4QiQ9JCgE3W_NgMXZ9jgJAFqBdf5F_1743955799663_completion_certificate.pdfcertificate.pdf',
    skills: ['AWS Cloud', 'Cloud Architecture', 'Elastic Beanstalk', 'Scalability'],
    type: 'Certification'   
  },
  {
    id: 6,
    title: 'Eletronic Arts - Software Engineering Job Simulation',
    company: 'Forage',
    period: '2025',
    description: 'Experienced the lifecycle of a software engineer at EA, proposing gameplay features and patching bugs using C++ and object-oriented principles.',
    certificateUrl: 'https://www.theforage.com/completion-certificates/j43dGscQHtJJ57N54/a77WE3de8qrxWferQ_j43dGscQHtJJ57N54_NgMXZ9jgJAFqBdf5F_1744649102549_completion_certificate.pdf',
    skills: ['C++', 'Object-Oriented Programming', 'Game Development', 'System Design'],
    type: 'Certification'
  },
  {
    id: 7,
    title: 'Deloitte Data Analytics Job Simulation',
    company: 'Forage',
    period: '2025',
    description: 'Analyzed large datasets to uncover business trends and created interactive dashboards to communicate insights to stakeholders.',
    certificateUrl: 'https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_NgMXZ9jgJAFqBdf5F_1740687323017_completion_certificate.pdf',
    skills: ['Data Analysis', 'Tableau', 'Data Visualization', 'Forensic Technology'],
    type: 'Certification'
  },
  {
    id: 8,
    title: 'TATA Cybersecurity Analyst Job Simulation Job Simulation',
    company: 'Forage',
    period: '2025',
    description: 'Managed identity and access management (IAM) policies and analyzed security threats to protect business infrastructure.',
    certificateUrl: 'https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/gmf3ypEXBj2wvfQWC_ifobHAoMjQs9s6bKS_NgMXZ9jgJAFqBdf5F_1740684326904_completion_certificate.pdf',
    skills: ['Identity Access Management', 'Phishing Analysis', 'Network Security', 'Risk Assessment'],
    type: 'Certification'
  },
  {
    id: 9,
    title: 'TATA Data Visualisation: Empowering Business with Effective Insights',
    company: 'Forage',
    period: '2025',
    description: 'Translated complex datasets into compelling visual stories and actionable business insights using Power BI and Tableau.',
    certificateUrl: 'https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/MyXvBcppsW2FkNYCX_ifobHAoMjQs9s6bKS_NgMXZ9jgJAFqBdf5F_1740600273520_completion_certificate.pdf',
    skills: ['Data Visualization', 'Power BI', 'Tableau', 'Business Insights'],
    type: 'Certification'
  },
  {
    id: 10,
    title: 'TATA ESG Job Simulation',
    company: 'Forage',
    period: '2025',
    description: 'Evaluated environmental, social, and governance (ESG) factors to propose sustainable business solutions for corporate clients.',
    certificateUrl: 'https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/N8Muuhk6XsXgMTeu2_ifobHAoMjQs9s6bKS_NgMXZ9jgJAFqBdf5F_1740590803682_completion_certificate.pdf',
    skills: ['ESG Strategy', 'Sustainability Analysis', 'Stakeholder Management', 'Solution Assessment'],
    type: 'Certification'
  }
];