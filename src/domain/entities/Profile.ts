export interface Profile {
  id: string
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

export class ProfileEntity implements Profile {
  constructor(
    public id: string,
    public name: string,
    public title: string,
    public description: string,
    public about: string,
    public skills: string[],
    public stats: Array<{
      number: string
      label: string
      icon: string
    }>
  ) {}

  // Business logic methods
  getFullName(): string {
    return this.name
  }

  getSkillCount(): number {
    return this.skills.length
  }

  getPrimarySkills(limit: number = 3): string[] {
    return this.skills.slice(0, limit)
  }
}