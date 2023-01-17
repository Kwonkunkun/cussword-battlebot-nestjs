import { Module } from '@nestjs/common';
import { EmergencyService } from './emergency.service';
import { EmergencyController } from './emergency.controller';
import { UserModule } from '../user/user.module';

/**
 * @description slack slash 모듈
 */
@Module({
  imports: [UserModule],
  controllers: [EmergencyController],
  providers: [EmergencyService],
})
export class EmergencyModule {}
