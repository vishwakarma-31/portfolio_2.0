import { create } from 'zustand'
import { personalInfo } from '../data/personal'

interface ProfileState {
  profile: typeof personalInfo | null
  isLoading: boolean
  error: string | null
  fetchProfile: () => void
}

export const useProfileStore = create<ProfileState>()((set) => ({
  profile: null,
  isLoading: false,
  error: null,
  
  fetchProfile: () => {
    set({ isLoading: true, error: null })
    try {
      // Simulate async if needed, or just set directly
      set({ profile: personalInfo, isLoading: false })
    } catch (error) {
      set({ error: 'Failed to fetch profile', isLoading: false })
    }
  },
}))