import type { SocialMediaClient } from '../src/publication/ports/social-media-client.port.js'

/** Posts content to a Telegram channel or group on behalf of the user */
export class TelegramAdapter implements SocialMediaClient {
  constructor(
    private readonly channelId: string,
    private readonly botToken: string,
  ) {}

  async postText(text: string): Promise<void> {
    // TODO: POST to https://api.telegram.org/bot{token}/sendMessage
    throw new Error('Not implemented')
  }

  async postImage(imagePath: string, caption?: string): Promise<void> {
    // TODO: POST to sendPhoto with multipart/form-data
    throw new Error('Not implemented')
  }

  async postAudio(audioPath: string, caption?: string): Promise<void> {
    // TODO: POST to sendAudio with multipart/form-data
    throw new Error('Not implemented')
  }

  async postStory(mediaPath: string): Promise<void> {
    // NOTE: Telegram Bot API has limited story support — may require user-level auth
    throw new Error('Not implemented')
  }
}
