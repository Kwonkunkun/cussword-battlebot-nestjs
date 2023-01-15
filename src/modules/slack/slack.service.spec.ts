import { Test, TestingModule } from '@nestjs/testing';
import { SlackEventService } from './slack.event.service';

describe('SlackService', () => {
  let service: SlackEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlackEventService],
    }).compile();

    service = module.get<SlackEventService>(SlackEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
