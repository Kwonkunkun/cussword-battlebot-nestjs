import { Test, TestingModule } from '@nestjs/testing';
import { CusswordService } from './cussword.service';

describe('CusswordService', () => {
  let service: CusswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CusswordService],
    }).compile();

    service = module.get<CusswordService>(CusswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('욕을 잘 찾는지 확인', () => {
      expect(service.isCussWord("개새끼")).toBeTruthy();
  });

  it('욕이 잘 필터링 되는지 확인',  () => {
    expect(service.filter("개새끼")).toBe("***");
  });
});
