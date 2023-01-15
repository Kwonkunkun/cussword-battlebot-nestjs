import { Module } from '@nestjs/common';
import { EmergencyService } from './emergency.service';
import { EmergencyController } from './emergency.controller';

/**
 * @description slack slash 모듈
 */
@Module({
  controllers: [EmergencyController],
  providers: [EmergencyService],
})
export class EmergencyModule {}
