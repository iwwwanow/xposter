import cron from 'node-cron'
import type { PublicationService } from './publication.service.js'

export class PublicationScheduler {
  private task: cron.ScheduledTask | null = null

  constructor(private readonly service: PublicationService) {}

  start(): void {
    // Poll every minute for due publications
    this.task = cron.schedule('* * * * *', () => void this.processScheduled())
    console.log('Scheduler started')
  }

  stop(): void {
    this.task?.stop()
  }

  private async processScheduled(): Promise<void> {
    const due = await this.service.getScheduledBefore(new Date())

    for (const pub of due) {
      try {
        await this.service.dispatch(pub.id)
      } catch (err) {
        console.error(`Failed to dispatch publication ${pub.id}:`, err)
      }
    }
  }
}
