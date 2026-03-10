import { TwitterApi } from 'twitter-api-v2'
import type { SocialMediaClient } from '../src/publication/ports/social-media-client.port.js'

export class TwitterAdapter implements SocialMediaClient {
  private readonly client: TwitterApi

  constructor(credentials: {
    appKey: string
    appSecret: string
    accessToken: string
    accessSecret: string
  }) {
    this.client = new TwitterApi(credentials)
  }

  async postText(text: string): Promise<void> {
    await this.client.v2.tweet(text)
  }

  async postImage(imagePath: string, caption?: string): Promise<void> {
    // TODO: upload media via this.client.v1.uploadMedia(imagePath), then tweet with mediaIds
    throw new Error('Not implemented')
  }

  async postAudio(audioPath: string, caption?: string): Promise<void> {
    // TODO: upload via v1.uploadMedia with mimeType audio/mpeg
    throw new Error('Not implemented')
  }

  async postStory(_mediaPath: string): Promise<void> {
    // Twitter/X does not have stories
    throw new Error('Twitter does not support stories')
  }
}
