import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class EmergencyService {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly userService: UserService) {}
  /**
   * TODO: 더 긴 메세지를 보내도록 수정 필요
   * @description 메세지를 다 덮을만큼 긴 메세지를 뱉는 함수
   */
  handler() {
    //긴급탈출 count 증가
    return '방어중..';
  }
}
