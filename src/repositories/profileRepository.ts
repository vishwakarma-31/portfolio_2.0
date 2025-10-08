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
      name: 'Aryan Vishwakarma',
      title: 'Full Stack Developer',
      description: 'A passionate Full Stack Developer creating amazing digital experiences with modern technologies',
      about: `I'm a passionate Full Stack Developer with a love for creating beautiful, functional, and scalable web applications. 
With expertise in modern technologies and a keen eye for design, I transform ideas into digital realities.

When I'm not coding, you'll find me exploring new technologies, contributing to open source projects, 
or sharing knowledge with the developer community. I believe in continuous learning and staying ahead of the curve.`,
      skills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'MongoDB'],
      stats: [
        { number: '1+', label: 'Years Coding', icon: 'code' },
        { number: '5+', label: 'Projects Built', icon: 'database' },
        { number: '8+', label: 'Technologies', icon: 'zap' },
        { number: '100%', label: 'Passion', icon: 'star' }
      ]
    }
  }
}