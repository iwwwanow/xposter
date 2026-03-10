export type Platform = 'telegram' | 'instagram' | 'twitter'
export type ContentType = 'text' | 'image' | 'audio' | 'story'
export type PublicationStatus = 'draft' | 'scheduled' | 'sent' | 'failed'

export interface Publication {
  id: number
  userId: string
  contentType: ContentType
  contentPath: string | null
  caption: string | null
  platforms: Platform[]
  scheduledAt: Date | null
  status: PublicationStatus
  createdAt: Date
}

export interface CreatePublicationDto {
  userId: string
  contentType: ContentType
  contentPath?: string
  caption?: string
  platforms: Platform[]
  scheduledAt?: Date
}
