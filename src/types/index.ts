// Common interfaces and types for the portfolio application

export interface NavItem {
  name: string;
  path: string;
}

export interface MousePosition {
  x: number;
  y: number;
}

export interface ProjectData {
  id: string;
  name: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  images: string[];
  github: string;
  link: string;
  tags: string[];
  category: string;
  featured: boolean;
  status: string;
  timeline: string;
  technologies: {
    frontend: string[];
    backend: string[];
    database: string[];
    tools: string[];
  };
  features: string[];
}

export interface SkillCategory {
  title: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  skills: {
    name: string;
    icon: string;
    level: number;
  }[];
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormErrors {
  name: string;
  email: string;
  message: string;
}

// 3D Scene related types
export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface ParticleConfig {
  particleCount?: number;
  colors?: string[];
  sizeRange?: { min: number; max: number };
  className?: string;
}

export interface PerformanceConfig {
  enableLOD?: boolean;
  maxParticles?: number;
  quality?: 'low' | 'medium' | 'high';
  adaptiveQuality?: boolean;
}

// Animation types
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number;
}

// Accessibility types
export interface AccessibilitySettings {
  reducedMotion?: boolean;
  highContrast?: boolean;
  screenReaderMode?: boolean;
  keyboardNavigation?: boolean;
}

// Page transition types
export interface PageTransitionProps {
  children: React.ReactNode;
}

export type TransitionType = 'slide' | 'fade' | 'zoom';

export interface TransitionConfig {
  slide: { type: string; ease: string; duration: number };
  fade: { duration: number; ease: string };
  zoom: { type: string; bounce: number; duration: number };
}