import { Module } from '@nestjs/common';
import { TierService } from './tier.service';
import { ServiceModule } from '../service/service.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserServiceEntity } from '../../typeorm/entities/user-service.entity';
import { UserModule } from '../user/user.module';
import { TierController } from './tier.controller';
import { RoleModule } from '../role/role.module';

/**
 * @description
 * 스케줄러를 돌려 각 시간에 tier 를 변경해주는 역할
 * 각 티어에 대한 정보를 제공하는 역할 (slash command: /티어)
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([UserServiceEntity]),
    ServiceModule,
    UserModule,
    RoleModule,
  ],
  controllers: [TierController],
  providers: [TierService],
})
export class TierModule {}
