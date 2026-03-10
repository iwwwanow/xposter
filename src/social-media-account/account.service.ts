import type { AccountRepository } from './account.repository.js'
import type { Account, ConnectAccountDto } from './account.types.js'
import type { Platform } from '../publication/publication.types.js'

export class AccountService {
  constructor(private readonly repository: AccountRepository) {}

  async connect(dto: ConnectAccountDto): Promise<Account> {
    // TODO: validate credentials against platform API before saving
    return this.repository.save(dto)
  }

  async disconnect(userId: string, platform: Platform): Promise<void> {
    return this.repository.deleteByUserAndPlatform(userId, platform)
  }

  async listAccounts(userId: string): Promise<Account[]> {
    return this.repository.findByUser(userId)
  }

  async getAccount(userId: string, platform: Platform): Promise<Account | null> {
    return this.repository.findByUserAndPlatform(userId, platform)
  }
}
