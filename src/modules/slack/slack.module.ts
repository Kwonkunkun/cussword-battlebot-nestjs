import { Module } from '@nestjs/common';
import { SlackEventService } from './slack.event.service';
import { SlackController } from './slack.controller';
import { SlackInteractivityService } from './slack.interactivity.service';
import { CusswordModule } from '../cussword/cussword.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [CusswordModule, UserModule],
  controllers: [SlackController],
  providers: [SlackEventService, SlackInteractivityService],
})
export class SlackModule {}
