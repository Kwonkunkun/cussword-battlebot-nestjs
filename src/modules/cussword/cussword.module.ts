import { Module } from '@nestjs/common';
import { CusswordService } from './cussword.service';

/**
 * @description 비속어에 대한 모듈 (재미용 ㅋㅋ)
 */
@Module({
  providers: [CusswordService],
  exports: [CusswordService],
})
export class CusswordModule {}
