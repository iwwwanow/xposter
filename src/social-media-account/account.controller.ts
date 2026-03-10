import type { Context } from 'grammy'
import type { AccountService } from './account.service.js'

export class AccountController {
  constructor(private readonly service: AccountService) {}

  /** Show all connected accounts for the user */
  async listAccounts(ctx: Context): Promise<void> {
    const userId = String(ctx.from?.id)
    const accounts = await this.service.listAccounts(userId)

    if (accounts.length === 0) {
      await ctx.reply('Нет подключённых аккаунтов. Используй /connect для добавления.')
      return
    }

    const list = accounts.map(a => `• ${a.platform}`).join('\n')
    await ctx.reply(`Подключённые аккаунты:\n${list}`)
  }

  /** Start the flow for connecting a new social media account */
  async startConnectFlow(ctx: Context): Promise<void> {
    // TODO: inline keyboard to choose platform, then collect credentials via conversation
    await ctx.reply('Подключение аккаунта — в разработке')
  }

  /** Disconnect a social media account */
  async disconnectAccount(ctx: Context): Promise<void> {
    // TODO: inline keyboard to choose which account to disconnect
    await ctx.reply('Отключение аккаунта — в разработке')
  }
}
