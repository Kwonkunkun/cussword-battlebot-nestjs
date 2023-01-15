import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SlackInteractivityService {
  private readonly logger: Logger = new Logger(this.constructor.name);
  handleCompleteFileNamingQuestion(questUserId: string) {
    this.logger.debug(questUserId);
  }
}
