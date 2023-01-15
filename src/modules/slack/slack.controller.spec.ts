import { Test, TestingModule } from '@nestjs/testing';
import { SlackController } from './slack.controller';
import { SlackEventService } from './slack.event.service';

describe('SlackController', () => {
  let controller: SlackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlackController],
      providers: [SlackEventService],
    }).compile();

    controller = module.get<SlackController>(SlackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
