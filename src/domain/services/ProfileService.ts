import { ProfileEntity } from '../entities/Profile'

export class ProfileService {
  static createProfile(data: any): ProfileEntity {
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