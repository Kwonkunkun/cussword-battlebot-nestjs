import { Injectable, Logger } from '@nestjs/common';
import { MessageEvent } from '@int31302/nestjs-slack-listener/dist/slack/interfaces/incoming.interface';
import {
  InjectSlackClient,
  SlackClient,
} from '@int31302/nestjs-slack-listener';
import { CusswordService } from '../cussword/cussword.service';
import { UserService } from '../user/user.service';

@Injectable()
export class SlackEventService {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(
    @InjectSlackClient()
    private readonly slack: SlackClient,
    private readonly userService: UserService,
    private readonly cusswordService: CusswordService,
  ) {}

  /**
   * @description message 이벤트 핸들러
   * @param event MessageEvent
   */
  async handleMessage(event: MessageEvent) {
    // this.logger.debug(event);

    //text 에 따라서 다른 handler 실행
    const { text, user } = event;

    //해당 유저가 내 db 에 있는 유저인지 확인
    const isUserInMyDB = await this.userService.isUser(user);

    //없으면 내 db에 추가
    if (!isUserInMyDB) {
      //slack 에서 유저 정보 가져오기
      const { user: userInfo } = await this.getUserInfo(user);

      //새 유저 생성
      await this.userService.createNewUser(user, userInfo.name);
    }

    //욕인지 체크
    if (this.cusswordService.isCussWord(text)) {
      //욕이라면 내 user service 에 count 하나 추가
      await this.userService.increaseServiceCount(user, 'cussword');

      //욕에 맞는 답변을 보냄
      return await this.slack.chat.postMessage({
        channel: event.channel,
        text: '🫥...',
      });
    }

    //TODO: 욕임에도 인식하지 못하는 경우도 있으므로 이 데이터는 따로 저장해야함.
    //욕이 아니라면, 비아냥거리는 말투 사용🫥
    return await this.slack.chat.postMessage({
      channel: event.channel,
      text: `🤥 나에겐 타격이 없는 욕이네요 후훗`,
    });
  }

  /**
   * @description slack user 의 info 를 가져오는 함수
   */
  async getUserInfo(userId: string) {
    return await this.slack.users.info({ user: userId });
  }

  /**
   * @description 봇인지 확인하는 함수
   */
  isBot(event: MessageEvent) {
    return 'bot_id' in event;
  }
}
