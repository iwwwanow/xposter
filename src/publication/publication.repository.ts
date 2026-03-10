import { db } from '../db/client.js'
import { publications } from '../db/schema.js'
import type { CreatePublicationDto, Publication, PublicationStatus } from './publication.types.js'

export class PublicationRepository {
  async create(dto: CreatePublicationDto): Promise<Publication> {
    // TODO: implement
    throw new Error('Not implemented')
  }

  async findById(id: number): Promise<Publication | null> {
    // TODO: implement
    throw new Error('Not implemented')
  }

  /** Used by scheduler: fetch all publications with scheduledAt <= date and status = 'scheduled' */
  async findScheduledBefore(date: Date): Promise<Publication[]> {
    // TODO: implement
    throw new Error('Not implemented')
  }

  async findByUser(userId: string): Promise<Publication[]> {
    // TODO: implement
    throw new Error('Not implemented')
  }

  async updateStatus(id: number, status: PublicationStatus): Promise<void> {
    // TODO: implement
    throw new Error('Not implemented')
  }
}
