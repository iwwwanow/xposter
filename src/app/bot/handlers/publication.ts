import type { Bot } from 'grammy'
import type { PublicationController } from '../../../publication/publication.controller.js'

export function registerPublicationHandlers(bot: Bot, controller: PublicationController): void {
  bot.command('post', ctx => controller.startPostFlow(ctx))
  bot.command('scheduled', ctx => controller.listPosts(ctx))
}
