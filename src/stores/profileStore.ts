import { create } from 'zustand'
import { ProfileEntity } from '../domain/entities/Profile'
import { ProfileService } from '../domain/services/ProfileService'
import { ProfileRepository } from '../repositories/profileRepository'

interface ProfileState {
  profile: ProfileEntity | null
  isLoading: boolean
  error: string | null
  fetchProfile: () => void
  updateProfile: (profile: ProfileEntity) => void
}

export const useProfileStore = create<ProfileState>()((set) => ({
  profile: null,
  isLoading: false,
  error: null,
  
  fetchProfile: async () => {
    set({ isLoading: true, error: null })
    try {
      // Use repository to get profile data
      const profileData = ProfileRepository.getProfileData()
      
      const profile = ProfileService.createProfile(profileData)
      set({ profile, isLoading: false })
    } catch (error) {
      set({ error: 'Failed to fetch profile', isLoading: false })
    }
  },
  
  updateProfile: (profile) => set({ profile })
}))