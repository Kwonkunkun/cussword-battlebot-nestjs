import { Injectable } from '@nestjs/common';
import { UserRoleEntity } from '../../typeorm/entities/user-role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../constant';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(UserRoleEntity)
    private readonly userRoleRepository: Repository<UserRoleEntity>,
  ) {}

  /**
   * @description 해당 role 을 가진 user 들을 가져옴
   */
  async getUsersByRole(roleId: Role) {
    const userRoles = await this.userRoleRepository.find({
      relations: ['user'],
      where: {
        roleId,
      },
    });

    return userRoles.map((userRole) => userRole.user);
  }
}
