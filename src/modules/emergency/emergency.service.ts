import { Injectable } from '@nestjs/common';

@Injectable()
export class EmergencyService {
  /**
   * TODO: 더 긴 메세지를 보내도록 수정 필요
   * @description 메세지를 다 덮을만큼 긴 메세지를 뱉는 함수
   */
  handler() {
    return '방어중..';
  }
}
