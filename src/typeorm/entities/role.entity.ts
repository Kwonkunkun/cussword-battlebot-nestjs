import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { UserRoleEntity } from './user-role.entity';
import { Role } from '../../constant';

/**
 * @description user 에 전체적인 룰임, service 마다 x
 */
@Entity('roles')
export class RoleEntity {
  @PrimaryColumn()
  id: Role;

  @Column()
  name: string;

  @OneToMany(() => UserRoleEntity, (userRole) => userRole.role)
  users: UserRoleEntity[];
}
