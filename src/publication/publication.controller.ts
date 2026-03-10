import type { Context } from 'grammy'
import type { PublicationService } from './publication.service.js'
import type { Platform } from './publication.types.js'

export class PublicationController {
  constructor(private readonly service: PublicationService) {}

  /** Entry point for /post command — starts multi-step post creation flow */
  async startPostFlow(ctx: Context): Promise<void> {
    // TODO: use grammy conversations or inline keyboard to collect:
    //   1. content (text / file upload)
    //   2. platforms (multi-select inline keyboard)
    //   3. schedule time (optional)
    await ctx.reply('Создание поста — в разработке')
  }

  /** Show scheduled and sent publications for the user */
  async listPosts(ctx: Context): Promise<void> {
    // TODO: implement
    await ctx.reply('Список постов — в разработке')
  }
}
