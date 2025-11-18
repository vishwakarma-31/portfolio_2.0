import { ProjectEntity, ProjectCategory, ProjectStatus, Project } from '../entities/Project'

export class ProjectService {
  static createProject(data: Project): ProjectEntity {
    return new ProjectEntity(
      data.id,
      data.name,
      data.title,
      data.description,
      data.longDescription,
      data.image,
      data.images,
      data.github,
      data.tags,
      data.category,
      data.featured,
      data.status,
      data.timeline,
      data.technologies,
      data.features,
      data.challenges,
      data.learnings,
      data.link,
      data.metrics
    )
  }

  static filterByCategory(projects: ProjectEntity[], category: ProjectCategory): ProjectEntity[] {
    return projects.filter(project => project.category === category)
  }

  static filterByStatus(projects: ProjectEntity[], status: ProjectStatus): ProjectEntity[] {
    return projects.filter(project => project.status === status)
  }

  static getFeaturedProjects(projects: ProjectEntity[]): ProjectEntity[] {
    return projects.filter(project => project.isFeatured())
  }

  static getCompletedProjects(projects: ProjectEntity[]): ProjectEntity[] {
    return projects.filter(project => project.isCompleted())
  }

  static sortByDate(projects: ProjectEntity[]): ProjectEntity[] {
    return [...projects].sort((a, b) => 
      new Date(b.timeline).getTime() - new Date(a.timeline).getTime()
    )
  }

  static getProjectStats(projects: ProjectEntity[]): Record<string, number> {
    const stats: Record<string, number> = {
      total: projects.length,
      featured: projects.filter(p => p.isFeatured()).length,
      completed: projects.filter(p => p.isCompleted()).length
    }

    // Count by category
    projects.forEach(project => {
      stats[project.category] = (stats[project.category] || 0) + 1
    })

    return stats
  }
}