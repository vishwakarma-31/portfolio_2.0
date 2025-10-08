import { create } from 'zustand'

interface UIState {
  isMobileMenuOpen: boolean
  isScrolled: boolean
  setIsMobileMenuOpen: (isOpen: boolean) => void
  setIsScrolled: (isScrolled: boolean) => void
}

export const useUIStore = create<UIState>()((set) => ({
  isMobileMenuOpen: false,
  isScrolled: false,
  
  setIsMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
  setIsScrolled: (isScrolled) => set({ isScrolled: isScrolled })
}))