import { Injectable, Logger } from '@nestjs/common';
import { MessageEvent } from '@int31302/nestjs-slack-listener/dist/slack/interfaces/incoming.interface';
import {
  InjectSlackClient,
  SlackClient,
} from '@int31302/nestjs-slack-listener';

@Injectable()
export class SlackEventService {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    @InjectSlackClient()
    private readonly slack: SlackClient,
  ) {}

  /**
   * @description message 이벤트 핸들러
   * @param event MessageEvent
   */
  async handleMessage(event: MessageEvent) {
    this.logger.debug(event);

    //text 에 따라서 다른 handler 실행
    const { text } = event;

    //전부 해당되지 않을때
    return await this.slack.chat.postMessage({
      channel: event.channel,
      text: `😰 해당되는 기능을 찾을 수 없습니다.`,
    });
  }

  /**
   * @description 봇인지 확인하는 함수
   */
  isBot(event: MessageEvent) {
    return 'bot_id' in event;
  }
}
