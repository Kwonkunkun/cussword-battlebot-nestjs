import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../typeorm/entities/user.entity';
import { UserServiceEntity } from '../../typeorm/entities/user-service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserServiceEntity])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
