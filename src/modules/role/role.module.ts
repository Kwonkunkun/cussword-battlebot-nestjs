import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoleEntity } from '../../typeorm/entities/user-role.entity';

/**
 * @description user role 관련 모듈
 */
@Module({
  imports: [TypeOrmModule.forFeature([UserRoleEntity])],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
