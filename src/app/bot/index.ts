import { Bot } from 'grammy'
import { config } from '../../../config.js'
import { TelegramAdapter } from '../../../adapters/telegram.adapter.js'
import { InstagramAdapter } from '../../../adapters/instagram.adapter.js'
import { TwitterAdapter } from '../../../adapters/twitter.adapter.js'
import { AccountRepository } from '../../social-media-account/account.repository.js'
import { AccountService } from '../../social-media-account/account.service.js'
import { AccountController } from '../../social-media-account/account.controller.js'
import { PublicationRepository } from '../../publication/publication.repository.js'
import { PublicationService, type AdapterFactory } from '../../publication/publication.service.js'
import { PublicationController } from '../../publication/publication.controller.js'
import { PublicationScheduler } from '../../publication/publication.scheduler.js'
import { registerAccountHandlers } from './handlers/account.js'
import { registerPublicationHandlers } from './handlers/publication.js'

const bot = new Bot(config.BOT_TOKEN)

// Adapter factory — resolves the right adapter from platform + credentials
const adapterFactory: AdapterFactory = (platform, credentials) => {
  switch (platform) {
    case 'telegram':
      return new TelegramAdapter(credentials.channelId, credentials.botToken)
    case 'instagram':
      return new InstagramAdapter(credentials.username, credentials.password)
    case 'twitter':
      return new TwitterAdapter({
        appKey: credentials.appKey,
        appSecret: credentials.appSecret,
        accessToken: credentials.accessToken,
        accessSecret: credentials.accessSecret,
      })
  }
}

// Dependency wiring
const accountRepo = new AccountRepository()
const accountService = new AccountService(accountRepo)
const accountController = new AccountController(accountService)

const publicationRepo = new PublicationRepository()
const publicationService = new PublicationService(publicationRepo, accountService, adapterFactory)
const publicationController = new PublicationController(publicationService)

const scheduler = new PublicationScheduler(publicationService)

// Handlers
registerAccountHandlers(bot, accountController)
registerPublicationHandlers(bot, publicationController)

bot.command('start', ctx =>
  ctx.reply(
    'Добро пожаловать в xposter!\n\n' +
      '/post — создать пост\n' +
      '/scheduled — запланированные посты\n' +
      '/accounts — управление аккаунтами\n' +
      '/connect — подключить аккаунт\n',
  ),
)

// Start
scheduler.start()
bot.start()
console.log('xposter bot started')
