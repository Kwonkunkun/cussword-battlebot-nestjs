import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { RoleEntity } from './role.entity';

@Entity('user_roles')
export class UserRoleEntity {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  roleId: string;

  @ManyToOne(() => UserEntity, (user) => user.roles)
  user: UserEntity;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  role: RoleEntity;
}
