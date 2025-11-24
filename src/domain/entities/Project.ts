export type ProjectCategory = 'web' | 'mobile' | 'ml' | 'fullstack'
export type ProjectStatus = 'completed' | 'in-progress' | 'planned'

export interface Project {
  id: string
  name: string
  title: string
  description: string
  longDescription: string
  image: string
  images: string[]
  github: string
  tags: string[]
  category: ProjectCategory
  featured: boolean
  status: ProjectStatus
  timeline: string // ISO date string format (YYYY-MM-DD)
  technologies: {
    frontend: string[]
    backend: string[]
    database: string[]
    tools: string[]
  }
  features: string[]
  challenges: string[]
  learnings: string[]
  metrics?: {
    users?: string
    performance?: string
    accuracy?: string
  }
  link?: string
}

export class ProjectEntity {
  constructor(
    public id: string,
    public name: string,
    public title: string,
    public description: string,
    public longDescription: string,
    public image: string,
    public images: string[],
    public github: string,
    public tags: string[],
    public category: ProjectCategory,
    public featured: boolean,
    public status: ProjectStatus,
    public timeline: string,
    public technologies: {
      frontend: string[]
      backend: string[]
      database: string[]
      tools: string[]
    },
    public features: string[],
    public challenges: string[],
    public learnings: string[],
    public link?: string,
    public metrics?: {
      users?: string
      performance?: string
      accuracy?: string
    }
  ) {}

  // Business logic methods
  isCompleted(): boolean {
    return this.status === 'completed'
  }

  isFeatured(): boolean {
    return this.featured
  }

  getTechnologyCount(): number {
    return (
      this.technologies.frontend.length +
      this.technologies.backend.length +
      this.technologies.database.length +
      this.technologies.tools.length
    )
  }

  getDisplayLink(): string | undefined {
    return this.link || this.github
  }
}