import { db } from '../db/client.js'
import { accounts } from '../db/schema.js'
import type { Account, ConnectAccountDto } from './account.types.js'
import type { Platform } from '../publication/publication.types.js'

export class AccountRepository {
  /** Encrypts credentials before saving */
  async save(dto: ConnectAccountDto): Promise<Account> {
    // TODO: encrypt dto.credentials with ENCRYPTION_KEY, then insert
    throw new Error('Not implemented')
  }

  /** Decrypts credentials after fetching */
  async findByUserAndPlatform(userId: string, platform: Platform): Promise<Account | null> {
    // TODO: implement
    throw new Error('Not implemented')
  }

  async findByUser(userId: string): Promise<Account[]> {
    // TODO: implement
    throw new Error('Not implemented')
  }

  async deleteByUserAndPlatform(userId: string, platform: Platform): Promise<void> {
    // TODO: implement
    throw new Error('Not implemented')
  }
}
