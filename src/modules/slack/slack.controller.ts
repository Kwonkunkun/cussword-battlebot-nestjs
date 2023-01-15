import { Controller } from '@nestjs/common';
import { SlackEventService } from './slack.event.service';
import {
  IncomingSlackEvent,
  IncomingSlackInteractivity,
  SlackEventHandler,
  SlackEventListener,
  SlackInteractivityHandler,
  SlackInteractivityListener,
} from '@int31302/nestjs-slack-listener';
import { MessageEvent } from '@int31302/nestjs-slack-listener/dist/slack/interfaces/incoming.interface';
import { ACTION_ID } from './slack.constants';
import { SlackInteractivityService } from './slack.interactivity.service';

@Controller()
@SlackEventListener()
@SlackInteractivityListener()
export class SlackController {
  constructor(
    private readonly slackEventService: SlackEventService,
    private readonly slackInteractivityService: SlackInteractivityService,
  ) {}

  /**
   * @description slack 에서 온 메시지를 처리
   * @param event
   */
  @SlackEventHandler('message')
  async handleMessage({ event }: any) {
    if (this.slackEventService.isBot(event)) {
      return;
    }
    return await this.slackEventService.handleMessage(event as MessageEvent);
  }

  /**
   * TODO: 아직 구현 안됨
   * @description slack interactivity handler
   */
  @SlackInteractivityHandler(ACTION_ID.COMPLETE_FILE_NAMING_QUESTION)
  async handleCompleteFileNamingQuestion({
    actions: [{ value: questUserId }],
  }: IncomingSlackInteractivity) {
    await this.slackInteractivityService.handleCompleteFileNamingQuestion(
      questUserId,
    );
  }
}
