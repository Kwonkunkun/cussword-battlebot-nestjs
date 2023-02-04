import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { UserServiceEntity } from './user-service.entity';
import { UserRoleEntity } from './user-role.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  channel: string;

  @OneToMany(() => UserServiceEntity, (userService) => userService.user)
  services: UserServiceEntity[];

  @OneToMany(() => UserRoleEntity, (userRole) => userRole.user)
  roles: UserRoleEntity[];
}
