import { Body, Controller, Post } from '@nestjs/common';
import { TierService } from './tier.service';

@Controller('slack/tier')
export class TierController {
  constructor(private readonly tierService: TierService) {}

  /**
   * @description slack slash command (/티어)
   */
  @Post()
  slashCommand(@Body() { user_name, user_id, channel_id }: any) {
    return this.tierService.slashCommand(user_name, user_id, channel_id);
  }
}
