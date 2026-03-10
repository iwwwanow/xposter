import { IgApiClient } from 'instagram-private-api'
import type { SocialMediaClient } from '../src/publication/ports/social-media-client.port.js'

export class InstagramAdapter implements SocialMediaClient {
  private readonly client: IgApiClient

  constructor(
    private readonly username: string,
    private readonly password: string,
  ) {
    this.client = new IgApiClient()
  }

  private async login(): Promise<void> {
    this.client.state.generateDevice(this.username)
    await this.client.account.login(this.username, this.password)
  }

  async postText(_text: string): Promise<void> {
    // Instagram does not support text-only posts
    throw new Error('Instagram does not support text-only posts')
  }

  async postImage(imagePath: string, caption?: string): Promise<void> {
    await this.login()
    // TODO: read file from imagePath, call this.client.publish.photo(...)
    throw new Error('Not implemented')
  }

  async postAudio(_audioPath: string, _caption?: string): Promise<void> {
    // TODO: audio can be posted as a Reel (video with static image)
    throw new Error('Not implemented')
  }

  async postStory(mediaPath: string): Promise<void> {
    await this.login()
    // TODO: call this.client.publish.story(...)
    throw new Error('Not implemented')
  }
}
