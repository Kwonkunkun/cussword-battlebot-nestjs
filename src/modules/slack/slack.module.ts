import { Module } from '@nestjs/common';
import { SlackEventService } from './slack.event.service';
import { SlackController } from './slack.controller';
import { SlackInteractivityService } from './slack.interactivity.service';

@Module({
  imports: [],
  controllers: [SlackController],
  providers: [SlackEventService, SlackInteractivityService],
})
export class SlackModule {}
