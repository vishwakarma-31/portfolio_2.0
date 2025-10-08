import { create } from 'zustand'
import { ProjectEntity } from '../domain/entities/Project'
import { ProjectService } from '../domain/services/ProjectService'
import { ProjectsRepository } from '../repositories/projectsRepository'

interface ProjectsState {
  projects: ProjectEntity[]
  featuredProjects: ProjectEntity[]
  isLoading: boolean
  error: string | null
  fetchProjects: () => void
  getProjectById: (id: string) => ProjectEntity | undefined
  getProjectsByCategory: (category: string) => ProjectEntity[]
}

export const useProjectsStore = create<ProjectsState>()((set, get) => ({
  projects: [],
  featuredProjects: [],
  isLoading: false,
  error: null,
  
  fetchProjects: async () => {
    set({ isLoading: true, error: null })
    try {
      // Use repository to get raw project data
      const rawProjects = ProjectsRepository.getAllProjects()
      
      // Convert to ProjectEntity objects
      const projectEntities = rawProjects.map(data => 
        ProjectService.createProject(data)
      )
      
      const featuredProjects = ProjectService.getFeaturedProjects(projectEntities)
      
      set({ 
        projects: projectEntities,
        featuredProjects,
        isLoading: false 
      })
    } catch (error) {
      set({ error: 'Failed to fetch projects', isLoading: false })
    }
  },
  
  getProjectById: (id: string) => {
    return get().projects.find(project => project.id === id)
  },
  
  getProjectsByCategory: (category: string) => {
    return get().projects.filter(project => project.category === category)
  }
}))