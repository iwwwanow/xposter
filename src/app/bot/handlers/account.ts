import type { Bot } from 'grammy'
import type { AccountController } from '../../../social-media-account/account.controller.js'

export function registerAccountHandlers(bot: Bot, controller: AccountController): void {
  bot.command('accounts', ctx => controller.listAccounts(ctx))
  bot.command('connect', ctx => controller.startConnectFlow(ctx))
  bot.command('disconnect', ctx => controller.disconnectAccount(ctx))
}
