import 'reflect-metadata'
import { container, Lifecycle } from 'tsyringe'
import { ProfileService } from '../domain/services/ProfileService'
import { ProjectService } from '../domain/services/ProjectService'
import { AnimationService } from '../services/animationService'
import { PerformanceService } from '../services/performanceService'
import { RoutePreloadService } from '../services/routePreloadService'
import { ProfileRepository } from '../repositories/profileRepository'
import { ProjectsRepository } from '../repositories/projectsRepository'

// Register services
container.register(ProfileService, ProfileService, { lifecycle: Lifecycle.Singleton })
container.register(ProjectService, ProjectService, { lifecycle: Lifecycle.Singleton })
container.register(AnimationService, AnimationService, { lifecycle: Lifecycle.Singleton })
container.register(PerformanceService, PerformanceService, { lifecycle: Lifecycle.Singleton })
container.register(RoutePreloadService, RoutePreloadService, { lifecycle: Lifecycle.Singleton })

// Register repositories
container.register(ProfileRepository, ProfileRepository, { lifecycle: Lifecycle.Singleton })
container.register(ProjectsRepository, ProjectsRepository, { lifecycle: Lifecycle.Singleton })

export { container }