import type { PublicationRepository } from './publication.repository.js'
import type { AccountService } from '../social-media-account/account.service.js'
import type { SocialMediaClient } from './ports/social-media-client.port.js'
import type { CreatePublicationDto, Platform, Publication } from './publication.types.js'

export type AdapterFactory = (
  platform: Platform,
  credentials: Record<string, string>,
) => SocialMediaClient

export class PublicationService {
  constructor(
    private readonly repository: PublicationRepository,
    private readonly accountService: AccountService,
    private readonly adapterFactory: AdapterFactory,
  ) {}

  async create(dto: CreatePublicationDto): Promise<Publication> {
    const pub = await this.repository.create(dto)

    if (!dto.scheduledAt) {
      await this.dispatch(pub.id)
    }

    return pub
  }

  /** Called by scheduler and immediately after create (when not scheduled) */
  async dispatch(publicationId: number): Promise<void> {
    const pub = await this.repository.findById(publicationId)
    if (!pub) throw new Error(`Publication ${publicationId} not found`)

    await this.repository.updateStatus(publicationId, 'sent') // optimistic; set to 'failed' on error

    for (const platform of pub.platforms) {
      const account = await this.accountService.getAccount(pub.userId, platform)
      if (!account) {
        // TODO: notify user that account is not connected
        continue
      }

      const client = this.adapterFactory(platform, account.credentials)

      try {
        switch (pub.contentType) {
          case 'text':
            await client.postText(pub.caption ?? '')
            break
          case 'image':
            await client.postImage(pub.contentPath!, pub.caption ?? undefined)
            break
          case 'audio':
            await client.postAudio(pub.contentPath!, pub.caption ?? undefined)
            break
          case 'story':
            await client.postStory(pub.contentPath!)
            break
        }
      } catch (err) {
        await this.repository.updateStatus(publicationId, 'failed')
        throw err
      }
    }
  }

  async getScheduledBefore(date: Date): Promise<Publication[]> {
    return this.repository.findScheduledBefore(date)
  }

  async listByUser(userId: string): Promise<Publication[]> {
    return this.repository.findByUser(userId)
  }
}
