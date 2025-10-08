import { Project, projects } from '../data/projects'
import { ProjectEntity } from '../domain/entities/Project'
import { ProjectService } from '../domain/services/ProjectService'

// Projects repository to handle projects data
export class ProjectsRepository {
  static getAllProjects(): Project[] {
    return projects
  }

  static getProjectById(id: string): Project | undefined {
    return projects.find(project => project.id === id)
  }

  static getProjectsByCategory(category: Project['category']): Project[] {
    return projects.filter(project => project.category === category)
  }

  static getProjectCount(): number {
    return projects.length
  }

  static getProjectStats(projectsData: ProjectEntity[]): Record<string, number> {
    return ProjectService.getProjectStats(projectsData)
  }
}