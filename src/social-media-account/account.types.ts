import type { Platform } from '../publication/publication.types.js'

export type { Platform }

export interface Account {
  id: number
  userId: string
  platform: Platform
  credentials: Record<string, string> // decrypted
  createdAt: Date
}

export interface ConnectAccountDto {
  userId: string
  platform: Platform
  credentials: Record<string, string>
}
