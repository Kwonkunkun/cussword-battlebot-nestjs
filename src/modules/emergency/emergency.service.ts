import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { getRandomString } from './emergency.utils';
import { ASKY_EMOTICONS } from './emergency.constant';

@Injectable()
export class EmergencyService {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly userService: UserService) {}
  /**
   * TODO: 더 긴 메세지를 보내도록 수정 필요
   * @description 메세지를 다 덮을만큼 긴 메세지를 뱉는 함수
   */
  async handler(username: string, userId: string) {
    //긴급탈출 count 증가
    await this.userService.increaseServiceCount(userId, 'emergency');

    //방어문구 출력
    return (
      `@${username} 님의 긴급탈출 요청이 접수되었습니다.\n` +
      '＼＼＼＼＼\n' +
      '＼＼＼∧_∧_  \n' +
      '＼|￣(  ･ω∩)∩　　　  \n' +
      '＼|＼|￣(  ^ω∧)∧  \n' +
      '＼◎＼|＼|￣(*･∀･）  \n' +
      '　 ＼◎＼|＼/っｙっ＼  \n' +
      '　　　＼◎＼|ニニニニ|  \n' +
      '　　　　 ＼◎ 　　＼◎  \n' +
      '　　　　　　＼　　　.＼ \n' +
      getRandomString(ASKY_EMOTICONS, 5)
    );
  }
}
