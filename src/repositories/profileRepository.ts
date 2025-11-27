// Profile repository to handle profile data
export interface ProfileData {
  name: string
  title: string
  description: string
  about: string
  skills: string[]
  stats: Array<{
    number: string
    label: string
    icon: string
  }>
}

export class ProfileRepository {
  static getProfileData(): ProfileData {
    return {
      name: 'Your Name',
      title: 'Your Job Title',
      description: 'Your custom description about your portfolio and skills',
      about: `Your custom about section describing your background, experience, and interests.

Add details about your journey, what drives you, and what you're passionate about.`,
      skills: ['Your', 'Skills', 'And', 'Technologies'],
      stats: [
        { number: 'X+', label: 'Years Coding', icon: 'code' },
        { number: 'X+', label: 'Projects Built', icon: 'database' },
        { number: 'X+', label: 'Technologies', icon: 'zap' },
        { number: '100%', label: 'Your Custom Stat', icon: 'star' }
      ]
    }
  }
}