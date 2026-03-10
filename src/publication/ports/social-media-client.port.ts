export interface SocialMediaClient {
  postText(text: string): Promise<void>
  postImage(imagePath: string, caption?: string): Promise<void>
  postAudio(audioPath: string, caption?: string): Promise<void>
  postStory(mediaPath: string): Promise<void>
}
