// Common interfaces and types for the portfolio application
import { ComponentType } from 'react';

export interface NavItem {
  name: string;
  path: string;
}

export interface MousePosition {
  x: number;
  y: number;
}

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
  timeline: string;
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

export interface SkillCategory {
  title: string;
  icon: ComponentType<any>;
  color: string;
  bgColor: string;
  summary: string;
  coreSkills: string[];
  toolkit: string[];
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