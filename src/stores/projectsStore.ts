import { create } from 'zustand'
import { projects } from '../data/projects'
import { Project } from '../types'

interface ProjectsState {
  projects: Project[]
  featuredProjects: Project[]
  isLoading: boolean
  error: string | null
  fetchProjects: () => void
  getProjectById: (id: string) => Project | undefined
  getProjectsByCategory: (category: string) => Project[]
}

export const useProjectsStore = create<ProjectsState>()((set, get) => ({
  projects: [],
  featuredProjects: [],
  isLoading: false,
  error: null,
  
  fetchProjects: async () => {
    set({ isLoading: true, error: null })
    try {
      const featured = projects.filter(p => p.featured)
      set({ 
        projects: projects,
        featuredProjects: featured,
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