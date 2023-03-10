import { Body, Controller, Post } from '@nestjs/common';
import { EmergencyService } from './emergency.service';

@Controller('slack/emergency')
export class EmergencyController {
  constructor(private readonly emergencyService: EmergencyService) {}

  /**
   * @description slack slash command
   * 메세지를 다 덮을만큼 긴 메세지를 보내 가린다.
   */
  @Post()
  handler(@Body() { user_name, user_id, channel_id }: any) {
    return this.emergencyService.handler(user_name, user_id, channel_id);
  }
}
