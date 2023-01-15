import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { UserServiceEntity } from './user-service.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @OneToMany(() => UserServiceEntity, (userService) => userService.user)
  services: UserServiceEntity[];
}
