import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from '../../typeorm/entities/service.entity';

/**
 * @description 서비스 모듈
 */
@Module({
  imports: [TypeOrmModule.forFeature([ServiceEntity])],
  providers: [ServiceService],
  exports: [ServiceService],
})
export class ServiceModule {}
