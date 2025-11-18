import { ProfileEntity } from '../entities/Profile'

export interface ProfileDataInput {
  id?: string
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

export class ProfileService {
  static createProfile(data: ProfileDataInput): ProfileEntity {
    return new ProfileEntity(
      data.id || 'profile-1',
      data.name,
      data.title,
      data.description,
      data.about,
      data.skills,
      data.stats
    )
  }

  static validateProfile(profile: ProfileEntity): boolean {
    return (
      profile.name.length > 0 &&
      profile.description.length > 0 &&
      profile.skills.length > 0
    )
  }

  static getProfileSummary(profile: ProfileEntity): string {
    return `${profile.name} - ${profile.title} with ${profile.getSkillCount()} skills`
  }
}